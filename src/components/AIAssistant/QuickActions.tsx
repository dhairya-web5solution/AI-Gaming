import React from 'react';
import { Gamepad2, TrendingUp, Shield, Lightbulb, Users, Trophy, DollarSign, HelpCircle, Brain, Zap, Target, BarChart3, Sparkles, Cpu } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    { 
      icon: Brain, 
      text: "Analyze my performance", 
      action: "Analyze my gaming performance, win rate, and earnings. Show me detailed insights and improvement opportunities.",
      gradient: "from-purple-600 via-purple-500 to-blue-600",
      glow: "shadow-purple-500/25"
    },
    { 
      icon: TrendingUp, 
      text: "Optimize my portfolio", 
      action: "Review my token balances and provide AI-powered optimization recommendations for maximum returns.",
      gradient: "from-green-600 via-emerald-500 to-teal-600",
      glow: "shadow-green-500/25"
    },
    { 
      icon: Target, 
      text: "Find best earning strategies", 
      action: "Show me personalized earning strategies based on my skill level, available time, and risk tolerance.",
      gradient: "from-orange-600 via-red-500 to-pink-600",
      glow: "shadow-orange-500/25"
    },
    { 
      icon: Gamepad2, 
      text: "Recommend games for me", 
      action: "Recommend games that match my skill level, interests, and earning goals. Include difficulty and reward analysis.",
      gradient: "from-blue-600 via-indigo-500 to-purple-600",
      glow: "shadow-blue-500/25"
    },
    { 
      icon: BarChart3, 
      text: "Calculate earning potential", 
      action: "Calculate my potential daily and monthly earnings across gaming, staking, tournaments, and NFT trading.",
      gradient: "from-yellow-600 via-orange-500 to-red-600",
      glow: "shadow-yellow-500/25"
    },
    { 
      icon: Shield, 
      text: "Explain security best practices", 
      action: "Provide comprehensive security guidelines for DeFi, wallet protection, and safe trading practices.",
      gradient: "from-gray-600 via-slate-500 to-zinc-600",
      glow: "shadow-gray-500/25"
    },
    { 
      icon: Trophy, 
      text: "Find tournaments for my level", 
      action: "Show me tournaments that match my skill level and budget. Include ROI analysis and winning strategies.",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      glow: "shadow-yellow-500/25"
    },
    { 
      icon: Zap, 
      text: "Show advanced strategies", 
      action: "Reveal advanced earning techniques, market insights, and professional gaming strategies for experienced users.",
      gradient: "from-purple-700 via-fuchsia-600 to-pink-600",
      glow: "shadow-purple-500/25"
    }
  ];

  return (
    <div className="p-4 border-t border-gray-700/50 bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-800/30 backdrop-blur-sm relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 left-4">
          <Cpu className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute bottom-2 right-4">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-200 mb-3 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>AI-Powered Quick Actions</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {quickActions.slice(0, 4).map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => onActionClick(action.action)}
                  className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-xl transition-all duration-300 text-sm text-white text-left border border-white/10 hover:border-white/30 group relative overflow-hidden ${action.glow} hover:shadow-lg`}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Icon with glow effect */}
                  <div className="relative">
                    <Icon className="w-5 h-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  </div>
                  
                  {/* Text */}
                  <span className="truncate font-medium group-hover:text-white transition-colors relative z-10">{action.text}</span>
                  
                  {/* Action indicator */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {quickActions.slice(4).map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index + 4}
                onClick={() => onActionClick(action.action)}
                className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-300 text-sm text-white text-left border border-white/10 hover:border-white/30 group relative overflow-hidden`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Icon */}
                <Icon className="w-4 h-4 text-white flex-shrink-0 group-hover:scale-110 transition-transform relative z-10" />
                
                {/* Text */}
                <span className="truncate group-hover:text-white transition-colors relative z-10">{action.text}</span>
                
                {/* Action indicator */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Powered by advanced AI neural networks for intelligent assistance</span>
            <Cpu className="w-3 h-3 text-blue-400 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}