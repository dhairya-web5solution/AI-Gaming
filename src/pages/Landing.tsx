import React, { useState } from 'react';
import { Play, TrendingUp, Users, Trophy, ArrowRight, CheckCircle, Star, Zap, Shield, Globe, Cpu, Database, Activity } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Behavior Analysis",
      description: "Real-time classification of player behavior into risk profiles for dynamic reward optimization"
    },
    {
      icon: Database,
      title: "On-Chain Infrastructure",
      description: "Smart contracts deployed for staking, game tracking, and transparent reward distribution"
    },
    {
      icon: Zap,
      title: "Dynamic Yield Adjustment",
      description: "Player performance directly influences DeFi yield through intelligent AI algorithms"
    },
    {
      icon: Globe,
      title: "Cross-Chain Ready",
      description: "Built on EVM with planned migration to WASM for Vara Network integration"
    }
  ];

  const stats = [
    { value: "30+", label: "Early Test Users" },
    { value: "6 min", label: "Avg Session Time" },
    { value: "3-4", label: "Daily Sessions/User" },
    { value: "85%", label: "User Retention" }
  ];

  const technicalHighlights = [
    {
      title: "Smart Contract Suite",
      description: "Deployed contracts for yield logic, leaderboard syncing, and reward distribution",
      status: "Live"
    },
    {
      title: "AI Behavior Engine",
      description: "Real-time player classification and risk profile analysis",
      status: "Active"
    },
    {
      title: "Session Tracking",
      description: "External game sessions logged with wallet session IDs",
      status: "Deployed"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Early Beta Tester",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "The AI-driven yield adjustment is revolutionary. My gaming performance actually impacts my DeFi returns in real-time."
    },
    {
      name: "Marcus Johnson",
      role: "DeFi Investor",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "Finally, a platform where gaming skill translates to financial rewards. The smart contracts are transparent and secure."
    },
    {
      name: "Elena Rodriguez",
      role: "Game Developer",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "The modular architecture makes integration seamless. AI, games, and DeFi components work perfectly together."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      alert(`Thank you for signing up with ${email}! We'll send you early access information soon.`);
      console.log('Email submitted:', email);
    }
  };

  const handleJoinMission = () => {
    window.location.href = '/about';
  };

  const handleViewWhitepaper = () => {
    alert('Opening technical documentation... This would display the technical whitepaper.');
  };

  const handleWatchDemo = () => {
    alert('Opening platform demo... This would play a comprehensive product demonstration.');
  };

  const handleStartPlaying = () => {
    window.location.href = '/#games';
  };

  const handlePartnershipCall = () => {
    alert('Redirecting to partnership calendar... This would open a calendar booking system.');
  };

  const handlePartnershipDeck = () => {
    alert('Opening partnership deck... This would download or display the partnership presentation.');
  };

  const handleTryDemo = () => {
    alert('Opening live platform demo... This would launch the interactive MVP.');
  };

  const handleExploreDeFi = () => {
    window.location.href = '/#staking';
  };

  const handleViewContracts = () => {
    alert('Opening blockchain explorer... This would show deployed smart contracts.');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Gaming Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm font-medium">Live MVP Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Gaming + AI +
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> DeFi</span>
                <br />Revolution
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Experience the world's first platform where player behavior during gameplay 
                influences on-chain DeFi yield through intelligent AI analysis. Connect your wallet, 
                play games, and watch AI adjust your rewards in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleStartPlaying}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Try Live Platform</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo/CTA Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Experience the MVP</h3>
              <p className="text-gray-300 mb-6">
                Join our early test group and be among the first to experience AI-driven 
                DeFi yield optimization through gaming performance.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Join Early Access
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-green-400 font-semibold">Thank you! We'll be in touch soon.</p>
                </div>
              )}
              
              <div className="mt-6 flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-300 ml-2">4.9/5 from early testers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What's Live Now</h2>
            <p className="text-xl text-gray-400">Core infrastructure and features already deployed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center">
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Implementation</h2>
            <p className="text-xl text-gray-400">Deployed infrastructure powering the platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalHighlights.map((highlight, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{highlight.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    highlight.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    highlight.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {highlight.status}
                  </span>
                </div>
                <p className="text-gray-400">{highlight.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={handleViewContracts}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              View Smart Contracts
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Early User Feedback</h2>
            <p className="text-xl text-gray-400">What our test users are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join leading institutions in shaping the future of Gaming + AI + DeFi. 
            Our modular platform is ready to scale with Vara Network integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePartnershipCall}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Schedule Partnership Call
            </button>
            <button 
              onClick={handlePartnershipDeck}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              View Technical Deck
            </button>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Experience the Live Platform</h2>
          <p className="text-xl text-gray-400 mb-8">
            Interact with our deployed MVP and see AI-driven DeFi yield in action
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Live Platform Demo</h3>
              <p className="text-gray-400 mb-4">Experience AI-driven yield optimization firsthand</p>
              <button 
                onClick={handleTryDemo}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Live Demo
              </button>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">DeFi Integration</h3>
              <p className="text-gray-400 mb-4">Explore staking and AI-adjusted rewards</p>
              <button 
                onClick={handleExploreDeFi}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Explore DeFi
              </button>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Smart Contracts</h3>
              <p className="text-gray-400 mb-4">View deployed contracts and transactions</p>
              <button 
                onClick={handleViewContracts}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                View Contracts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}