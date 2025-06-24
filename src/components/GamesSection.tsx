import React, { useState } from 'react';
import { Filter, Search, Grid, List, ExternalLink } from 'lucide-react';
import GameCard from './GameCard';

export default function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedGames, setDisplayedGames] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Games', count: 47 },
    { id: 'prediction', name: 'Prediction', count: 1 },
    { id: 'fantasy', name: 'Fantasy', count: 1 },
    { id: 'strategy', name: 'Strategy', count: 12 },
    { id: 'rpg', name: 'RPG', count: 8 },
    { id: 'action', name: 'Action', count: 15 },
    { id: 'puzzle', name: 'Puzzle', count: 6 },
    { id: 'racing', name: 'Racing', count: 4 }
  ];

  const allGames = [
    {
      id: 'prediction',
      title: 'Prediction Markets',
      description: 'Predict future events and earn rewards based on your accuracy',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Prediction',
      players: 15000,
      rating: 4.3,
      rewards: '$250/day',
      isNew: true,
      isTrending: true,
      isExternal: true,
      externalUrl: 'https://prediction.web5product.com/'
    },
    {
      id: 'fantasy',
      title: 'Fantasy Games',
      description: 'Create your dream team and compete in fantasy leagues',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Fantasy',
      players: 28000,
      rating: 4.6,
      rewards: '$350/day',
      isNew: true,
      isTrending: true,
      isExternal: true,
      externalUrl: 'https://fantasy.web5product.com/'
    },
    {
      id: '1',
      title: 'Cyber Warriors',
      description: 'Epic sci-fi strategy game with AI-powered opponents and massive rewards',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 25000,
      rating: 4.8,
      rewards: '$500/day',
      isNew: true,
      isTrending: true,
      isExternal: false
    },
    {
      id: '2',
      title: 'Dragon Realm',
      description: 'Immersive RPG with blockchain-based character progression',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 18000,
      rating: 4.6,
      rewards: '$300/day',
      isNew: false,
      isTrending: true,
      isExternal: false
    },
    {
      id: '3',
      title: 'Speed Legends',
      description: 'High-octane racing with NFT cars and tournament prizes',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 12000,
      rating: 4.7,
      rewards: '$200/day',
      isNew: true,
      isTrending: false,
      isExternal: false
    },
    {
      id: '4',
      title: 'Puzzle Master',
      description: 'Brain-teasing puzzles with cryptocurrency rewards',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 8000,
      rating: 4.5,
      rewards: '$150/day',
      isNew: false,
      isTrending: false,
      isExternal: false
    },
    {
      id: '5',
      title: 'Battle Arena',
      description: 'Intense PvP battles with real-time rewards',
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 35000,
      rating: 4.9,
      rewards: '$750/day',
      isNew: false,
      isTrending: true,
      isExternal: false
    },
    {
      id: '6',
      title: 'Space Odyssey',
      description: 'Explore the galaxy and earn tokens through discovery',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 22000,
      rating: 4.4,
      rewards: '$400/day',
      isNew: true,
      isTrending: false,
      isExternal: false
    },
    // Additional games for load more functionality
    {
      id: '7',
      title: 'Mech Warriors',
      description: 'Pilot giant mechs in strategic combat scenarios',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 19000,
      rating: 4.5,
      rewards: '$320/day',
      isNew: false,
      isTrending: false,
      isExternal: false
    },
    {
      id: '8',
      title: 'Crystal Quest',
      description: 'Magical adventure with rare crystal NFT rewards',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 14000,
      rating: 4.7,
      rewards: '$280/day',
      isNew: true,
      isTrending: false,
      isExternal: false
    },
    {
      id: '9',
      title: 'Neon Racers',
      description: 'Futuristic racing with customizable vehicles',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 16000,
      rating: 4.6,
      rewards: '$240/day',
      isNew: false,
      isTrending: true,
      isExternal: false
    },
    {
      id: '10',
      title: 'Mind Bender',
      description: 'Advanced puzzle challenges with AI assistance',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 9500,
      rating: 4.8,
      rewards: '$180/day',
      isNew: true,
      isTrending: false,
      isExternal: false
    },
    {
      id: '11',
      title: 'Galactic Empire',
      description: 'Build and manage your space empire',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 21000,
      rating: 4.4,
      rewards: '$380/day',
      isNew: false,
      isTrending: false,
      isExternal: false
    },
    {
      id: '12',
      title: 'Combat Zone',
      description: 'Tactical shooter with team-based gameplay',
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 31000,
      rating: 4.7,
      rewards: '$680/day',
      isNew: false,
      isTrending: true,
      isExternal: false
    }
  ];

  const filteredGames = allGames.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedGamesList = filteredGames.slice(0, displayedGames);
  const hasMoreGames = displayedGames < filteredGames.length;

  const handlePlayGame = (gameId: string) => {
    const game = allGames.find(g => g.id === gameId);
    if (game?.isExternal && game.externalUrl) {
      window.open(game.externalUrl, '_blank');
    } else {
      console.log(`Starting game: ${gameId}`);
      // In production, this would redirect to the game interface
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayedGames(prev => prev + 6);
    setIsLoading(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayedGames(6); // Reset to initial count when changing category
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setDisplayedGames(6); // Reset to initial count when searching
  };

  return (
    <section id="games" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Games
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover amazing games with AI-powered gameplay and earn real rewards
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Search and View Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none w-64"
              />
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {displayedGamesList.map(game => (
            <GameCard
              key={game.id}
              {...game}
              onPlay={handlePlayGame}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMoreGames && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : `Load More Games (${filteredGames.length - displayedGames} remaining)`}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setDisplayedGames(6);
              }}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}