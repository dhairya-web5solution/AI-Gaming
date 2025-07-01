import React, { useState } from 'react';
import { User, Edit3, Camera, Trophy, TrendingUp, Calendar, MapPin, Mail, Phone, Globe, Github, Twitter, Save, X, Shield, Star, Award, Target, Activity, BarChart3, Gamepad2, Wallet, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function UserProfile() {
  const { user, updateProfile, updateStats } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    github: user?.github || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'stats', name: 'Gaming Stats', icon: BarChart3 },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'wallet', name: 'Wallet', icon: Wallet }
  ];

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first game', icon: Target, completed: true, date: '2024-01-15', xp: 100 },
    { id: 2, name: 'Streak Master', description: 'Win 5 games in a row', icon: TrendingUp, completed: true, date: '2024-01-18', xp: 250 },
    { id: 3, name: 'High Roller', description: 'Earn 1000 AGT tokens', icon: Award, completed: true, date: '2024-01-20', xp: 500 },
    { id: 4, name: 'Social Butterfly', description: 'Refer 3 friends', icon: User, completed: false, date: null, xp: 300 },
    { id: 5, name: 'Tournament Champion', description: 'Win a tournament', icon: Trophy, completed: false, date: null, xp: 1000 },
    { id: 6, name: 'DeFi Explorer', description: 'Stake tokens for 30 days', icon: Shield, completed: false, date: null, xp: 750 }
  ];

  const recentActivity = [
    { id: 1, type: 'game', description: 'Completed Cyber Warriors', reward: '+25 AGT', time: '2 hours ago' },
    { id: 2, type: 'achievement', description: 'Unlocked "High Roller" achievement', reward: '+500 XP', time: '1 day ago' },
    { id: 3, type: 'staking', description: 'Staked 100 AGT tokens', reward: '+10 XP', time: '2 days ago' },
    { id: 4, type: 'tournament', description: 'Registered for Dragon Realm Quest', reward: '', time: '3 days ago' },
    { id: 5, type: 'game', description: 'Completed Puzzle Master', reward: '+15 AGT', time: '4 days ago' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (updateProfile) {
      updateProfile(profileData);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setProfileData({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      twitter: user?.twitter || '',
      github: user?.github || '',
      phone: user?.phone || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'game': return Gamepad2;
      case 'achievement': return Trophy;
      case 'staking': return Shield;
      case 'tournament': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'game': return 'text-blue-400';
      case 'achievement': return 'text-yellow-400';
      case 'staking': return 'text-green-400';
      case 'tournament': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Please Login</h2>
          <p className="text-gray-400">You need to be logged in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-semibold">Level {user.level}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400">{user.xp} XP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Rank #{user.stats.rank.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-xl p-1 mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={profileData.username}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <p className="text-white">{user.username}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <p className="text-white">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                        <p className="text-white">{user.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
                        <p className="text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                      <p className="text-white">{user.bio || 'No bio added yet.'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Games Played</span>
                      <span className="text-white font-semibold">{user.stats.gamesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-green-400 font-semibold">{user.stats.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Earnings</span>
                      <span className="text-yellow-400 font-semibold">${user.stats.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Global Rank</span>
                      <span className="text-purple-400 font-semibold">#{user.stats.rank.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Token Balances</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">AGT</span>
                      <span className="text-white font-semibold">{user.balances.AGT}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT</span>
                      <span className="text-white font-semibold">{user.balances.NFT}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">TOUR</span>
                      <span className="text-white font-semibold">{user.balances.TOUR}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GOV</span>
                      <span className="text-white font-semibold">{user.balances.GOV}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(achievement => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border transition-all duration-300 ${
                        achievement.completed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-gray-700/50 border-gray-600/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${achievement.completed ? 'text-green-400' : 'text-gray-400'}`} />
                        <span className={`text-sm font-semibold ${achievement.completed ? 'text-green-400' : 'text-gray-400'}`}>
                          +{achievement.xp} XP
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                      {achievement.completed ? (
                        <div className="text-green-400 text-sm font-semibold">
                          ✓ Completed {achievement.date && new Date(achievement.date).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm">Not completed</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map(activity => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                      <Icon className={`w-6 h-6 ${getActivityColor(activity.type)}`} />
                      <div className="flex-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                      {activity.reward && (
                        <span className="text-green-400 font-semibold">{activity.reward}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Wallet Information</h2>
              <div className="space-y-6">
                {user.walletConnected ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Wallet className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-semibold">Wallet Connected</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                        <p className="text-white font-mono">{user.address}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">ETH Balance</label>
                        <p className="text-white">{user.balances.ETH} ETH</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
                    <Wallet className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">No Wallet Connected</h3>
                    <p className="text-gray-400 mb-4">Connect your MetaMask wallet to access DeFi features</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}