import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, User, Bell, Search, Globe, Gamepad2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
  isLoading?: boolean;
}

export default function Header({ onConnectWallet, isWalletConnected, walletAddress, isLoading }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'ZH', name: '中文' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
  ];

  const mockNotifications = [
    { id: 1, title: 'Tournament Starting', message: 'Cyber Warriors Championship begins in 1 hour', time: '5m ago' },
    { id: 2, title: 'Reward Earned', message: 'You earned 50 AGT tokens from staking', time: '1h ago' },
    { id: 3, title: 'New Game Available', message: 'Space Odyssey 2.0 is now live!', time: '2h ago' }
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to games section with search
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
      }
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    console.log(`Language changed to ${languages.find(l => l.code === langCode)?.name}`);
  };

  const handleNotificationClick = (notificationId: number) => {
    console.log(`Opening notification ${notificationId}`);
    setShowNotifications(false);
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const handleWalletMenu = () => {
    console.log('Opening wallet menu...');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AI Gaming</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('games')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Games
            </button>
            <button 
              onClick={() => scrollToSection('marketplace')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Marketplace
            </button>
            <button 
              onClick={() => scrollToSection('staking')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Staking
            </button>
            <button 
              onClick={() => scrollToSection('tournaments')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Tournaments
            </button>
            <Link 
              to="/creator-hub" 
              className={`transition-colors ${isActive('/creator-hub') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            >
              Creator Hub
            </Link>
            <Link 
              to="/governance" 
              className={`transition-colors ${isActive('/governance') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            >
              DAO
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isActive('/about') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
            >
              About
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.code}</option>
                ))}
              </select>
            </div>

            {/* User Balance (if connected) */}
            {user && (
              <div className="hidden md:flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-1">
                <span className="text-purple-400 text-sm font-semibold">{user.balances.AGT} AGT</span>
              </div>
            )}

            {/* Wallet Connection */}
            {isWalletConnected && user ? (
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
                <Wallet className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">{formatAddress(walletAddress || '')}</span>
                <button 
                  onClick={handleWalletMenu}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white py-2"
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('games')}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                Games
              </button>
              <button 
                onClick={() => scrollToSection('marketplace')}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                Marketplace
              </button>
              <button 
                onClick={() => scrollToSection('staking')}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                Staking
              </button>
              <button 
                onClick={() => scrollToSection('tournaments')}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                Tournaments
              </button>
              <Link 
                to="/creator-hub" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white py-2"
              >
                Creator Hub
              </Link>
              <Link 
                to="/governance" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white py-2"
              >
                DAO
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white py-2"
              >
                About
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 flex items-center bg-gray-800 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games..."
                className="bg-transparent text-white ml-2 focus:outline-none text-sm flex-1"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}