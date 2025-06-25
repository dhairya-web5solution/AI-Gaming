import React, { useState } from 'react';
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
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIAgent from './components/AIAgent';
import GameDetailModal from './components/GameDetailModal';
import TournamentRegistration from './components/TournamentRegistration';

function AppContent() {
  const { user, connectWallet, isLoading } = useUser();
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [showTournamentModal, setShowTournamentModal] = useState(false);

  // Auto-show AI agent for connected users
  React.useEffect(() => {
    if (user && user.walletConnected) {
      const timer = setTimeout(() => {
        setShowAIAgent(true);
      }, 2000); // Show 2 seconds after wallet connection

      return () => clearTimeout(timer);
    }
  }, [user?.walletConnected]);

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        
        <Footer />
        
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
        
        {/* Global AI Assistant Toggle */}
        {!showAIAgent && (
          <button
            onClick={() => setShowAIAgent(true)}
            className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse group"
            title="Open AI Assistant"
          >
            <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Enhanced Wallet Connection Prompt for Non-Connected Users */}
        {!user?.walletConnected && (
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