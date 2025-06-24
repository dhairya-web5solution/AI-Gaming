import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebSocketReturn {
  sendMessage: (message: string) => void;
  lastMessage: string | null;
  connectionState: 'connecting' | 'connected' | 'disconnected' | 'error';
  error: Error | null;
}

export function useWebSocket(): UseWebSocketReturn {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [error, setError] = useState<Error | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000;

  const connect = useCallback(() => {
    try {
      setConnectionState('connecting');
      setError(null);

      // Use the correct WebSocket URL for the backend server
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://your-domain.com' 
        : 'ws://localhost:8080';

      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionState('connected');
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'chat_response') {
            setLastMessage(JSON.stringify(data.data));
          } else if (data.type === 'error') {
            setError(new Error(data.data.error || 'Unknown error'));
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      ws.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnectionState('disconnected');
        
        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectDelay * reconnectAttempts.current);
        }
      };

      ws.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError(new Error('WebSocket connection failed'));
        setConnectionState('error');
      };

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError(err as Error);
      setConnectionState('error');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (ws.current) {
      ws.current.close(1000, 'User initiated disconnect');
      ws.current = null;
    }
    
    setConnectionState('disconnected');
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const messageData = JSON.parse(message);
        
        ws.current.send(JSON.stringify({
          type: 'chat',
          data: messageData
        }));
      } catch (err) {
        console.error('Failed to send WebSocket message:', err);
        setError(err as Error);
      }
    } else {
      console.warn('WebSocket is not connected. Attempting to reconnect...');
      connect();
    }
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Heartbeat to keep connection alive
  useEffect(() => {
    if (connectionState === 'connected') {
      const heartbeat = setInterval(() => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000); // Send ping every 30 seconds

      return () => clearInterval(heartbeat);
    }
  }, [connectionState]);

  return {
    sendMessage,
    lastMessage,
    connectionState,
    error
  };
}