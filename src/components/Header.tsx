import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, User, Search, Globe, Gamepad2, LogOut, Settings, UserCircle, AlertCircle, Activity } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import BlockchainDashboard from './BlockchainDashboard';

interface HeaderProps {
  onConnectWallet?: () => void;
  isWalletConnected?: boolean;
  walletAddress?: string;
  isLoading?: boolean;
}

export default function Header({ onConnectWallet, isWalletConnected, walletAddress, isLoading }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBlockchainDashboard, setShowBlockchainDashboard] = useState(false);
  const [walletError, setWalletError] = useState('');
  const location = useLocation();
  const { user, logout, connectWallet, disconnectWallet, isAuthenticated } = useUser();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
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

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleProfile = () => {
    window.location.href = '/profile';
    setShowUserMenu(false);
  };

  const handleSettings = () => {
    window.location.href = '/settings';
    setShowUserMenu(false);
  };

  const handleConnectWallet = async () => {
    if (!isAuthenticated) {
      alert('Please login first to connect your wallet');
      return;
    }
    
    setWalletError('');
    try {
      await connectWallet();
      setShowUserMenu(false);
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      setWalletError(error.message || 'Failed to connect wallet');
      
      // Show error for 5 seconds
      setTimeout(() => {
        setWalletError('');
      }, 5000);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setShowUserMenu(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
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
              {/* Blockchain Dashboard Button */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowBlockchainDashboard(true)}
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 px-3 py-2 rounded-lg hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-200 flex items-center space-x-2"
                  title="View Blockchain Activity"
                >
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Live Dashboard</span>
                </button>
              )}

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

              {/* Authentication */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
                  >
                    <UserCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-white text-sm">{user.username}</span>
                    {user.walletConnected && user.address && (
                      <div className="flex items-center space-x-1">
                        <Wallet className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-xs">{formatAddress(user.address)}</span>
                      </div>
                    )}
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-white font-semibold">{user.username}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <p className="text-purple-400 text-sm">Level {user.level} • {user.xp} XP</p>
                      </div>
                      
                      {/* Wallet Section */}
                      <div className="px-4 py-2 border-b border-gray-700">
                        {user.walletConnected ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Wallet className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm">Wallet Connected</span>
                            </div>
                            <p className="text-gray-300 text-xs mb-1">{user.address}</p>
                            {user.balances.ETH > 0 && (
                              <p className="text-gray-400 text-xs mb-2">Balance: {user.balances.ETH} ETH</p>
                            )}
                            <button
                              onClick={handleDisconnectWallet}
                              className="text-red-400 hover:text-red-300 text-xs transition-colors"
                            >
                              Disconnect Wallet
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={handleConnectWallet}
                              disabled={isLoading}
                              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm disabled:opacity-50"
                            >
                              <Wallet className="w-4 h-4" />
                              <span>{isLoading ? 'Connecting...' : 'Connect MetaMask'}</span>
                            </button>
                            {walletError && (
                              <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-xs">
                                <div className="flex items-center space-x-1">
                                  <AlertCircle className="w-3 h-3 text-red-400" />
                                  <span className="text-red-400">{walletError}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleProfile}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={handleSettings}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
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

        {/* Click outside to close user menu */}
        {showUserMenu && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </header>

      {/* Blockchain Dashboard Modal */}
      <BlockchainDashboard 
        isOpen={showBlockchainDashboard}
        onClose={() => setShowBlockchainDashboard(false)}
      />
    </>
  );
}