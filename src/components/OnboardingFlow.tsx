import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Bot, Wallet, Play, Trophy, TrendingUp, Shield } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingFlow({ isOpen, onClose }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, completeOnboarding, updateBalance } = useUser();
  const totalSteps = 4;

  if (!isOpen || !user || user.isOnboarded) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and give welcome bonus
      completeOnboarding();
      updateBalance('AGT', 100); // Welcome bonus
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartPlaying = () => {
    // Complete onboarding
    completeOnboarding();
    updateBalance('AGT', 100); // Welcome bonus
    onClose();
    
    // Scroll to games section
    setTimeout(() => {
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const steps = [
    {
      title: "Welcome to AI Gaming!",
      content: (
        <div className="text-center">
          <Bot className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Hi there, {user.username}!</h3>
          <p className="text-gray-300 mb-6">
            I'm your AI assistant, and I'm here to guide you through the amazing world of AI Gaming. 
            You'll learn how to play games, earn real rewards, and participate in our DeFi ecosystem.
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold">🎁 Welcome Bonus: 100 AGT Tokens!</p>
          </div>
        </div>
      )
    },
    {
      title: "How to Play & Earn",
      content: (
        <div>
          <Play className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-4 text-center">Gameplay & Rewards</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <h4 className="text-white font-semibold">Choose Your Game</h4>
                <p className="text-gray-400 text-sm">Browse our collection of AI-powered games across different categories</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <h4 className="text-white font-semibold">Play & Compete</h4>
                <p className="text-gray-400 text-sm">Compete against AI opponents and other players to earn tokens</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <h4 className="text-white font-semibold">Earn Rewards</h4>
                <p className="text-gray-400 text-sm">Get AGT, NFT, and TOUR tokens based on your performance</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "DeFi & Staking",
      content: (
        <div>
          <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-4 text-center">Maximize Your Earnings</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Staking Pools</h4>
              <p className="text-gray-400 text-sm">Stake your tokens in our pools to earn passive rewards with APYs up to 35%</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">NFT Marketplace</h4>
              <p className="text-gray-400 text-sm">Trade unique gaming assets, skins, and collectibles with other players</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Tournaments</h4>
              <p className="text-gray-400 text-sm">Compete in tournaments with massive prize pools and climb the leaderboards</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Security & Safety",
      content: (
        <div>
          <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-4 text-center">Stay Safe</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Never share your private keys or seed phrase</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">All smart contracts are audited and secure</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Start with small amounts to learn the platform</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Use our AI assistant for help anytime</span>
            </div>
          </div>
          <div className="mt-6 bg-purple-500/20 border border-purple-500 rounded-lg p-4">
            <p className="text-purple-300 text-center font-semibold">
              🎉 You're ready to start your AI Gaming journey!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">AI Gaming Onboarding</h2>
              <p className="text-gray-400 text-sm">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {steps[currentStep - 1].title}
          </h2>
          {steps[currentStep - 1].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={currentStep === totalSteps ? handleStartPlaying : handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            <span>{currentStep === totalSteps ? 'Start Playing!' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}