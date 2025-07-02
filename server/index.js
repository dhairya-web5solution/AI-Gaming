import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import helmet from 'helmet';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { v4 as uuidv4 } from 'uuid';
import { AIProcessor } from './ai/processor.js';
import { ContextAnalyzer } from './ai/contextAnalyzer.js';
import { SessionManager } from './utils/sessionManager.js';
import { Logger } from './utils/logger.js';
import authRoutes from './routes/auth.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Initialize components
const aiProcessor = new AIProcessor();
const contextAnalyzer = new ContextAnalyzer();
const sessionManager = new SessionManager();
const logger = new Logger();

// Rate limiting
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 30, // Number of requests
  duration: 60, // Per 60 seconds
});

const wsRateLimiter = new RateLimiterMemory({
  points: 10, // Number of messages
  duration: 60, // Per 60 seconds
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "ws://localhost:8080", "wss://localhost:8080", "https://accounts.google.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      frameSrc: ["https://accounts.google.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({ 
      error: 'Too many requests', 
      retryAfter: Math.round(rejRes.msBeforeNext / 1000) 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    connections: wss.clients.size
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// AI Chat endpoint (REST fallback)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, sessionId } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    const session = sessionManager.getSession(sessionId || uuidv4());
    const processedContext = contextAnalyzer.analyzeContext(context);
    
    const response = await aiProcessor.processMessage({
      message: message.trim(),
      context: processedContext,
      sessionId: session.id,
      conversationHistory: session.getHistory()
    });

    session.addMessage('user', message);
    session.addMessage('ai', response.content);

    logger.log('chat_request', {
      sessionId: session.id,
      messageLength: message.length,
      responseTime: response.processingTime,
      confidence: response.confidence
    });

    res.json(response);
  } catch (error) {
    logger.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process your request. Please try again.'
    });
  }
});

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  const clientId = uuidv4();
  const clientIP = req.socket.remoteAddress;
  
  logger.log('websocket_connection', { clientId, clientIP });
  
  ws.clientId = clientId;
  ws.isAlive = true;
  ws.lastActivity = Date.now();

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    data: {
      clientId,
      message: 'Connected to AI Gaming Assistant',
      timestamp: new Date().toISOString()
    }
  }));

  ws.on('message', async (data) => {
    try {
      // Rate limiting for WebSocket
      try {
        await wsRateLimiter.consume(clientIP);
      } catch (rejRes) {
        ws.send(JSON.stringify({
          type: 'error',
          data: {
            error: 'Rate limit exceeded',
            retryAfter: Math.round(rejRes.msBeforeNext / 1000)
          }
        }));
        return;
      }

      ws.lastActivity = Date.now();
      
      const messageData = JSON.parse(data.toString());
      
      if (messageData.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
        return;
      }

      if (messageData.type === 'chat') {
        const { message, context, sessionId } = messageData.data;
        
        if (!message || typeof message !== 'string') {
          ws.send(JSON.stringify({
            type: 'error',
            data: { error: 'Invalid message format' }
          }));
          return;
        }

        const session = sessionManager.getSession(sessionId || clientId);
        const processedContext = contextAnalyzer.analyzeContext(context);
        
        // Send typing indicator
        ws.send(JSON.stringify({
          type: 'typing',
          data: { isTyping: true }
        }));

        const response = await aiProcessor.processMessage({
          message: message.trim(),
          context: processedContext,
          sessionId: session.id,
          conversationHistory: session.getHistory()
        });

        session.addMessage('user', message);
        session.addMessage('ai', response.content);

        // Send response
        ws.send(JSON.stringify({
          type: 'chat_response',
          data: {
            id: uuidv4(),
            type: 'ai',
            content: response.content,
            timestamp: new Date().toISOString(),
            confidence: response.confidence,
            context: response.context,
            suggestions: response.suggestions,
            actions: response.actions,
            processingTime: response.processingTime
          }
        }));

        logger.log('websocket_message', {
          clientId,
          sessionId: session.id,
          messageLength: message.length,
          responseTime: response.processingTime,
          confidence: response.confidence
        });
      }
    } catch (error) {
      logger.error('WebSocket message error:', error);
      ws.send(JSON.stringify({
        type: 'error',
        data: {
          error: 'Failed to process message',
          message: 'Please try again or contact support if the issue persists.'
        }
      }));
    }
  });

  ws.on('pong', () => {
    ws.isAlive = true;
    ws.lastActivity = Date.now();
  });

  ws.on('close', (code, reason) => {
    logger.log('websocket_disconnect', { 
      clientId, 
      code, 
      reason: reason.toString(),
      duration: Date.now() - ws.lastActivity
    });
  });

  ws.on('error', (error) => {
    logger.error('WebSocket error:', error);
  });
});

// Heartbeat to detect broken connections
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      logger.log('websocket_timeout', { clientId: ws.clientId });
      return ws.terminate();
    }
    
    // Close inactive connections (30 minutes)
    if (Date.now() - ws.lastActivity > 30 * 60 * 1000) {
      logger.log('websocket_inactive', { clientId: ws.clientId });
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000); // Check every 30 seconds

// Cleanup on server shutdown
process.on('SIGTERM', () => {
  logger.log('server_shutdown', { reason: 'SIGTERM' });
  clearInterval(heartbeat);
  wss.close();
  server.close();
});

process.on('SIGINT', () => {
  logger.log('server_shutdown', { reason: 'SIGINT' });
  clearInterval(heartbeat);
  wss.close();
  server.close();
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  logger.log('server_start', { port: PORT });
  console.log(`🚀 AI Gaming Assistant Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
});