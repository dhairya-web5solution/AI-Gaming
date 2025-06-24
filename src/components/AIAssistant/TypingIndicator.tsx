import React from 'react';
import { Bot, Brain, Cpu, Zap, Sparkles, Activity } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start group">
      <div className="mr-3 flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-blue-700/30 to-indigo-700/30 animate-pulse"></div>
          
          {/* Bot icon */}
          <Bot className="w-5 h-5 text-white relative z-10" />
          
          {/* Processing indicator */}
          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
            <Brain className="w-2 h-2 text-white animate-pulse" />
          </div>
          
          {/* Neural activity indicators */}
          <div className="absolute -bottom-1 -left-1 bg-green-500 rounded-full p-1">
            <Activity className="w-2 h-2 text-white animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800/80 via-gray-700/80 to-gray-800/80 text-gray-100 p-4 rounded-2xl rounded-bl-lg border border-gray-600/50 shadow-lg backdrop-blur-sm max-w-xs relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-indigo-900/10 animate-pulse"></div>
        
        {/* Neural network visualization */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm text-purple-300 font-medium">AI Neural Processing</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
            <span className="text-xs text-gray-400">Analyzing context and generating response...</span>
          </div>
          
          {/* Processing visualization */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="text-xs text-gray-500">Language processing</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="text-xs text-gray-500">Context analysis</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="text-xs text-gray-500">Response generation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}