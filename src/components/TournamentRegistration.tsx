import React, { useState } from 'react';
import { X, Trophy, Users, Clock, DollarSign, Play, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Tournament {
  id: string;
  name: string;
  game: string;
  prizePool: number;
  entryFee: number;
  participants: number;
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'live' | 'ended';
  format: string;
}

interface TournamentRegistrationProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (tournamentId: string) => void;
}

export default function TournamentRegistration({ 
  tournament, 
  isOpen, 
  onClose, 
  onRegister 
}: TournamentRegistrationProps) {
  const { user, updateBalance } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen || !tournament) return null;

  const handleRegister = async () => {
    if (!user) return;

    if (user.balances.AGT < tournament.entryFee) {
      alert(`Insufficient AGT tokens. You need ${tournament.entryFee} AGT to register.`);
      return;
    }

    setIsRegistering(true);

    // Simulate registration process
    setTimeout(() => {
      updateBalance('AGT', -tournament.entryFee);
      setIsRegistered(true);
      setIsRegistering(false);
      onRegister(tournament.id);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsRegistered(false);
      }, 2000);
    }, 1500);
  };

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h remaining`;
  };

  if (isRegistered) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
          <p className="text-gray-300 mb-4">
            You're now registered for {tournament.name}
          </p>
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <p className="text-green-400 font-semibold">
              Good luck in the tournament! 🏆
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Tournament Registration</h2>
              <p className="text-gray-400 text-sm">{tournament.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tournament Info */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Tournament Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm">Game</div>
                <div className="text-white font-semibold">{tournament.game}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Format</div>
                <div className="text-white font-semibold capitalize">{tournament.format.replace('-', ' ')}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Prize Pool</div>
                <div className="text-yellow-400 font-bold">${tournament.prizePool.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Entry Fee</div>
                <div className="text-white font-semibold">{tournament.entryFee} AGT</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Participants</div>
                <div className="text-white font-semibold">{tournament.participants}/{tournament.maxParticipants}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Starts In</div>
                <div className="text-blue-400 font-semibold">{formatTimeRemaining(tournament.startDate)}</div>
              </div>
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Prize Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-semibold">🥇 1st Place</span>
                <span className="text-white font-bold">${Math.floor(tournament.prizePool * 0.5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-semibold">🥈 2nd Place</span>
                <span className="text-white font-bold">${Math.floor(tournament.prizePool * 0.3).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-semibold">🥉 3rd Place</span>
                <span className="text-white font-bold">${Math.floor(tournament.prizePool * 0.2).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* User Balance */}
          {user && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Balance</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">AGT Tokens</span>
                <span className="text-white font-semibold">{user.balances.AGT}</span>
              </div>
              {user.balances.AGT < tournament.entryFee && (
                <p className="text-red-400 text-sm mt-2">
                  Insufficient balance. You need {tournament.entryFee - user.balances.AGT} more AGT tokens.
                </p>
              )}
            </div>
          )}

          {/* Registration Button */}
          <div className="space-y-3">
            <button
              onClick={handleRegister}
              disabled={
                isRegistering || 
                !user || 
                user.balances.AGT < tournament.entryFee ||
                tournament.participants >= tournament.maxParticipants ||
                tournament.status !== 'upcoming'
              }
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isRegistering ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  <span>Register for Tournament</span>
                </>
              )}
            </button>

            <div className="text-center text-gray-400 text-sm">
              Registration fee will be deducted from your AGT balance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}