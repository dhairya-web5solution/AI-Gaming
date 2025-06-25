import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Game {
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
  mechanics: string[];
  nftUsage: string[];
  entryFee: number;
  maxReward: number;
}

interface GameSession {
  gameId: string;
  startTime: Date;
  isActive: boolean;
  score: number;
  tokensEarned: number;
}

interface GameContextType {
  games: Game[];
  currentSession: GameSession | null;
  startGame: (gameId: string) => void;
  endGame: (score: number) => void;
  getGameById: (id: string) => Game | undefined;
  getFeaturedGames: () => Game[];
  getTrendingGames: () => Game[];
  getGamesByCategory: (category: string) => Game[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);

  const games: Game[] = [
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
      externalUrl: 'https://prediction.web5product.com/',
      mechanics: ['Event Prediction', 'Accuracy Scoring', 'Market Making'],
      nftUsage: ['Prediction Badges', 'Accuracy Trophies'],
      entryFee: 10,
      maxReward: 500
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
      externalUrl: 'https://fantasy.web5product.com/',
      mechanics: ['Team Building', 'Player Trading', 'League Competition'],
      nftUsage: ['Player Cards', 'Team Logos', 'Championship Trophies'],
      entryFee: 15,
      maxReward: 750
    },
    {
      id: 'play195',
      title: 'Play195',
      description: 'Exciting fantasy sports platform with real-time competitions and rewards',
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Fantasy',
      players: 22000,
      rating: 4.5,
      rewards: '$300/day',
      isNew: true,
      isTrending: false,
      isExternal: true,
      externalUrl: 'https://play195.com/',
      mechanics: ['Fantasy Sports', 'Real-time Competitions', 'Live Scoring'],
      nftUsage: ['Player NFTs', 'Team Badges', 'Achievement Cards'],
      entryFee: 12,
      maxReward: 600
    },
    {
      id: 'hive',
      title: 'Hive',
      description: 'Telegram-based mini game with social features and earning opportunities',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'TG Mini Games',
      players: 35000,
      rating: 4.4,
      rewards: '$180/day',
      isNew: true,
      isTrending: true,
      isExternal: true,
      externalUrl: 'http://t.me/thehive_app_bot?start=ref_1384867588',
      mechanics: ['Social Gaming', 'Daily Tasks', 'Referral System'],
      nftUsage: ['Hive NFTs', 'Worker Bees', 'Honey Tokens'],
      entryFee: 8,
      maxReward: 360
    },
    {
      id: 'cryptosee',
      title: 'CryptoSee',
      description: 'Delta Platinum crypto gaming experience with advanced trading features',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'TG Mini Games',
      players: 18000,
      rating: 4.3,
      rewards: '$220/day',
      isNew: true,
      isTrending: false,
      isExternal: true,
      externalUrl: 'https://t.me/DeltaPlatinum',
      mechanics: ['Crypto Trading', 'Market Analysis', 'Portfolio Management'],
      nftUsage: ['Trading Cards', 'Premium Tools', 'VIP Access'],
      entryFee: 15,
      maxReward: 440
    },
    {
      id: 'fren',
      title: 'FREN',
      description: 'Social Telegram mini game focused on building friendships and earning together',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'TG Mini Games',
      players: 25000,
      rating: 4.6,
      rewards: '$160/day',
      isNew: true,
      isTrending: true,
      isExternal: true,
      externalUrl: 'https://t.me/FrenTekBot/fren?startapp=invitation_Cu8BWzwedFKYssvXwDVdNA',
      mechanics: ['Social Networking', 'Friend Challenges', 'Group Activities'],
      nftUsage: ['Friend Badges', 'Social NFTs', 'Community Tokens'],
      entryFee: 5,
      maxReward: 320
    },
    {
      id: 'cyber-warriors',
      title: 'Cyber Warriors',
      description: 'Epic sci-fi strategy game with AI-powered opponents and massive rewards',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 25000,
      rating: 4.8,
      rewards: '$500/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Real-time Strategy', 'AI Opponents', 'Resource Management'],
      nftUsage: ['Warrior Characters', 'Weapons', 'Base Structures'],
      entryFee: 25,
      maxReward: 1000
    },
    {
      id: 'dragon-realm',
      title: 'Dragon Realm',
      description: 'Immersive RPG with blockchain-based character progression',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 18000,
      rating: 4.6,
      rewards: '$300/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Character Progression', 'Quest System', 'Dragon Battles'],
      nftUsage: ['Dragon Companions', 'Magic Items', 'Character Skins'],
      entryFee: 20,
      maxReward: 600
    },
    {
      id: 'speed-legends',
      title: 'Speed Legends',
      description: 'High-octane racing with NFT cars and tournament prizes',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 12000,
      rating: 4.7,
      rewards: '$200/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Racing Simulation', 'Car Customization', 'Track Mastery'],
      nftUsage: ['Racing Cars', 'Custom Parts', 'Track Ownership'],
      entryFee: 15,
      maxReward: 400
    },
    {
      id: 'puzzle-master',
      title: 'Puzzle Master',
      description: 'Brain-teasing puzzles with cryptocurrency rewards',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 8000,
      rating: 4.5,
      rewards: '$150/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Logic Puzzles', 'Time Challenges', 'Difficulty Scaling'],
      nftUsage: ['Puzzle Pieces', 'Solution Keys', 'Achievement Badges'],
      entryFee: 10,
      maxReward: 300
    }
  ];

  const startGame = (gameId: string) => {
    const session: GameSession = {
      gameId,
      startTime: new Date(),
      isActive: true,
      score: 0,
      tokensEarned: 0
    };
    setCurrentSession(session);
  };

  const endGame = (score: number) => {
    if (currentSession) {
      const tokensEarned = Math.floor(score / 100) * 10; // 10 tokens per 100 points
      setCurrentSession({
        ...currentSession,
        isActive: false,
        score,
        tokensEarned
      });
    }
  };

  const getGameById = (id: string) => games.find(game => game.id === id);
  const getFeaturedGames = () => games.filter(game => game.isNew || game.isTrending).slice(0, 6);
  const getTrendingGames = () => games.filter(game => game.isTrending);
  const getGamesByCategory = (category: string) => games.filter(game => game.category.toLowerCase() === category.toLowerCase());

  return (
    <GameContext.Provider value={{
      games,
      currentSession,
      startGame,
      endGame,
      getGameById,
      getFeaturedGames,
      getTrendingGames,
      getGamesByCategory
    }}>
      {children}
    </GameContext.Provider>
  );
};