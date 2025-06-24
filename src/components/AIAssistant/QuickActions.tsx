import React from 'react';
import { Gamepad2, TrendingUp, Shield, Lightbulb, Users, Trophy, DollarSign, HelpCircle, Brain, Zap, Target, BarChart3, Sparkles, Cpu, ChevronRight } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    { 
      icon: Brain, 
      text: "Analyze Performance", 
      action: "Analyze my gaming performance, win rate, and earnings. Show me detailed insights and improvement opportunities.",
      gradient: "from-purple-600 to-blue-600",
      glow: "shadow-purple-500/20"
    },
    { 
      icon: TrendingUp, 
      text: "Optimize Portfolio", 
      action: "Review my token balances and provide AI-powered optimization recommendations for maximum returns.",
      gradient: "from-green-600 to-emerald-600",
      glow: "shadow-green-500/20"
    },
    { 
      icon: Target, 
      text: "Earning Strategies", 
      action: "Show me personalized earning strategies based on my skill level, available time, and risk tolerance.",
      gradient: "from-orange-600 to-red-600",
      glow: "shadow-orange-500/20"
    },
    { 
      icon: Gamepad2, 
      text: "Game Recommendations", 
      action: "Recommend games that match my skill level, interests, and earning goals. Include difficulty and reward analysis.",
      gradient: "from-blue-600 to-indigo-600",
      glow: "shadow-blue-500/20"
    },
    { 
      icon: BarChart3, 
      text: "Calculate Earnings", 
      action: "Calculate my potential daily and monthly earnings across gaming, staking, tournaments, and NFT trading.",
      gradient: "from-yellow-600 to-orange-600",
      glow: "shadow-yellow-500/20"
    },
    { 
      icon: Shield, 
      text: "Security Guide", 
      action: "Provide comprehensive security guidelines for DeFi, wallet protection, and safe trading practices.",
      gradient: "from-gray-600 to-slate-600",
      glow: "shadow-gray-500/20"
    },
    { 
      icon: Trophy, 
      text: "Tournament Finder", 
      action: "Show me tournaments that match my skill level and budget. Include ROI analysis and winning strategies.",
      gradient: "from-yellow-500 to-amber-500",
      glow: "shadow-yellow-500/20"
    },
    { 
      icon: Zap, 
      text: "Advanced Strategies", 
      action: "Reveal advanced earning techniques, market insights, and professional gaming strategies for experienced users.",
      gradient: "from-purple-700 to-pink-600",
      glow: "shadow-purple-500/20"
    },
    { 
      icon: DollarSign, 
      text: "Market Analysis", 
      action: "Provide real-time market analysis, price trends, and investment opportunities across all platform tokens.",
      gradient: "from-green-700 to-teal-600",
      glow: "shadow-green-500/20"
    },
    { 
      icon: Users, 
      text: "Social Features", 
      action: "Explore referral programs, community challenges, and social earning opportunities on the platform.",
      gradient: "from-blue-700 to-cyan-600",
      glow: "shadow-blue-500/20"
    }
  ];

  return (
    <div className="border-t border-gray-700/50 bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-800/30 backdrop-blur-sm relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 left-4">
          <Cpu className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute bottom-2 right-4">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
        </div>
      </div>
      
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-200 mb-2 flex items-center space-x-2">
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
          
          {/* Scrollable Actions Container */}
          <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => onActionClick(action.action)}
                    className={`w-full flex items-center space-x-3 p-3 bg-gradient-to-r ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-300 text-sm text-white text-left border border-white/10 hover:border-white/30 group relative overflow-hidden ${action.glow} hover:shadow-lg`}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Icon with glow effect */}
                    <div className="relative flex-shrink-0">
                      <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                    </div>
                    
                    {/* Text */}
                    <span className="flex-1 font-medium group-hover:text-white transition-colors relative z-10 truncate">
                      {action.text}
                    </span>
                    
                    {/* Action indicator */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-3 h-3 text-white/70" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-700/30">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Powered by advanced AI neural networks</span>
            <Cpu className="w-3 h-3 text-blue-400 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}