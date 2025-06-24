import React from 'react';
import { Bot, User, AlertCircle, Info, AlertTriangle } from 'lucide-react';
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
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-purple-500 text-white p-3 rounded-lg rounded-br-none">
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
          <div className="text-xs text-purple-200 mt-1 text-right">
            {formatTime(message.timestamp)}
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
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
        case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      }
    };

    return (
      <div className="flex justify-center">
        <div className={`max-w-[80%] p-3 rounded-lg border ${getSystemColors()} flex items-center space-x-2`}>
          {getSystemIcon()}
          <span className="text-sm">{message.content}</span>
        </div>
      </div>
    );
  }

  // AI message
  const aiMessage = message as AIMessage;
  
  return (
    <div className="flex justify-start">
      <div className="mr-2 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="max-w-[80%]">
        <div className="bg-gray-800 text-gray-300 p-3 rounded-lg rounded-bl-none border border-gray-700">
          <div className="whitespace-pre-wrap break-words">{aiMessage.content}</div>
          
          {aiMessage.suggestions && aiMessage.suggestions.length > 0 && (
            <div className="mt-3 space-y-1">
              <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
              {aiMessage.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded transition-colors"
                  onClick={() => {
                    // Handle suggestion click
                    const event = new CustomEvent('ai-suggestion-click', { detail: suggestion });
                    window.dispatchEvent(event);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {aiMessage.actions && aiMessage.actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {aiMessage.actions.map((action) => (
                <button
                  key={action.id}
                  className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition-colors"
                  onClick={() => {
                    // Handle action click
                    const event = new CustomEvent('ai-action-click', { detail: action });
                    window.dispatchEvent(event);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
          <span>{formatTime(aiMessage.timestamp)}</span>
          {aiMessage.confidence && (
            <span className="flex items-center space-x-1">
              <span>Confidence:</span>
              <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400 transition-all duration-300"
                  style={{ width: `${aiMessage.confidence * 100}%` }}
                />
              </div>
              <span>{Math.round(aiMessage.confidence * 100)}%</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}