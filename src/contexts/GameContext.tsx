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
    // Prediction Games
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
      id: 'crypto-oracle',
      title: 'Crypto Oracle',
      description: 'Advanced prediction platform for cryptocurrency price movements',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Prediction',
      players: 12500,
      rating: 4.4,
      rewards: '$280/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Price Prediction', 'Technical Analysis', 'Market Sentiment'],
      nftUsage: ['Oracle Cards', 'Prediction Tools', 'Expert Badges'],
      entryFee: 15,
      maxReward: 560
    },
    {
      id: 'sports-prophet',
      title: 'Sports Prophet',
      description: 'Predict sports outcomes and compete with other sports enthusiasts',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Prediction',
      players: 18200,
      rating: 4.5,
      rewards: '$320/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Sports Betting', 'Live Predictions', 'Tournament Brackets'],
      nftUsage: ['Team Cards', 'Player Stats', 'Championship Trophies'],
      entryFee: 12,
      maxReward: 640
    },

    // Fantasy Games
    {
      id: 'fantasy',
      title: 'Fantasy Platform',
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
    
    

    // TG Mini Games
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
      id: 'cryptoseed',
      title: 'CryptoSeed',
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
    

    // Strategy Games
    {
      id: 'warriors king',
      title: 'Warriors King',
      description: 'Command armies and conquer kingdoms in this medieval strategy game',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      id: 'galactic-empire',
      title: 'Galactic Empire',
      description: 'Build and expand your space empire across the galaxy',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 22000,
      rating: 4.7,
      rewards: '$450/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Empire Building', 'Space Exploration', 'Fleet Management'],
      nftUsage: ['Starships', 'Planets', 'Technology Cards'],
      entryFee: 22,
      maxReward: 900
    },
    {
      id: 'medieval-conquest',
      title: 'Medieval Conquest',
      description: 'Command armies and conquer kingdoms in this medieval strategy game',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 18500,
      rating: 4.6,
      rewards: '$380/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Army Management', 'Castle Building', 'Siege Warfare'],
      nftUsage: ['Knight Cards', 'Castle Blueprints', 'Siege Weapons'],
      entryFee: 20,
      maxReward: 760
    },
    {
      id: 'city-builder-pro',
      title: 'City Builder Pro',
      description: 'Design and manage thriving cities with advanced urban planning',
      image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 16000,
      rating: 4.5,
      rewards: '$340/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['City Planning', 'Resource Allocation', 'Population Management'],
      nftUsage: ['Building Blueprints', 'City Landmarks', 'Mayor Tokens'],
      entryFee: 18,
      maxReward: 680
    },
    {
      id: 'war-commander',
      title: 'War Commander',
      description: 'Lead massive battles and command strategic military operations',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 20500,
      rating: 4.7,
      rewards: '$420/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Military Strategy', 'Battle Tactics', 'Unit Deployment'],
      nftUsage: ['Commander Cards', 'Military Units', 'Battle Maps'],
      entryFee: 24,
      maxReward: 840
    },
    {
      id: 'trade-empire',
      title: 'Trade Empire',
      description: 'Build a commercial empire through strategic trading and economics',
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Strategy',
      players: 14500,
      rating: 4.4,
      rewards: '$310/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Trade Routes', 'Market Analysis', 'Economic Strategy'],
      nftUsage: ['Trade Contracts', 'Merchant Ships', 'Market Tokens'],
      entryFee: 16,
      maxReward: 620
    },

    // RPG Games
    {
      id: 'CM 40',
      title: 'CM 40',
      description: 'Awesome RPG with blockchain-based character progression in Field',
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
      id: 'crystal-quest',
      title: 'Crystal Quest',
      description: 'Magical adventure RPG with crystal-powered abilities and epic quests',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 21000,
      rating: 4.7,
      rewards: '$350/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Crystal Magic', 'Epic Quests', 'Guild System'],
      nftUsage: ['Crystal Artifacts', 'Spell Books', 'Guild Banners'],
      entryFee: 22,
      maxReward: 700
    },
    {
      id: 'shadow-legends',
      title: 'Shadow Legends',
      description: 'Dark fantasy RPG with legendary heroes and mythical creatures',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 19500,
      rating: 4.8,
      rewards: '$380/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Hero Collection', 'Dungeon Crawling', 'PvP Arena'],
      nftUsage: ['Legendary Heroes', 'Mythical Weapons', 'Shadow Artifacts'],
      entryFee: 25,
      maxReward: 760
    },
    {
      id: 'elemental-masters',
      title: 'Elemental Masters',
      description: 'Master the elements in this turn-based RPG adventure',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 16500,
      rating: 4.5,
      rewards: '$320/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Elemental Combat', 'Turn-based Strategy', 'Skill Trees'],
      nftUsage: ['Elemental Spirits', 'Magic Runes', 'Master Tokens'],
      entryFee: 18,
      maxReward: 640
    },
    {
      id: 'dungeon-explorer',
      title: 'Dungeon Explorer',
      description: 'Explore dangerous dungeons and collect rare treasures',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 17800,
      rating: 4.6,
      rewards: '$340/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Dungeon Exploration', 'Treasure Hunting', 'Monster Battles'],
      nftUsage: ['Treasure Chests', 'Explorer Gear', 'Monster Cards'],
      entryFee: 19,
      maxReward: 680
    },
    {
      id: 'mythic-realms',
      title: 'Mythic Realms',
      description: 'Journey through mythical worlds with gods and legendary beings',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'RPG',
      players: 23000,
      rating: 4.9,
      rewards: '$420/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Mythical Quests', 'God Powers', 'Realm Exploration'],
      nftUsage: ['Divine Artifacts', 'God Tokens', 'Realm Keys'],
      entryFee: 28,
      maxReward: 840
    },

    // Racing Games
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
      id: 'neon-racers',
      title: 'Neon Racers',
      description: 'Futuristic street racing in neon-lit cyberpunk cities',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 15500,
      rating: 4.6,
      rewards: '$240/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Street Racing', 'Neon Customization', 'Underground Tournaments'],
      nftUsage: ['Neon Cars', 'Street Mods', 'City Licenses'],
      entryFee: 17,
      maxReward: 480
    },
    {
      id: 'rally-champions',
      title: 'Rally Champions',
      description: 'Off-road rally racing through challenging terrains',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 11000,
      rating: 4.5,
      rewards: '$220/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Rally Racing', 'Terrain Navigation', 'Weather Challenges'],
      nftUsage: ['Rally Cars', 'Terrain Gear', 'Championship Trophies'],
      entryFee: 16,
      maxReward: 440
    },
    {
      id: 'formula-future',
      title: 'Formula Future',
      description: 'Next-generation Formula racing with advanced technology',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 18200,
      rating: 4.8,
      rewards: '$280/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Formula Racing', 'Tech Upgrades', 'Championship Series'],
      nftUsage: ['Formula Cars', 'Tech Components', 'Driver Suits'],
      entryFee: 20,
      maxReward: 560
    },
    {
      id: 'drift-masters',
      title: 'Drift Masters',
      description: 'Master the art of drifting in this skill-based racing game',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 13500,
      rating: 4.4,
      rewards: '$190/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Drift Techniques', 'Skill Scoring', 'Style Points'],
      nftUsage: ['Drift Cars', 'Style Kits', 'Skill Badges'],
      entryFee: 14,
      maxReward: 380
    },
    {
      id: 'space-racers',
      title: 'Space Racers',
      description: 'Intergalactic racing through asteroid fields and space stations',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Racing',
      players: 14800,
      rating: 4.7,
      rewards: '$260/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Space Racing', 'Zero Gravity', 'Cosmic Challenges'],
      nftUsage: ['Spaceships', 'Cosmic Fuel', 'Galaxy Passes'],
      entryFee: 18,
      maxReward: 520
    },

    // Puzzle Games
    {
      id: '2048 Game',
      title: '2048 Game',
      description: '2048 brain-teasing puzzles with puzzel rewards game',
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
    },
    {
      id: 'mind-bender',
      title: 'Mind Bender',
      description: 'Complex mental challenges that test your cognitive abilities',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 9500,
      rating: 4.6,
      rewards: '$170/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Cognitive Tests', 'Pattern Recognition', 'Memory Games'],
      nftUsage: ['Brain Tokens', 'Memory Cards', 'IQ Certificates'],
      entryFee: 12,
      maxReward: 340
    },
    {
      id: 'crypto-sudoku',
      title: 'Crypto Sudoku',
      description: 'Classic Sudoku with cryptocurrency themes and rewards',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 7200,
      rating: 4.3,
      rewards: '$130/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Number Puzzles', 'Crypto Themes', 'Daily Challenges'],
      nftUsage: ['Number Tokens', 'Grid Patterns', 'Solver Badges'],
      entryFee: 8,
      maxReward: 260
    },
    {
      id: 'block-breaker',
      title: 'Block Breaker',
      description: 'Modern take on classic block-breaking games with NFT rewards',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Puzzle',
      players: 10500,
      rating: 4.4,
      rewards: '$160/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Block Breaking', 'Power-ups', 'Level Progression'],
      nftUsage: ['Special Blocks', 'Power-up Items', 'Level Keys'],
      entryFee: 11,
      maxReward: 320
    },

    // Action Games
    {
      id: 'battle-arena',
      title: 'Battle Arena',
      description: 'Intense multiplayer battles with skill-based combat',
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 24000,
      rating: 4.7,
      rewards: '$400/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Combat System', 'Multiplayer Battles', 'Skill Progression'],
      nftUsage: ['Fighter Characters', 'Combat Gear', 'Arena Passes'],
      entryFee: 22,
      maxReward: 800
    },
    {
      id: 'combat-zone',
      title: 'Combat Zone',
      description: 'Tactical combat in various environments and scenarios',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 20500,
      rating: 4.6,
      rewards: '$360/day',
      isNew: true,
      isTrending: false,
      isExternal: false,
      mechanics: ['Tactical Combat', 'Environment Strategy', 'Team Play'],
      nftUsage: ['Tactical Gear', 'Environment Maps', 'Team Badges'],
      entryFee: 20,
      maxReward: 720
    },
    {
      id: 'mech-warriors',
      title: 'Mech Warriors',
      description: 'Pilot giant mechs in epic battles across futuristic landscapes',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Action',
      players: 17000,
      rating: 4.8,
      rewards: '$380/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Mech Combat', 'Customization', 'Large-scale Battles'],
      nftUsage: ['Mech Units', 'Weapon Systems', 'Pilot Licenses'],
      entryFee: 24,
      maxReward: 760
    },

    // Simulation Games
    {
      id: 'space-odyssey',
      title: 'Space Odyssey',
      description: 'Explore the cosmos and build your space civilization',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Simulation',
      players: 13500,
      rating: 4.5,
      rewards: '$250/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Space Exploration', 'Colony Building', 'Resource Management'],
      nftUsage: ['Spacecraft', 'Planets', 'Technology Blueprints'],
      entryFee: 18,
      maxReward: 500
    },
    {
      id: 'farm-tycoon',
      title: 'Farm Tycoon',
      description: 'Build and manage your agricultural empire',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Simulation',
      players: 11000,
      rating: 4.3,
      rewards: '$180/day',
      isNew: false,
      isTrending: false,
      isExternal: false,
      mechanics: ['Farm Management', 'Crop Planning', 'Market Trading'],
      nftUsage: ['Farm Land', 'Livestock', 'Equipment'],
      entryFee: 12,
      maxReward: 360
    },

    // Sports Games
    {
      id: 'virtual-soccer',
      title: 'Virtual Soccer',
      description: 'Realistic soccer simulation with team management',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Sports',
      players: 19000,
      rating: 4.6,
      rewards: '$300/day',
      isNew: true,
      isTrending: true,
      isExternal: false,
      mechanics: ['Soccer Simulation', 'Team Management', 'League Play'],
      nftUsage: ['Player Cards', 'Stadium Ownership', 'Team Jerseys'],
      entryFee: 16,
      maxReward: 600
    },
    {
      id: 'basketball-legends',
      title: 'Basketball Legends',
      description: 'Street basketball with legendary players and moves',
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'Sports',
      players: 16500,
      rating: 4.7,
      rewards: '$280/day',
      isNew: false,
      isTrending: true,
      isExternal: false,
      mechanics: ['Basketball Gameplay', 'Street Courts', 'Legendary Moves'],
      nftUsage: ['Player Legends', 'Court Designs', 'Signature Moves'],
      entryFee: 15,
      maxReward: 560
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