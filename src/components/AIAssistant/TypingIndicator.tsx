import React from 'react';
import { Bot, Brain, Cpu, Zap } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="mr-2 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center relative">
          <Bot className="w-4 h-4 text-white" />
          <div className="absolute -top-1 -right-1">
            <Brain className="w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-gray-300 p-4 rounded-lg rounded-bl-none border border-gray-700 max-w-xs">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-300">AI is processing</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-gray-400">Neural networks analyzing...</span>
        </div>
      </div>
    </div>
  );
}