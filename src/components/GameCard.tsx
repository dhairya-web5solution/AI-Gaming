import React, { useState } from 'react';
import { Play, Star, Users, Trophy, TrendingUp, ExternalLink } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  players: number;
  rating: number;
  rewards: string;
  isNew?: boolean;
  isTrending?: boolean;
  isExternal?: boolean;
  externalUrl?: string;
  onPlay: (gameId: string) => void;
}

export default function GameCard({
  id,
  title,
  description,
  image,
  category,
  players,
  rating,
  rewards,
  isNew,
  isTrending,
  isExternal,
  externalUrl,
  onPlay
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => onPlay(id)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
          >
            {isExternal ? <ExternalLink className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isExternal ? 'Open Game' : 'Play Now'}</span>
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>TRENDING</span>
            </span>
          )}
          {isExternal && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <ExternalLink className="w-3 h-3" />
              <span>EXTERNAL</span>
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">{players.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-300 text-sm">{rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">{rewards}</span>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => onPlay(id)}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isExternal ? <ExternalLink className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isExternal ? 'Open Game' : 'Play Game'}</span>
        </button>
      </div>
    </div>
  );
}