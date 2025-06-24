import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="mr-2 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="bg-gray-800 text-gray-300 p-3 rounded-lg rounded-bl-none border border-gray-700">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-400">AI is thinking</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}