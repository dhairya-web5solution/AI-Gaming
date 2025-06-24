import React, { useState, useEffect } from 'react';
import { Play, TrendingUp, Users, Trophy, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    totalPlayers: 125000,
    totalRewards: 2500000,
    activeGames: 45,
    tournaments: 12
  });

  const slides = [
    {
      title: "AI-Powered Gaming Revolution",
      subtitle: "Experience the future of gaming with AI-enhanced gameplay and DeFi rewards",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    },
    {
      title: "Earn While You Play",
      subtitle: "Turn your gaming skills into real rewards with our play-to-earn ecosystem",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    },
    {
      title: "Compete in Tournaments",
      subtitle: "Join global tournaments and compete for massive prize pools",
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate stats on mount
    const animateStats = () => {
      setStats(prev => ({
        totalPlayers: Math.floor(Math.random() * 10000) + 120000,
        totalRewards: Math.floor(Math.random() * 100000) + 2400000,
        activeGames: Math.floor(Math.random() * 5) + 42,
        tournaments: Math.floor(Math.random() * 3) + 10
      }));
    };

    const interval = setInterval(animateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartPlaying = () => {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGames = () => {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleStartPlaying}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Playing</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleExploreGames}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Explore Games
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalPlayers.toLocaleString()}</div>
              <div className="text-gray-300 text-sm">Total Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">${stats.totalRewards.toLocaleString()}</div>
              <div className="text-gray-300 text-sm">Total Rewards</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Play className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.activeGames}</div>
              <div className="text-gray-300 text-sm">Active Games</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.tournaments}</div>
              <div className="text-gray-300 text-sm">Live Tournaments</div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}