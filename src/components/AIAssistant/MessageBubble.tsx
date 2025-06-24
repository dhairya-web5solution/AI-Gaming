import React from 'react';
import { Bot, User, AlertCircle, Info, AlertTriangle, Sparkles, Zap, Brain } from 'lucide-react';
import { AIMessage, UserMessage, SystemMessage } from './types';

interface MessageBubbleProps {
  message: AIMessage | UserMessage | SystemMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end group">
        <div className="max-w-[80%] bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white p-4 rounded-2xl rounded-br-lg shadow-lg relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-blue-700/30 to-indigo-700/30 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
            <div className="text-xs text-purple-200 mt-2 text-right opacity-80">
              {formatTime(message.timestamp)}
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
        </div>
        
        <div className="ml-3 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <User className="w-5 h-5 text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-700 opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'system') {
    const getSystemIcon = () => {
      switch (message.level) {
        case 'error': return <AlertCircle className="w-4 h-4" />;
        case 'warning': return <AlertTriangle className="w-4 h-4" />;
        default: return <Info className="w-4 h-4" />;
      }
    };

    const getSystemColors = () => {
      switch (message.level) {
        case 'error': return 'bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20 text-red-400 border-red-500/30';
        case 'warning': return 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30';
        default: return 'bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-600/20 text-blue-400 border-blue-500/30';
      }
    };

    return (
      <div className="flex justify-center">
        <div className={`max-w-[80%] p-4 rounded-xl border backdrop-blur-sm ${getSystemColors()} flex items-center space-x-3 shadow-lg`}>
          <div className="flex-shrink-0">
            {getSystemIcon()}
          </div>
          <span className="text-sm font-medium">{message.content}</span>
        </div>
      </div>
    );
  }

  // AI message with enhanced design
  const aiMessage = message as AIMessage;
  
  return (
    <div className="flex justify-start group">
      <div className="mr-3 flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-blue-700/30 to-indigo-700/30 animate-pulse"></div>
          
          {/* Bot icon */}
          <Bot className="w-5 h-5 text-white relative z-10" />
          
          {/* AI indicator */}
          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
            <Sparkles className="w-2 h-2 text-white" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity blur-lg"></div>
        </div>
      </div>
      
      <div className="max-w-[80%] flex-1">
        <div className="bg-gradient-to-br from-gray-800/80 via-gray-700/80 to-gray-800/80 text-gray-100 p-4 rounded-2xl rounded-bl-lg border border-gray-600/50 shadow-lg backdrop-blur-sm relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2">
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            <div className="absolute bottom-2 left-2">
              <Zap className="w-3 h-3 text-blue-400" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="whitespace-pre-wrap break-words leading-relaxed">{aiMessage.content}</div>
            
            {/* Suggestions */}
            {aiMessage.suggestions && aiMessage.suggestions.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-xs text-gray-400 mb-3 flex items-center space-x-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span className="font-medium">Smart Suggestions:</span>
                </div>
                {aiMessage.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="block w-full text-left text-sm bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 hover:from-purple-600/30 hover:via-blue-600/30 hover:to-indigo-600/30 text-gray-300 hover:text-white p-3 rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-purple-500/50 backdrop-blur-sm group"
                    onClick={() => {
                      const event = new CustomEvent('ai-suggestion-click', { detail: suggestion });
                      window.dispatchEvent(event);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3 h-3 text-purple-400 group-hover:text-purple-300" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Actions */}
            {aiMessage.actions && aiMessage.actions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {aiMessage.actions.map((action) => (
                  <button
                    key={action.id}
                    className="text-sm bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg group"
                    onClick={() => {
                      const event = new CustomEvent('ai-action-click', { detail: action });
                      window.dispatchEvent(event);
                    }}
                  >
                    <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Message metadata */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span className="flex items-center space-x-2">
            <Brain className="w-3 h-3 text-purple-400" />
            <span>{formatTime(aiMessage.timestamp)}</span>
          </span>
          {aiMessage.confidence && (
            <div className="flex items-center space-x-2">
              <span>Confidence:</span>
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${aiMessage.confidence * 100}%` }}
                />
              </div>
              <span className="font-medium text-green-400">{Math.round(aiMessage.confidence * 100)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}