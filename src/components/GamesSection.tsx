import React, { useState } from 'react';
import { Filter, Search, Grid, List, ExternalLink } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import GameCard from './GameCard';

interface GamesSectionProps {
  onGameSelect?: (gameId: string) => void;
}

export default function GamesSection({ onGameSelect }: GamesSectionProps) {
  const { games, getFeaturedGames, getGamesByCategory } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedGames, setDisplayedGames] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Games', count: games.length },
    { id: 'prediction', name: 'Prediction', count: games.filter(g => g.category === 'Prediction').length },
    { id: 'fantasy', name: 'Fantasy', count: games.filter(g => g.category === 'Fantasy').length },
    { id: 'strategy', name: 'Strategy', count: games.filter(g => g.category === 'Strategy').length },
    { id: 'rpg', name: 'RPG', count: games.filter(g => g.category === 'RPG').length },
    { id: 'racing', name: 'Racing', count: games.filter(g => g.category === 'Racing').length },
    { id: 'puzzle', name: 'Puzzle', count: games.filter(g => g.category === 'Puzzle').length }
  ];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedGamesList = filteredGames.slice(0, displayedGames);
  const hasMoreGames = displayedGames < filteredGames.length;

  const handlePlayGame = (gameId: string) => {
    if (onGameSelect) {
      onGameSelect(gameId);
    } else {
      const game = games.find(g => g.id === gameId);
      if (game?.isExternal && game.externalUrl) {
        window.open(game.externalUrl, '_blank');
      } else {
        console.log(`Starting game: ${gameId}`);
      }
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayedGames(prev => prev + 6);
    setIsLoading(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayedGames(6);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setDisplayedGames(6);
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