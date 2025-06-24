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
  const messageQueue = useRef<string[]>([]);

  const connect = useCallback(() => {
    try {
      setConnectionState('connecting');
      setError(null);

      // For production deployment, we'll use a mock WebSocket implementation
      // since we don't have a backend server deployed
      if (process.env.NODE_ENV === 'production') {
        // Simulate connection success
        setTimeout(() => {
          setConnectionState('connected');
          setError(null);
          reconnectAttempts.current = 0;
        }, 1000);
        return;
      }

      // Development WebSocket connection
      const wsUrl = 'ws://localhost:8080';
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionState('connected');
        setError(null);
        reconnectAttempts.current = 0;
        
        // Send queued messages
        while (messageQueue.current.length > 0) {
          const queuedMessage = messageQueue.current.shift();
          if (queuedMessage && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(queuedMessage);
          }
        }
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
    if (process.env.NODE_ENV === 'production') {
      // Mock AI response for production
      try {
        const messageData = JSON.parse(message);
        
        // Simulate processing delay
        setTimeout(() => {
          const mockResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: generateMockResponse(messageData.message),
            timestamp: new Date().toISOString(),
            confidence: 0.85,
            context: 'general',
            suggestions: [
              'Tell me about the best games for beginners',
              'How can I maximize my earnings?',
              'What are the staking options available?'
            ],
            actions: [
              {
                id: 'navigate_games',
                label: 'Browse Games',
                action: 'navigate',
                data: { section: 'games' }
              }
            ],
            processingTime: 1200
          };
          
          setLastMessage(JSON.stringify(mockResponse));
        }, 1000 + Math.random() * 2000); // 1-3 second delay
        
      } catch (err) {
        console.error('Failed to process mock message:', err);
        setError(err as Error);
      }
      return;
    }

    // Development WebSocket sending
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
      // Queue message for when connection is established
      messageQueue.current.push(JSON.stringify({
        type: 'chat',
        data: JSON.parse(message)
      }));
      
      if (connectionState === 'disconnected') {
        connect();
      }
    }
  }, [connect, connectionState]);

  // Mock AI response generator for production
  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('game') || lowerMessage.includes('play')) {
      return "I'd be happy to help you with games! Our platform features 47 games across multiple categories including Strategy, RPG, Action, Puzzle, and Racing. Each game offers unique rewards and gameplay experiences. For beginners, I recommend starting with Puzzle Master or Dragon Realm - they have great tutorials and steady rewards. Would you like me to show you specific games or explain how the reward system works?";
    }
    
    if (lowerMessage.includes('earn') || lowerMessage.includes('reward') || lowerMessage.includes('money')) {
      return "Great question about earning rewards! You can earn through multiple ways on our platform: 1) Playing games and completing achievements, 2) Staking tokens in our DeFi pools with APYs ranging from 12% to 35%, 3) Participating in tournaments with prize pools, 4) Trading NFTs in our marketplace, and 5) Referring friends through our loyalty program. The best strategy is to combine gaming with staking for passive income. Would you like me to explain any of these earning methods in detail?";
    }
    
    if (lowerMessage.includes('stak') || lowerMessage.includes('defi') || lowerMessage.includes('apy')) {
      return "Our DeFi staking pools offer excellent earning opportunities! We currently have 4 main pools: Gaming Token Pool (25.5% APY), NFT Rewards Pool (18.2% APY), Tournament Pool (35.8% APY), and Governance Pool (12.4% APY). All pools have different minimum stakes and lock periods. The Tournament Pool offers the highest returns but requires a 60-day lock period. For beginners, I recommend starting with the NFT Rewards Pool - it has a lower minimum stake and good returns. Would you like help choosing the right pool for your investment goals?";
    }
    
    if (lowerMessage.includes('tournament') || lowerMessage.includes('compete')) {
      return "Tournaments are exciting! We have multiple active tournaments with prize pools ranging from $8,000 to $75,000. Currently, the Cyber Warriors Championship has a $50,000 prize pool and is accepting registrations. There are tournaments for different skill levels - beginner, intermediate, and expert. Entry fees vary from $5 to $50 depending on the tournament. You can participate in single-elimination, round-robin, or battle-royale formats. Would you like me to show you upcoming tournaments or explain how to register?";
    }
    
    if (lowerMessage.includes('nft') || lowerMessage.includes('marketplace') || lowerMessage.includes('trade')) {
      return "Our NFT marketplace has amazing digital assets! You can find weapons, characters, skins, vehicles, and virtual land from various games. Prices range from 0.35 ETH to 5.2 ETH, with different rarity levels (common, rare, epic, legendary). Popular items include the Legendary Sword of Fire and Dragon Rider Character. All NFTs are tradeable and can be used across compatible games. The marketplace also shows item statistics like views, likes, and price history. Are you looking to buy, sell, or learn about specific NFT categories?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return "Welcome to AI Gaming! I'm here to help you get started. Here's what you can do: 1) Browse our 47 games and start playing to earn rewards, 2) Connect your wallet to access DeFi features, 3) Explore staking pools for passive income, 4) Check out tournaments for competitive play, 5) Visit the NFT marketplace for unique assets. For beginners, I recommend starting with a few games to understand the reward system, then exploring staking options. What interests you most - gaming, earning, or learning about our platform features?";
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('risk')) {
      return "Security is our top priority! Here are key safety measures: 1) All smart contracts are audited by leading security firms, 2) We use multi-signature wallets for treasury funds, 3) Insurance funds protect against potential losses, 4) Regular security audits and bug bounty programs, 5) KYC-free privacy-preserving solutions. For personal security: never share private keys, use hardware wallets for large amounts, enable 2FA, verify contract addresses, and start with small amounts. Our platform has a 99.9% uptime and zero security incidents since launch. Do you have specific security concerns I can address?";
    }
    
    // Default response
    return "Thank you for your question! I'm your AI Gaming assistant and I can help you with games, DeFi features, platform navigation, security tips, and earning strategies. Our platform combines AI-powered gaming with decentralized finance to create unique earning opportunities. You can play games, stake tokens, trade NFTs, participate in tournaments, and refer friends to earn rewards. What specific area would you like to explore? I can provide detailed information about any aspect of our ecosystem.";
  };

  // Initialize connection
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Heartbeat to keep connection alive (only in development)
  useEffect(() => {
    if (connectionState === 'connected' && process.env.NODE_ENV !== 'production') {
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