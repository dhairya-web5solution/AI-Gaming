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

  // Show onboarding for new users immediately after wallet connection
  useEffect(() => {
    if (user && user.walletConnected && !user.isOnboarded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Auto-show AI agent after onboarding completion
  useEffect(() => {
    if (user && user.isOnboarded && !showOnboarding) {
      const timer = setTimeout(() => {
        setShowAIAgent(true);
      }, 1500); // Show 1.5 seconds after onboarding

      return () => clearTimeout(timer);
    }
  }, [user?.isOnboarded, showOnboarding]);

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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // AI Agent will auto-show due to the useEffect above
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
        
        {/* Enhanced Onboarding Flow - Higher priority */}
        <OnboardingFlow 
          isOpen={showOnboarding} 
          onClose={handleOnboardingComplete}
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
        
        {/* AI Agent - Show for all users, not just onboarded */}
        {showAIAgent && !showOnboarding && (
          <AIAgent onClose={() => setShowAIAgent(false)} />
        )}
        
        {/* Global AI Assistant Toggle - Show for all users when not in onboarding */}
        {!showAIAgent && !showOnboarding && (
          <button
            onClick={() => setShowAIAgent(true)}
            className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse group"
            title="Open AI Assistant"
          >
            <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Enhanced Wallet Connection Prompt for Non-Connected Users */}
        {!user?.walletConnected && !showOnboarding && (
          <div className="fixed bottom-4 left-4 z-40 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-2xl p-6 max-w-sm shadow-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Welcome to AI Gaming!</h3>
                <p className="text-gray-400 text-sm">Your gaming adventure awaits</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connect your wallet to start playing games, earning rewards, and accessing our DeFi features!
            </p>
            <div className="space-y-3">
              <button
                onClick={handleConnectWallet}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>🔒 Secure</span>
                <span>⚡ Fast</span>
                <span>🎁 Bonus Included</span>
              </div>
            </div>
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