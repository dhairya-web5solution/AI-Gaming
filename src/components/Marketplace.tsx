import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, TrendingUp, Filter, Star } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface NFTItem {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  likes: number;
  views: number;
  isLiked: boolean;
  seller: string;
  game: string;
}

export default function Marketplace() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [displayedItems, setDisplayedItems] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateBalance } = useUser();

  const filters = [
    { id: 'all', name: 'All Items' },
    { id: 'weapons', name: 'Weapons' },
    { id: 'characters', name: 'Characters' },
    { id: 'skins', name: 'Skins' },
    { id: 'vehicles', name: 'Vehicles' },
    { id: 'land', name: 'Virtual Land' }
  ];

  const allNftItems: NFTItem[] = [
    {
      id: '1',
      name: 'Legendary Sword of Fire',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 125,
      currency: 'AGT',
      rarity: 'legendary',
      likes: 234,
      views: 1250,
      isLiked: false,
      seller: '0x1234...5678',
      game: 'Cyber Warriors'
    },
    {
      id: '2',
      name: 'Dragon Rider Character',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 90,
      currency: 'AGT',
      rarity: 'epic',
      likes: 189,
      views: 890,
      isLiked: false,
      seller: '0x9876...5432',
      game: 'Dragon Realm'
    },
    {
      id: '3',
      name: 'Neon Racing Car',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 38,
      currency: 'AGT',
      rarity: 'rare',
      likes: 156,
      views: 670,
      isLiked: false,
      seller: '0x5555...7777',
      game: 'Speed Legends'
    },
    {
      id: '4',
      name: 'Mystic Forest Land',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 260,
      currency: 'AGT',
      rarity: 'legendary',
      likes: 312,
      views: 1890,
      isLiked: false,
      seller: '0x3333...9999',
      game: 'Space Odyssey'
    },
    {
      id: '5',
      name: 'Battle Armor Set',
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 60,
      currency: 'AGT',
      rarity: 'epic',
      likes: 98,
      views: 445,
      isLiked: false,
      seller: '0x7777...1111',
      game: 'Battle Arena'
    },
    {
      id: '6',
      name: 'Cosmic Weapon Skin',
      image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 23,
      currency: 'AGT',
      rarity: 'rare',
      likes: 67,
      views: 234,
      isLiked: false,
      seller: '0x2222...8888',
      game: 'Cyber Warriors'
    },
    {
      id: '7',
      name: 'Crystal Mage Staff',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 160,
      currency: 'AGT',
      rarity: 'legendary',
      likes: 445,
      views: 2100,
      isLiked: false,
      seller: '0x4444...2222',
      game: 'Crystal Quest'
    },
    {
      id: '8',
      name: 'Stealth Assassin Outfit',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      price: 75,
      currency: 'AGT',
      rarity: 'epic',
      likes: 278,
      views: 1340,
      isLiked: false,
      seller: '0x6666...4444',
      game: 'Mech Warriors'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleBuy = (item: NFTItem) => {
    if (!user) {
      alert('Please connect your wallet to purchase NFTs.');
      return;
    }

    if (user.balances.AGT < item.price) {
      alert(`Insufficient AGT tokens. You need ${item.price} AGT to purchase this item.`);
      return;
    }

    // Deduct AGT tokens and add NFT token
    updateBalance('AGT', -item.price);
    updateBalance('NFT', 1);

    alert(`Successfully purchased ${item.name} for ${item.price} AGT! You received 1 NFT token.`);
  };

  const handleQuickView = (item: NFTItem) => {
    alert(`Quick View: ${item.name}\n\nGame: ${item.game}\nRarity: ${item.rarity}\nPrice: ${item.price} AGT\nSeller: ${item.seller}\n\nThis would open a detailed view modal in production.`);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayedItems(prev => prev + 6);
    setIsLoading(false);
  };

  const filteredItems = allNftItems.filter(item => {
    if (selectedFilter === 'all') return true;
    return true; // In production, items would have category fields
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'likes':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      case 'rarity':
        const rarityOrder = { 'common': 1, 'rare': 2, 'epic': 3, 'legendary': 4 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

  const displayedItemsList = sortedItems.slice(0, displayedItems);
  const hasMoreItems = displayedItems < sortedItems.length;

  return (
    <section id="marketplace" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NFT Marketplace
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trade unique gaming assets and collectibles on our decentralized marketplace
          </p>
        </div>

        {/* User Balance Display */}
        {user && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Your Balance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{user.balances.AGT}</div>
                <div className="text-gray-400 text-sm">AGT Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{user.balances.NFT}</div>
                <div className="text-gray-400 text-sm">NFT Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user.balances.TOUR}</div>
                <div className="text-gray-400 text-sm">TOUR Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{user.balances.GOV}</div>
                <div className="text-gray-400 text-sm">GOV Tokens</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
              <option value="rarity">Rarity</option>
            </select>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItemsList.map(item => (
            <div key={item.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Rarity Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold border ${getRarityColor(item.rarity)} bg-black/70`}>
                  {item.rarity.toUpperCase()}
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(item.id)}
                  className="absolute top-3 right-3 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedItems.has(item.id) ? 'text-red-500 fill-current' : 'text-white'
                    }`}
                  />
                </button>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleQuickView(item)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-purple-400 text-sm font-medium">{item.game}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h3>
                
                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    by {item.seller}
                  </div>
                </div>

                {/* Price and Buy */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {item.price} {item.currency}
                    </div>
                    <div className="text-sm text-gray-400">
                      ≈ ${(item.price * 5).toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!user || user.balances.AGT < item.price}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{!user ? 'Connect Wallet' : 'Buy'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMoreItems && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : `Load More Items (${sortedItems.length - displayedItems} remaining)`}
            </button>
          </div>
        )}

        {/* Connect Wallet Prompt */}
        {!user && (
          <div className="text-center mt-12">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
              <ShoppingCart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Connect Wallet to Trade</h3>
              <p className="text-gray-400">
                Connect your wallet to buy, sell, and trade NFTs on our marketplace
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}