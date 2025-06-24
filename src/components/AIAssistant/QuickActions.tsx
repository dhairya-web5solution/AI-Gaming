import React from 'react';
import { Gamepad2, TrendingUp, Shield, Lightbulb, Users, Trophy, DollarSign, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    { 
      icon: Gamepad2, 
      text: "Show me the best games for beginners", 
      action: "What are the best games for beginners to start earning rewards?" 
    },
    { 
      icon: TrendingUp, 
      text: "How to maximize my earnings", 
      action: "How can I maximize my earnings on this platform?" 
    },
    { 
      icon: Shield, 
      text: "DeFi safety and security tips", 
      action: "What are the important DeFi safety tips I should know?" 
    },
    { 
      icon: Lightbulb, 
      text: "Platform tutorial and guide", 
      action: "Can you give me a tutorial on how to use this platform?" 
    },
    { 
      icon: Users, 
      text: "How does the referral program work", 
      action: "How does the referral program work and how can I earn from it?" 
    },
    { 
      icon: Trophy, 
      text: "Tell me about tournaments", 
      action: "How do tournaments work and how can I participate?" 
    },
    { 
      icon: DollarSign, 
      text: "Explain staking and rewards", 
      action: "Can you explain how staking works and what rewards I can earn?" 
    },
    { 
      icon: HelpCircle, 
      text: "General platform help", 
      action: "I'm new here, can you help me understand what this platform is about?" 
    }
  ];

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.slice(0, 4).map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => onActionClick(action.action)}
                className="flex items-center space-x-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300 text-left"
              >
                <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="truncate">{action.text}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-1">
        {quickActions.slice(4).map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index + 4}
              onClick={() => onActionClick(action.action)}
              className="flex items-center space-x-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300 text-left"
            >
              <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="truncate">{action.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}