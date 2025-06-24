import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Bot, Wallet, Play, Trophy, TrendingUp, Shield, Sparkles, Zap, Star, Gift, CheckCircle, Users, DollarSign } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingFlow({ isOpen, onClose }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { user, completeOnboarding, updateBalance } = useUser();
  const totalSteps = 5;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setCompletedSteps(new Set());
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen || !user || user.isOnboarded) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsAnimating(true);
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleStartPlaying = () => {
    // Complete onboarding with enhanced rewards
    completeOnboarding();
    updateBalance('AGT', 200); // Enhanced welcome bonus
    updateBalance('NFT', 3); // Starter NFTs
    updateBalance('TOUR', 10); // Tournament tokens
    
    // Show success message
    alert('🎉 Welcome bonus received!\n• 200 AGT Tokens\n• 3 Starter NFTs\n• 10 Tournament Tokens\n\nYour AI Gaming journey begins now!');
    
    onClose();
    
    // Scroll to games section
    setTimeout(() => {
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleComplete = () => {
    // Complete onboarding with rewards
    completeOnboarding();
    updateBalance('AGT', 200);
    updateBalance('NFT', 3);
    updateBalance('TOUR', 10);
    
    alert('🎉 Onboarding completed! Welcome bonus added to your account.');
    onClose();
  };

  const steps = [
    {
      title: "Welcome to AI Gaming Universe!",
      subtitle: "Your Gateway to Intelligent Gaming & Real Rewards",
      icon: Bot,
      gradient: "from-purple-600 via-blue-600 to-indigo-600",
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse opacity-50"></div>
              <Bot className="w-12 h-12 text-white relative z-10" />
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Hello, {user.username}! 👋</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Welcome to the future of gaming! I'm your AI assistant, ready to guide you through an incredible journey where gaming meets artificial intelligence and decentralized finance.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Gift className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">Welcome Bonus Package</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-purple-400 font-bold text-xl">200</div>
                <div className="text-gray-300 text-sm">AGT Tokens</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-blue-400 font-bold text-xl">3</div>
                <div className="text-gray-300 text-sm">Starter NFTs</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-green-400 font-bold text-xl">10</div>
                <div className="text-gray-300 text-sm">TOUR Tokens</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Secure & Audited</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span>125K+ Players</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span>$2.5M+ Rewards Paid</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI-Powered Gaming Experience",
      subtitle: "Intelligent Gameplay with Real Rewards",
      icon: Zap,
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300 text-lg">Experience next-generation gaming with AI-enhanced opponents and dynamic difficulty adjustment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h4 className="text-white font-semibold">Choose Your Game</h4>
              </div>
              <p className="text-gray-400 text-sm">Browse 47+ AI-powered games across Strategy, RPG, Racing, and Puzzle categories.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-cyan-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h4 className="text-white font-semibold">AI-Enhanced Play</h4>
              </div>
              <p className="text-gray-400 text-sm">Compete against intelligent AI opponents that adapt to your skill level and playing style.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-teal-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h4 className="text-white font-semibold">Earn Real Rewards</h4>
              </div>
              <p className="text-gray-400 text-sm">Get AGT, NFT, and TOUR tokens based on your performance and achievements.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <h4 className="text-white font-semibold">Level Up & Grow</h4>
              </div>
              <p className="text-gray-400 text-sm">Progress through levels, unlock new games, and access exclusive tournaments.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Pro Tip</span>
            </div>
            <p className="text-gray-300 text-sm">Start with Puzzle Master or Dragon Realm for beginner-friendly gameplay with steady rewards!</p>
          </div>
        </div>
      )
    },
    {
      title: "DeFi & Passive Earning",
      subtitle: "Maximize Returns with Smart Staking",
      icon: TrendingUp,
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300 text-lg">Multiply your earnings through our advanced DeFi ecosystem with industry-leading APYs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold text-lg">Staking Pools</h4>
                <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">HOT</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tournament Pool</span>
                  <span className="text-green-400 font-bold">35.8% APY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gaming Token Pool</span>
                  <span className="text-green-400 font-bold">25.5% APY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">NFT Rewards Pool</span>
                  <span className="text-green-400 font-bold">18.2% APY</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl p-6 border border-emerald-500/30">
              <h4 className="text-white font-bold text-lg mb-4">NFT Marketplace</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Trade unique gaming assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Utility NFTs enhance gameplay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Rare collectibles appreciate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Cross-game compatibility</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20">
            <h4 className="text-white font-semibold mb-3">💰 Earning Potential Calculator</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-green-400 font-bold text-xl">$50-500</div>
                <div className="text-gray-400 text-sm">Daily Gaming</div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-xl">$100-1000</div>
                <div className="text-gray-400 text-sm">Monthly Staking</div>
              </div>
              <div>
                <div className="text-teal-400 font-bold text-xl">$200-2000</div>
                <div className="text-gray-400 text-sm">Tournament Prizes</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tournaments & Competition",
      subtitle: "Compete for Massive Prize Pools",
      icon: Trophy,
      gradient: "from-yellow-600 via-orange-600 to-red-600",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300 text-lg">Join competitive tournaments with prize pools up to $75,000 and climb the global leaderboards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-yellow-400 font-bold text-xl">$75K</div>
              <div className="text-gray-300 text-sm">Max Prize Pool</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30 text-center">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-orange-400 font-bold text-xl">2,500</div>
              <div className="text-gray-300 text-sm">Max Players</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-4 border border-red-500/30 text-center">
              <Star className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 font-bold text-xl">24/7</div>
              <div className="text-gray-300 text-sm">Active Events</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">🏆 Cyber Warriors Championship</span>
                <span className="text-yellow-400 font-bold">$50K Prize</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Entry: 25 AGT • Format: Single Elimination</span>
                <span className="text-green-400">Starts in 2 days</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">🐉 Dragon Realm Quest</span>
                <span className="text-orange-400 font-bold">$25K Prize</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Entry: 15 AGT • Format: Round Robin</span>
                <span className="text-blue-400">Live Now</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">🏎️ Speed Legends Grand Prix</span>
                <span className="text-red-400 font-bold">$15K Prize</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Entry: 10 AGT • Format: Battle Royale</span>
                <span className="text-purple-400">Registration Open</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-xl p-4 border border-yellow-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Tournament Strategy</span>
            </div>
            <p className="text-gray-300 text-sm">Start with smaller tournaments to build skills, then progress to high-stakes competitions. Your 10 TOUR tokens can enter multiple events!</p>
          </div>
        </div>
      )
    },
    {
      title: "Security & Best Practices",
      subtitle: "Stay Safe in the DeFi Gaming World",
      icon: Shield,
      gradient: "from-gray-600 via-slate-600 to-gray-700",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300 text-lg">Learn essential security practices to protect your assets and maximize your gaming experience safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-3">🔒 Security Essentials</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Never share private keys</div>
                    <div className="text-gray-400 text-sm">Your seed phrase is your ultimate security</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Use hardware wallets</div>
                    <div className="text-gray-400 text-sm">For large amounts and long-term storage</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Verify contract addresses</div>
                    <div className="text-gray-400 text-sm">Always double-check before transactions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Start with small amounts</div>
                    <div className="text-gray-400 text-sm">Learn the platform before big investments</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-3">🛡️ Platform Security</h4>
              <div className="space-y-3">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 font-semibold text-sm">✓ Audited Smart Contracts</div>
                  <div className="text-gray-300 text-xs">Verified by leading security firms</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-blue-400 font-semibold text-sm">✓ Multi-Signature Security</div>
                  <div className="text-gray-300 text-xs">Treasury funds protected</div>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                  <div className="text-purple-400 font-semibold text-sm">✓ Insurance Coverage</div>
                  <div className="text-gray-300 text-xs">Protection against smart contract risks</div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="text-yellow-400 font-semibold text-sm">✓ 24/7 AI Monitoring</div>
                  <div className="text-gray-300 text-xs">Real-time threat detection</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-green-500/20">
            <div className="text-center">
              <h4 className="text-white font-bold text-lg mb-3">🎉 You're Ready to Begin!</h4>
              <p className="text-gray-300 mb-4">
                You now have all the knowledge needed to safely navigate and profit from the AI Gaming ecosystem. 
                Your welcome bonus is waiting, and the AI assistant is here to help you every step of the way.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">AI Assistant Ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Gift className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Bonus Tokens Ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Games Unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute top-12 right-12">
            <Star className="w-4 h-4 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-12 left-12">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-8 right-8">
            <Bot className="w-6 h-6 text-green-400 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Enhanced Header */}
        <div className={`relative bg-gradient-to-r ${currentStepData.gradient} p-6 overflow-hidden`}>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse"></div>
          
          {/* Neural network pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-8 left-16 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-6 right-20 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-20 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <StepIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentStepData.title}</h2>
                <p className="text-white/80 text-lg">{currentStepData.subtitle}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-white/70 text-sm">Step {currentStep} of {totalSteps}</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i + 1 <= currentStep ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="px-6 py-4 bg-gray-800/50">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentStepData.gradient} transition-all duration-500 relative overflow-hidden`}
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Progress: {Math.round((currentStep / totalSteps) * 100)}%</span>
            <span>{totalSteps - currentStep} steps remaining</span>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh] relative">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
            {currentStepData.content}
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 text-gray-400 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-3">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`relative transition-all duration-300 ${
                  i + 1 <= currentStep ? 'scale-110' : 'scale-100'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i + 1 < currentStep 
                      ? 'bg-green-500' 
                      : i + 1 === currentStep 
                      ? `bg-gradient-to-r ${currentStepData.gradient.split(' ')[1]} ${currentStepData.gradient.split(' ')[3]}` 
                      : 'bg-gray-600'
                  }`}
                />
                {completedSteps.has(i + 1) && (
                  <CheckCircle className="w-3 h-3 text-green-400 absolute inset-0" />
                )}
              </div>
            ))}
          </div>

          {currentStep === totalSteps ? (
            <div className="flex space-x-3">
              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete Setup</span>
              </button>
              <button
                onClick={handleStartPlaying}
                className={`flex items-center space-x-2 bg-gradient-to-r ${currentStepData.gradient} text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Play className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Start Gaming!</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className={`flex items-center space-x-2 bg-gradient-to-r ${currentStepData.gradient} text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Continue</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}