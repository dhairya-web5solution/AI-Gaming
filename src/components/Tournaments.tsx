import React, { useState, useEffect } from 'react';
import { Trophy, Users, Clock, DollarSign, Calendar, Star, Play } from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  game: string;
  image: string;
  prizePool: number;
  currency: string;
  participants: number;
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  entryFee: number;
  status: 'upcoming' | 'live' | 'ended';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  format: 'single-elimination' | 'round-robin' | 'battle-royale';
}

export default function Tournaments() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [registeredTournaments, setRegisteredTournaments] = useState<Set<string>>(new Set());
  const [displayedTournaments, setDisplayedTournaments] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const allTournaments: Tournament[] = [
    {
      id: '1',
      name: 'Cyber Warriors Championship',
      game: 'Cyber Warriors',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 50000,
      currency: 'USDT',
      participants: 1250,
      maxParticipants: 2000,
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      entryFee: 25,
      status: 'upcoming',
      difficulty: 'expert',
      format: 'single-elimination'
    },
    {
      id: '2',
      name: 'Dragon Realm Quest',
      game: 'Dragon Realm',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 25000,
      currency: 'USDT',
      participants: 890,
      maxParticipants: 1500,
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      entryFee: 15,
      status: 'live',
      difficulty: 'intermediate',
      format: 'round-robin'
    },
    {
      id: '3',
      name: 'Speed Legends Grand Prix',
      game: 'Speed Legends',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 15000,
      currency: 'USDT',
      participants: 567,
      maxParticipants: 1000,
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      entryFee: 10,
      status: 'upcoming',
      difficulty: 'beginner',
      format: 'battle-royale'
    },
    {
      id: '4',
      name: 'Battle Arena Masters',
      game: 'Battle Arena',
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 75000,
      currency: 'USDT',
      participants: 1800,
      maxParticipants: 2500,
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      entryFee: 50,
      status: 'upcoming',
      difficulty: 'expert',
      format: 'single-elimination'
    },
    {
      id: '5',
      name: 'Puzzle Championship',
      game: 'Puzzle Master',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 8000,
      currency: 'USDT',
      participants: 234,
      maxParticipants: 500,
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      entryFee: 5,
      status: 'ended',
      difficulty: 'intermediate',
      format: 'round-robin'
    },
    {
      id: '6',
      name: 'Space Odyssey Explorer',
      game: 'Space Odyssey',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 30000,
      currency: 'USDT',
      participants: 1100,
      maxParticipants: 1800,
      startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      entryFee: 20,
      status: 'upcoming',
      difficulty: 'intermediate',
      format: 'battle-royale'
    },
    // Additional tournaments for load more functionality
    {
      id: '7',
      name: 'Mech Warriors League',
      game: 'Mech Warriors',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 35000,
      currency: 'USDT',
      participants: 945,
      maxParticipants: 1600,
      startDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
      entryFee: 30,
      status: 'upcoming',
      difficulty: 'expert',
      format: 'single-elimination'
    },
    {
      id: '8',
      name: 'Crystal Quest Tournament',
      game: 'Crystal Quest',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 18000,
      currency: 'USDT',
      participants: 678,
      maxParticipants: 1200,
      startDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
      entryFee: 12,
      status: 'upcoming',
      difficulty: 'intermediate',
      format: 'round-robin'
    },
    {
      id: '9',
      name: 'Neon Racers Cup',
      game: 'Neon Racers',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 22000,
      currency: 'USDT',
      participants: 789,
      maxParticipants: 1400,
      startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      entryFee: 18,
      status: 'upcoming',
      difficulty: 'beginner',
      format: 'battle-royale'
    },
    {
      id: '10',
      name: 'Mind Bender Challenge',
      game: 'Mind Bender',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      prizePool: 12000,
      currency: 'USDT',
      participants: 456,
      maxParticipants: 800,
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
      entryFee: 8,
      status: 'upcoming',
      difficulty: 'intermediate',
      format: 'round-robin'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Tournaments' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'live', name: 'Live' },
    { id: 'ended', name: 'Ended' }
  ];

  const filteredTournaments = allTournaments.filter(tournament => {
    if (selectedFilter === 'all') return true;
    return tournament.status === selectedFilter;
  });

  const displayedTournamentsList = filteredTournaments.slice(0, displayedTournaments);
  const hasMoreTournaments = displayedTournaments < filteredTournaments.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 border-green-400';
      case 'intermediate': return 'text-yellow-400 border-yellow-400';
      case 'expert': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleRegister = (tournamentId: string) => {
    const tournament = allTournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    if (tournament.status === 'ended') {
      console.log('This tournament has already ended.');
      return;
    }

    if (tournament.participants >= tournament.maxParticipants) {
      console.log('This tournament is full.');
      return;
    }

    setRegisteredTournaments(prev => new Set([...prev, tournamentId]));
    console.log(`Successfully registered for ${tournament.name}! Entry fee: ${tournament.entryFee} ${tournament.currency}`);
  };

  const handleJoinLive = (tournamentId: string) => {
    console.log(`Joining live tournament ${tournamentId}! This would redirect to the game interface.`);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayedTournaments(prev => prev + 6);
    setIsLoading(false);
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    setDisplayedTournaments(6); // Reset to initial count when changing filter
  };

  return (
    <section id="tournaments" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tournaments
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Compete against players worldwide and win massive prize pools
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-900 rounded-lg p-1">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayedTournamentsList.map(tournament => (
            <div key={tournament.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={tournament.image}
                  alt={tournament.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(tournament.status)}`}>
                  {tournament.status.toUpperCase()}
                </div>

                {/* Difficulty Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(tournament.difficulty)} bg-black/70`}>
                  {tournament.difficulty.toUpperCase()}
                </div>

                {/* Live indicator */}
                {tournament.status === 'live' && (
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">LIVE</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-purple-400 text-sm font-medium">{tournament.game}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {tournament.name}
                </h3>

                {/* Prize Pool */}
                <div className="flex items-center justify-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-bold text-lg">
                    ${tournament.prizePool.toLocaleString()} {tournament.currency}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-white font-semibold">
                        {tournament.participants}/{tournament.maxParticipants}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-white font-semibold">{tournament.entryFee}</span>
                    </div>
                    <div className="text-gray-400 text-xs">Entry Fee</div>
                  </div>
                </div>

                {/* Time Info */}
                <div className="mb-4">
                  {tournament.status === 'upcoming' && (
                    <div className="flex items-center justify-center text-blue-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">Starts in {formatTimeRemaining(tournament.startDate)}</span>
                    </div>
                  )}
                  {tournament.status === 'live' && (
                    <div className="flex items-center justify-center text-green-400">
                      <Play className="w-4 h-4 mr-2" />
                      <span className="text-sm">Ends in {formatTimeRemaining(tournament.endDate)}</span>
                    </div>
                  )}
                  {tournament.status === 'ended' && (
                    <div className="flex items-center justify-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Tournament Ended</span>
                    </div>
                  )}
                </div>

                {/* Format */}
                <div className="text-center mb-4">
                  <span className="text-gray-400 text-sm">Format: </span>
                  <span className="text-white text-sm font-medium capitalize">
                    {tournament.format.replace('-', ' ')}
                  </span>
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  {tournament.status === 'upcoming' && (
                    <button
                      onClick={() => handleRegister(tournament.id)}
                      disabled={registeredTournaments.has(tournament.id) || tournament.participants >= tournament.maxParticipants}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                        registeredTournaments.has(tournament.id)
                          ? 'bg-green-500 text-white cursor-default'
                          : tournament.participants >= tournament.maxParticipants
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                      }`}
                    >
                      {registeredTournaments.has(tournament.id) 
                        ? 'Registered ✓' 
                        : tournament.participants >= tournament.maxParticipants
                        ? 'Tournament Full'
                        : 'Register Now'
                      }
                    </button>
                  )}
                  {tournament.status === 'live' && (
                    <button
                      onClick={() => handleJoinLive(tournament.id)}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Join Live</span>
                    </button>
                  )}
                  {tournament.status === 'ended' && (
                    <button
                      disabled
                      className="w-full bg-gray-600 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Tournament Ended
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMoreTournaments && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : `Load More Tournaments (${filteredTournaments.length - displayedTournaments} remaining)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}