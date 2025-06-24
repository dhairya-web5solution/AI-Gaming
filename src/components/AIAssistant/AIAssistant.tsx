import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageCircle, Bot, Send, Minimize2, Maximize2, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';
import { useContextAnalyzer } from './hooks/useContextAnalyzer';
import { AIMessage, UserMessage, SystemMessage } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Custom hooks for WebSocket and context analysis
  const { sendMessage: sendWebSocketMessage, lastMessage, connectionState, error } = useWebSocket();
  const { analyzeCurrentContext, getRelevantContent } = useContextAnalyzer();

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: "Hello! I'm your AI Gaming assistant. I can help you with games, DeFi features, platform navigation, and answer any questions about our ecosystem. What would you like to know?",
        timestamp: new Date(),
        confidence: 1.0,
        context: 'welcome'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const rawAiResponse = JSON.parse(lastMessage);
        // Convert timestamp string back to Date object
        const aiResponse: AIMessage = {
          ...rawAiResponse,
          timestamp: new Date(rawAiResponse.timestamp)
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      } catch (error) {
        console.error('Failed to parse AI response:', error);
        const errorMsg: SystemMessage = {
          id: Date.now().toString(),
          type: 'system',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date(),
          level: 'error'
        };
        setMessages(prev => [...prev, errorMsg]);
        setIsTyping(false);
      }
    }
  }, [lastMessage]);

  // Handle connection errors
  useEffect(() => {
    if (error) {
      const errorMsg: SystemMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `Connection error: ${error.message}. Please check your internet connection.`,
        timestamp: new Date(),
        level: 'error'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    try {
      // Analyze current page context
      const context = analyzeCurrentContext();
      const relevantContent = getRelevantContent(userInput.trim());

      // Prepare message payload
      const messagePayload = {
        message: userInput.trim(),
        context: {
          currentPage: window.location.pathname,
          pageContent: context,
          relevantContent,
          timestamp: new Date().toISOString(),
          sessionId: getSessionId(),
          userAgent: navigator.userAgent
        },
        conversationHistory: messages.slice(-10) // Last 10 messages for context
      };

      // Send via WebSocket
      sendWebSocketMessage(JSON.stringify(messagePayload));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: SystemMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: 'Failed to send message. Please check your connection and try again.',
        timestamp: new Date(),
        level: 'error'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setUserInput(action);
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
      content: "Conversation cleared! How can I help you today?",
      timestamp: new Date(),
      confidence: 1.0,
      context: 'reset'
    };
    setMessages([welcomeMessage]);
  };

  const getConnectionIcon = () => {
    switch (connectionState) {
      case 'connected':
        return <Wifi className="w-3 h-3 text-green-400" />;
      case 'connecting':
        return <RefreshCw className="w-3 h-3 text-yellow-400 animate-spin" />;
      case 'error':
      case 'disconnected':
        return <WifiOff className="w-3 h-3 text-red-400" />;
      default:
        return <AlertCircle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getConnectionStatus = () => {
    switch (connectionState) {
      case 'connected':
        return 'Online & Ready';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  if (!isVisible) return null;

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse relative"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1">
            {getConnectionIcon()}
          </div>
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
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-t-xl flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -right-1">
              {getConnectionIcon()}
            </div>
          </div>
          <div>
            <span className="text-white font-semibold">AI Gaming Assistant</span>
            <div className="text-white/70 text-xs">{getConnectionStatus()}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/70 hover:text-white transition-colors p-1"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/70 hover:text-white transition-colors p-1"
            title="Minimize"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0">
          <QuickActions onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={connectionState === 'connected' ? "Ask me anything..." : "Connecting..."}
              disabled={connectionState !== 'connected'}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              {userInput.length}/500
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!userInput.trim() || isTyping || connectionState !== 'connected'}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <button
            onClick={clearConversation}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear chat
          </button>
        </div>
      </div>
    </div>
  );
}