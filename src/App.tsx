import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import GamesSection from './components/GamesSection';
import Marketplace from './components/Marketplace';
import Staking from './components/Staking';
import Tournaments from './components/Tournaments';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import About from './pages/About';
import Landing from './pages/Landing';
import CreatorHub from './pages/CreatorHub';
import Governance from './pages/Governance';
import ReferralHub from './pages/ReferralHub';
import AIAgent from './components/AIAgent';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showAIAgent, setShowAIAgent] = useState(false);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(mockAddress);
    setIsWalletConnected(true);
    
    // Show success message and AI agent
    console.log('Wallet connected successfully! This is a demo - in production, this would integrate with MetaMask or other wallet providers.');
    setShowAIAgent(true);
  };

  const MainPage = () => (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <GamesSection />
      <Marketplace />
      <Staking />
      <Tournaments />
      <Analytics />
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header 
          onConnectWallet={handleConnectWallet}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
        />
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/creator-hub" element={<CreatorHub />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/referral" element={<ReferralHub />} />
        </Routes>
        
        <Footer />
        
        {/* AI Agent */}
        {showAIAgent && (
          <AIAgent onClose={() => setShowAIAgent(false)} />
        )}
        
        {/* Global AI Assistant Toggle */}
        {!showAIAgent && (
          <button
            onClick={() => setShowAIAgent(true)}
            className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
            title="Open AI Assistant"
          >
            <Bot className="w-6 h-6" />
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;