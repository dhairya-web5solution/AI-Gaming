import React, { useState } from 'react';
import { Play, TrendingUp, Users, Trophy, ArrowRight, CheckCircle, Star, Zap, Shield, Globe } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Gaming",
      description: "Experience next-generation gameplay with intelligent NPCs and adaptive difficulty"
    },
    {
      icon: TrendingUp,
      title: "Real Rewards",
      description: "Earn cryptocurrency and NFTs through skill-based gameplay and achievements"
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology with audited smart contracts and provable fairness"
    },
    {
      icon: Globe,
      title: "Cross-Chain Compatible",
      description: "Seamlessly port assets across multiple blockchain networks"
    }
  ];

  const stats = [
    { value: "125K+", label: "Active Players" },
    { value: "$2.5M+", label: "Rewards Paid" },
    { value: "47", label: "Games Available" },
    { value: "15", label: "Supported Chains" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Gamer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "AI Gaming has transformed how I approach competitive gaming. The rewards are real and the AI opponents keep me constantly improving."
    },
    {
      name: "Marcus Johnson",
      role: "DeFi Investor",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "The staking rewards and NFT marketplace provide excellent passive income opportunities. This is the future of gaming finance."
    },
    {
      name: "Elena Rodriguez",
      role: "Game Developer",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      quote: "The Creator Hub SDK made it incredibly easy to integrate DeFi features into my indie game. The no-code modules are game-changing."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      alert(`Thank you for signing up with ${email}! We'll send you early access information soon.`);
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
    }
  };

  const handleJoinMission = () => {
    window.location.href = '/about';
  };

  const handleViewWhitepaper = () => {
    alert('Opening whitepaper... This would download or open the whitepaper PDF.');
    // In production, this would open/download the actual whitepaper
  };

  const handleWatchDemo = () => {
    alert('Opening demo video... This would play a product demonstration video.');
    // In production, this would open a video modal or redirect to a demo page
  };

  const handleStartPlaying = () => {
    window.location.href = '/#games';
  };

  const handlePartnershipCall = () => {
    alert('Redirecting to partnership calendar... This would open a calendar booking system.');
    // In production, this would open Calendly or similar booking system
  };

  const handlePartnershipDeck = () => {
    alert('Opening partnership deck... This would download or display the partnership presentation.');
    // In production, this would open/download the partnership deck
  };

  const handleTryDemo = () => {
    alert('Opening AI Gaming demo... This would launch an interactive demo.');
    // In production, this would open a demo environment
  };

  const handleExploreDeFi = () => {
    window.location.href = '/#staking';
  };

  const handleViewSDK = () => {
    window.location.href = '/creator-hub';
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
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Gaming</span>
                <br />is Here
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Join the revolution where AI meets DeFi in immersive gaming experiences. 
                Earn real rewards, trade unique NFTs, and compete in global tournaments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleStartPlaying}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start Playing Now</span>
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
              <h3 className="text-2xl font-bold text-white mb-4">Get Early Access</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of players earning real rewards. Be among the first to experience 
                the next generation of gaming.
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
                    Get Early Access
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
                <span className="text-gray-300 ml-2">4.9/5 from 1,200+ players</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose AI Gaming?</h2>
            <p className="text-xl text-gray-400">Revolutionary features that set us apart</p>
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

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-400">Real feedback from real players</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
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
            Join leading institutions and ecosystem partners in shaping the future of gaming. 
            Explore collaboration opportunities and institutional access.
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
              View Partnership Deck
            </button>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Experience It Live</h2>
          <p className="text-xl text-gray-400 mb-8">
            See our platform in action with interactive demos and live gameplay
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">AI Gaming Demo</h3>
              <p className="text-gray-400 mb-4">Experience AI-powered gameplay firsthand</p>
              <button 
                onClick={handleTryDemo}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Demo
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">DeFi Features</h3>
              <p className="text-gray-400 mb-4">Explore staking, trading, and rewards</p>
              <button 
                onClick={handleExploreDeFi}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Explore DeFi
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Creator Tools</h3>
              <p className="text-gray-400 mb-4">See how easy it is to build games</p>
              <button 
                onClick={handleViewSDK}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                View SDK
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}