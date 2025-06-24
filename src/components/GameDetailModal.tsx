import React, { useState } from 'react';
import { X, Play, Star, Users, Trophy, DollarSign, Shield, Zap, ExternalLink } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useUser } from '../contexts/UserContext';

interface GameDetailModalProps {
  gameId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (gameId: string) => void;
}

export default function GameDetailModal({ gameId, isOpen, onClose, onPlay }: GameDetailModalProps) {
  const { getGameById } = useGame();
  const { user, updateBalance } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !gameId) return null;

  const game = getGameById(gameId);
  if (!game) return null;

  const handlePlayGame = async () => {
    if (!user) return;

    // Check if user has enough tokens for entry fee
    if (user.balances.AGT < game.entryFee) {
      alert(`Insufficient AGT tokens. You need ${game.entryFee} AGT to play this game.`);
      return;
    }

    setIsPlaying(true);

    // Deduct entry fee
    updateBalance('AGT', -game.entryFee);

    if (game.isExternal && game.externalUrl) {
      // Open external game
      window.open(game.externalUrl, '_blank');
      setIsPlaying(false);
      onClose();
    } else {
      // Simulate internal game play
      setTimeout(() => {
        // Simulate game completion with random score
        const score = Math.floor(Math.random() * 1000) + 500;
        const tokensEarned = Math.floor(score / 100) * 5;
        const nftChance = Math.random();
        
        updateBalance('AGT', tokensEarned);
        
        // Chance to earn NFT tokens
        if (nftChance > 0.8) {
          updateBalance('NFT', 1);
        }

        alert(`Game completed! Score: ${score}\nTokens earned: ${tokensEarned} AGT${nftChance > 0.8 ? '\nBonus: 1 NFT token!' : ''}`);
        setIsPlaying(false);
        onPlay(gameId);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-2xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {game.category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white">{game.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-white">{game.players.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">About This Game</h2>
                <p className="text-gray-300">{game.description}</p>
              </div>

              {/* Game Mechanics */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Game Mechanics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {game.mechanics.map((mechanic, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{mechanic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NFT Usage */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">NFT Integration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {game.nftUsage.map((usage, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">{usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Game Stats */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Game Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entry Fee</span>
                    <span className="text-white font-semibold">{game.entryFee} AGT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Reward</span>
                    <span className="text-green-400 font-semibold">{game.maxReward} AGT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Rewards</span>
                    <span className="text-blue-400 font-semibold">{game.rewards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Players</span>
                    <span className="text-white">{game.players.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* User Balance */}
              {user && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Your Balance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">AGT Tokens</span>
                      <span className="text-white font-semibold">{user.balances.AGT}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT Tokens</span>
                      <span className="text-white font-semibold">{user.balances.NFT}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Play Button */}
              <div className="space-y-3">
                <button
                  onClick={handlePlayGame}
                  disabled={isPlaying || !user || user.balances.AGT < game.entryFee}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isPlaying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Playing...</span>
                    </>
                  ) : game.isExternal ? (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      <span>Play External Game</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Play Now</span>
                    </>
                  )}
                </button>

                {user && user.balances.AGT < game.entryFee && (
                  <p className="text-red-400 text-sm text-center">
                    Insufficient AGT tokens. Need {game.entryFee - user.balances.AGT} more AGT.
                  </p>
                )}

                <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Secure & Fair Play Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}