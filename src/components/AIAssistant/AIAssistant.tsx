import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageCircle, Bot, Send, Minimize2, Maximize2, RefreshCw, AlertCircle, Wifi, WifiOff, Sparkles, Brain, Zap, Cpu, Activity } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';
import { useContextAnalyzer } from './hooks/useContextAnalyzer';
import { AIMessage, UserMessage, SystemMessage } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';
import { useUser } from '../../contexts/UserContext';

interface AIAssistantProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function AIAssistant({ onClose, isVisible }: AIAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<(AIMessage | UserMessage | SystemMessage)[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useUser();
  const { sendMessage: sendWebSocketMessage, lastMessage, connectionState, error } = useWebSocket();
  const { analyzeCurrentContext, getRelevantContent } = useContextAnalyzer();

  // Initialize with personalized welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: user 
          ? `Hello ${user.username}! 👋 I'm your AI Gaming assistant powered by advanced neural networks. I can help you with personalized game recommendations, DeFi strategies, portfolio optimization, and real-time market insights. What would you like to explore today?`
          : "Hello! I'm your AI Gaming assistant powered by advanced neural networks. I provide intelligent insights, personalized recommendations, and real-time assistance for all your gaming and DeFi needs. Connect your wallet for personalized assistance!",
        timestamp: new Date(),
        confidence: 1.0,
        context: 'welcome',
        suggestions: user ? [
          `Analyze my ${user.stats.gamesPlayed} games performance`,
          `Optimize my $${user.stats.totalEarnings.toFixed(2)} portfolio`,
          'Show me personalized earning strategies'
        ] : [
          'How do I get started with AI Gaming?',
          'What are the best games for beginners?',
          'Explain the DeFi features available'
        ]
      };
      setMessages([welcomeMessage]);
      setCurrentSuggestions(welcomeMessage.suggestions || []);
    }
  }, [user]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const rawAiResponse = JSON.parse(lastMessage);
        const aiResponse: AIMessage = {
          ...rawAiResponse,
          timestamp: new Date(rawAiResponse.timestamp)
        };
        setMessages(prev => [...prev, aiResponse]);
        setCurrentSuggestions(aiResponse.suggestions || []);
        setIsTyping(false);
        setIsThinking(false);
        setProcessingStatus('');
      } catch (error) {
        console.error('Failed to parse AI response:', error);
        const errorMsg: SystemMessage = {
          id: Date.now().toString(),
          type: 'system',
          content: 'Neural network encountered an error. Switching to backup processing mode.',
          timestamp: new Date(),
          level: 'error'
        };
        setMessages(prev => [...prev, errorMsg]);
        setIsTyping(false);
        setIsThinking(false);
        setProcessingStatus('');
      }
    }
  }, [lastMessage]);

  // Handle connection errors
  useEffect(() => {
    if (error) {
      const errorMsg: SystemMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `AI system temporarily offline. Activating local intelligence mode for continued assistance.`,
        timestamp: new Date(),
        level: 'warning'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
      setIsThinking(false);
      setProcessingStatus('');
    }
  }, [error]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when expanded
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // Real-time typing detection with AI processing simulation
  useEffect(() => {
    if (userInput.length > 0) {
      setIsThinking(true);
      setProcessingStatus('Analyzing input...');
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        setProcessingStatus('Processing context...');
        
        setTimeout(() => {
          setProcessingStatus('Generating suggestions...');
          generateRealTimeSuggestions(userInput);
          
          setTimeout(() => {
            setIsThinking(false);
            setProcessingStatus('');
          }, 500);
        }, 300);
      }, 800);
    } else {
      setIsThinking(false);
      setProcessingStatus('');
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [userInput]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateRealTimeSuggestions = (input: string) => {
    const lowerInput = input.toLowerCase();
    let suggestions: string[] = [];

    // Advanced context-aware suggestions
    if (lowerInput.includes('game') || lowerInput.includes('play')) {
      if (user) {
        suggestions = [
          `Recommend games based on my ${user.stats.winRate}% win rate`,
          `Show games that match my ${user.level} skill level`,
          `Find games with highest ROI for my playstyle`
        ];
      } else {
        suggestions = [
          'Show me the highest earning games',
          'What games are best for beginners?',
          'Recommend games for my playstyle'
        ];
      }
    } else if (lowerInput.includes('earn') || lowerInput.includes('money') || lowerInput.includes('profit')) {
      if (user) {
        suggestions = [
          `Optimize my $${user.stats.totalEarnings.toFixed(2)} portfolio`,
          `Calculate potential earnings with ${user.balances.AGT} AGT`,
          'Show me the best earning strategies for my level'
        ];
      } else {
        suggestions = [
          'Calculate my potential daily earnings',
          'Show me the best earning strategies',
          'Compare gaming vs staking rewards'
        ];
      }
    } else if (lowerInput.includes('stak') || lowerInput.includes('defi')) {
      if (user) {
        suggestions = [
          `Best staking pool for my ${user.balances.AGT} AGT tokens`,
          'Calculate my optimal staking strategy',
          'Compare all staking pools for maximum yield'
        ];
      } else {
        suggestions = [
          'Which staking pool offers the best returns?',
          'Calculate my staking rewards',
          'Explain staking risks and benefits'
        ];
      }
    } else if (lowerInput.includes('tournament') || lowerInput.includes('compete')) {
      if (user) {
        suggestions = [
          `Find tournaments matching my ${user.stats.winRate}% win rate`,
          'Calculate tournament ROI for my skill level',
          'Show upcoming tournaments I can afford'
        ];
      } else {
        suggestions = [
          'Show me upcoming tournaments I can join',
          'What tournaments match my skill level?',
          'Calculate tournament ROI'
        ];
      }
    } else if (lowerInput.includes('nft') || lowerInput.includes('marketplace')) {
      if (user) {
        suggestions = [
          `Find NFTs under ${user.balances.AGT} AGT budget`,
          'Analyze trending NFTs for investment',
          'Show NFTs that boost my game performance'
        ];
      } else {
        suggestions = [
          'Show me trending NFTs in my price range',
          'Analyze NFT market trends',
          'Recommend NFTs for my games'
        ];
      }
    } else if (lowerInput.includes('portfolio') || lowerInput.includes('balance')) {
      if (user) {
        suggestions = [
          'Analyze my current portfolio allocation',
          'Suggest portfolio rebalancing strategy',
          'Calculate my portfolio performance metrics'
        ];
      } else {
        suggestions = [
          'How should I allocate my portfolio?',
          'What\'s the optimal token distribution?',
          'Explain portfolio management strategies'
        ];
      }
    } else {
      suggestions = user ? [
        'Analyze my gaming performance trends',
        'Optimize my earning strategy',
        'Show personalized recommendations'
      ] : [
        'Tell me about platform features',
        'Help me get started',
        'Show me earning opportunities'
      ];
    }

    setCurrentSuggestions(suggestions);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: UserMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);
    setIsThinking(false);
    setProcessingStatus('Processing your request...');

    // Simulate advanced AI processing stages
    const processingStages = [
      'Analyzing query context...',
      'Accessing neural networks...',
      'Processing user data...',
      'Generating intelligent response...',
      'Optimizing recommendations...'
    ];

    let stageIndex = 0;
    const stageInterval = setInterval(() => {
      if (stageIndex < processingStages.length) {
        setProcessingStatus(processingStages[stageIndex]);
        stageIndex++;
      } else {
        clearInterval(stageInterval);
        setProcessingStatus('Finalizing response...');
      }
    }, 600);

    try {
      // Analyze current page context
      const context = analyzeCurrentContext();
      const relevantContent = getRelevantContent(userInput.trim());

      // Prepare enhanced message payload with user context
      const messagePayload = {
        message: userInput.trim(),
        context: {
          currentPage: window.location.pathname,
          pageContent: context,
          relevantContent,
          timestamp: new Date().toISOString(),
          sessionId: getSessionId(),
          userAgent: navigator.userAgent,
          userProfile: user ? {
            level: user.level,
            balances: user.balances,
            stats: user.stats,
            isOnboarded: user.isOnboarded,
            username: user.username
          } : null
        },
        conversationHistory: messages.slice(-10)
      };

      // Send via WebSocket with enhanced context
      sendWebSocketMessage(JSON.stringify(messagePayload));

      // Clear processing status after response
      responseTimeoutRef.current = setTimeout(() => {
        clearInterval(stageInterval);
        setProcessingStatus('');
      }, 8000);

    } catch (error) {
      console.error('Error sending message:', error);
      clearInterval(stageInterval);
      const errorMsg: SystemMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: 'Neural network connection interrupted. Switching to local processing mode.',
        timestamp: new Date(),
        level: 'error'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
      setProcessingStatus('');
    }
  };

  const handleQuickAction = (action: string) => {
    setUserInput(action);
    setTimeout(() => sendMessage(), 100);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    setTimeout(() => sendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('ai-assistant-session');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('ai-assistant-session', sessionId);
    }
    return sessionId;
  };

  const clearConversation = () => {
    setMessages([]);
    const welcomeMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: "Neural networks reset! I'm ready to provide fresh insights and personalized recommendations. What would you like to explore?",
      timestamp: new Date(),
      confidence: 1.0,
      context: 'reset',
      suggestions: user ? [
        'Analyze my current performance',
        'Show optimization opportunities',
        'Recommend next actions'
      ] : [
        'Show me platform overview',
        'Help me get started',
        'Explain earning opportunities'
      ]
    };
    setMessages([welcomeMessage]);
    setCurrentSuggestions(welcomeMessage.suggestions || []);
  };

  const getConnectionIcon = () => {
    switch (connectionState) {
      case 'connected':
        return <Activity className="w-3 h-3 text-green-400 animate-pulse" />;
      case 'connecting':
        return <RefreshCw className="w-3 h-3 text-yellow-400 animate-spin" />;
      case 'error':
      case 'disconnected':
        return <Cpu className="w-3 h-3 text-orange-400" />;
      default:
        return <AlertCircle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getConnectionStatus = () => {
    switch (connectionState) {
      case 'connected':
        return 'AI Neural Network Online';
      case 'connecting':
        return 'Connecting to AI Core...';
      case 'error':
        return 'Local Intelligence Mode';
      case 'disconnected':
        return 'Offline Processing';
      default:
        return 'Initializing...';
    }
  };

  if (!isVisible) return null;

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative group"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1">
            {getConnectionIcon()}
          </div>
          {isThinking && (
            <div className="absolute -top-2 -left-2">
              <Brain className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity animate-pulse"></div>
        </button>
      </div>
    );
  }

  const containerClasses = `fixed bottom-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${
    isExpanded ? 'w-[90vw] h-[90vh] max-w-4xl' : 'w-96 h-[600px]'
  }`;

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-t-xl flex items-center justify-between flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 animate-pulse"></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -right-1">
              {getConnectionIcon()}
            </div>
            {isThinking && (
              <div className="absolute -top-1 -left-1">
                <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold">AI Gaming Assistant</span>
              <Zap className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-white/70 text-xs">{getConnectionStatus()}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            title="Minimize"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Processing Status */}
      {(isTyping || processingStatus) && (
        <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm">
              {processingStatus || 'AI is processing your request...'}
            </span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 bg-gradient-to-b from-gray-900 to-gray-800"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Real-time Suggestions */}
      {currentSuggestions.length > 0 && !isTyping && (
        <div className="px-4 py-2 border-t border-gray-700 bg-gray-800/50">
          <div className="text-xs text-gray-400 mb-2 flex items-center space-x-1">
            <Brain className="w-3 h-3" />
            <span>AI Suggestions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full hover:bg-purple-500/30 transition-colors border border-purple-500/30 hover:border-purple-400"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0">
          <QuickActions onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0 bg-gray-800/50">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={connectionState === 'connected' ? "Ask me anything about AI Gaming..." : "AI processing locally..."}
              disabled={isTyping}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed pr-20"
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {isThinking && (
                <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
              )}
              <div className="text-xs text-gray-500">
                {userInput.length}/500
              </div>
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!userInput.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-200 flex items-center justify-center relative group"
          >
            <Send className="w-4 h-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <button
            onClick={clearConversation}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Reset AI
          </button>
        </div>
      </div>
    </div>
  );
}