import React from 'react';
import { Gamepad2, TrendingUp, Shield, Lightbulb, Users, Trophy, DollarSign, HelpCircle, Brain, Zap, Target, BarChart3 } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    { 
      icon: Brain, 
      text: "Analyze my performance", 
      action: "Analyze my gaming performance, win rate, and earnings. Show me detailed insights and improvement opportunities.",
      gradient: "from-purple-500 to-blue-500"
    },
    { 
      icon: TrendingUp, 
      text: "Optimize my portfolio", 
      action: "Review my token balances and provide AI-powered optimization recommendations for maximum returns.",
      gradient: "from-green-500 to-teal-500"
    },
    { 
      icon: Target, 
      text: "Find best earning strategies", 
      action: "Show me personalized earning strategies based on my skill level, available time, and risk tolerance.",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: Gamepad2, 
      text: "Recommend games for me", 
      action: "Recommend games that match my skill level, interests, and earning goals. Include difficulty and reward analysis.",
      gradient: "from-blue-500 to-indigo-500"
    },
    { 
      icon: BarChart3, 
      text: "Calculate earning potential", 
      action: "Calculate my potential daily and monthly earnings across gaming, staking, tournaments, and NFT trading.",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: Shield, 
      text: "Explain security best practices", 
      action: "Provide comprehensive security guidelines for DeFi, wallet protection, and safe trading practices.",
      gradient: "from-gray-500 to-slate-600"
    },
    { 
      icon: Trophy, 
      text: "Find tournaments for my level", 
      action: "Show me tournaments that match my skill level and budget. Include ROI analysis and winning strategies.",
      gradient: "from-yellow-400 to-amber-500"
    },
    { 
      icon: Zap, 
      text: "Show advanced strategies", 
      action: "Reveal advanced earning techniques, market insights, and professional gaming strategies for experienced users.",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800/30">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span>AI-Powered Quick Actions</span>
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {quickActions.slice(0, 4).map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => onActionClick(action.action)}
                className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 text-sm text-white text-left border border-white/10 hover:border-white/20 group`}
              >
                <Icon className="w-4 h-4 text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate font-medium">{action.text}</span>
                <Zap className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              className={`flex items-center space-x-3 p-2 bg-gradient-to-r ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 text-sm text-white text-left border border-white/10 hover:border-white/20 group`}
            >
              <Icon className="w-4 h-4 text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">{action.text}</span>
              <Zap className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          💡 Powered by advanced AI neural networks for intelligent assistance
        </p>
      </div>
    </div>
  );
}