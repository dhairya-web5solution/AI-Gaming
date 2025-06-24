import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { UserProvider, useUser } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';
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
import OnboardingFlow from './components/OnboardingFlow';
import GameDetailModal from './components/GameDetailModal';
import TournamentRegistration from './components/TournamentRegistration';

function AppContent() {
  const { user, connectWallet, isLoading } = useUser();
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [showTournamentModal, setShowTournamentModal] = useState(false);

  // Show onboarding for new users
  useEffect(() => {
    if (user && user.walletConnected && !user.isOnboarded) {
      setShowOnboarding(true);
    }
  }, [user]);

  // Auto-show AI agent for onboarded users
  useEffect(() => {
    if (user && user.isOnboarded) {
      const hasSeenAI = localStorage.getItem('hasSeenAI');
      if (!hasSeenAI) {
        setTimeout(() => {
          setShowAIAgent(true);
          localStorage.setItem('hasSeenAI', 'true');
        }, 3000); // Show after 3 seconds
      }
    }
  }, [user]);

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
  };

  const handleGamePlay = (gameId: string) => {
    console.log(`Playing game: ${gameId}`);
    // Game play logic is handled in GameDetailModal
  };

  const handleTournamentRegister = (tournament: any) => {
    setSelectedTournament(tournament);
    setShowTournamentModal(true);
  };

  const handleTournamentRegistration = (tournamentId: string) => {
    console.log(`Registered for tournament: ${tournamentId}`);
    setShowTournamentModal(false);
    setSelectedTournament(null);
  };

  const MainPage = () => (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <GamesSection onGameSelect={handleGameSelect} />
      <Marketplace />
      <Staking />
      <Tournaments onTournamentRegister={handleTournamentRegister} />
      <Analytics />
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header 
          onConnectWallet={handleConnectWallet}
          isWalletConnected={!!user?.walletConnected}
          walletAddress={user?.address}
          isLoading={isLoading}
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
        
        {/* Onboarding Flow */}
        <OnboardingFlow 
          isOpen={showOnboarding} 
          onClose={() => setShowOnboarding(false)} 
        />
        
        {/* Game Detail Modal */}
        <GameDetailModal
          gameId={selectedGameId}
          isOpen={!!selectedGameId}
          onClose={() => setSelectedGameId(null)}
          onPlay={handleGamePlay}
        />

        {/* Tournament Registration Modal */}
        <TournamentRegistration
          tournament={selectedTournament}
          isOpen={showTournamentModal}
          onClose={() => {
            setShowTournamentModal(false);
            setSelectedTournament(null);
          }}
          onRegister={handleTournamentRegistration}
        />
        
        {/* AI Agent */}
        {showAIAgent && (
          <AIAgent onClose={() => setShowAIAgent(false)} />
        )}
        
        {/* Global AI Assistant Toggle - Only show for onboarded users */}
        {!showAIAgent && user?.isOnboarded && (
          <button
            onClick={() => setShowAIAgent(true)}
            className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
            title="Open AI Assistant"
          >
            <Bot className="w-6 h-6" />
          </button>
        )}

        {/* Wallet Connection Prompt for Non-Connected Users */}
        {!user?.walletConnected && (
          <div className="fixed bottom-4 left-4 z-40 bg-gray-800 border border-gray-700 rounded-xl p-4 max-w-sm">
            <h3 className="text-white font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400 text-sm mb-3">
              Connect your wallet to start playing games and earning rewards!
            </p>
            <button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </UserProvider>
  );
}

export default App;