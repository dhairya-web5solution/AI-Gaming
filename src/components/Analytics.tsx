import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign, Users, Trophy } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  change: number;
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('earnings');
  
  const [analyticsData, setAnalyticsData] = useState({
    totalEarnings: 12450.75,
    totalGamesPlayed: 156,
    winRate: 68.5,
    averageSessionTime: 45,
    rank: 1247,
    totalStaked: 5000,
    stakingRewards: 125.50,
    nftValue: 8750
  });

  const timeframes = [
    { id: '24h', name: '24 Hours' },
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' }
  ];

  const metrics = [
    { id: 'earnings', name: 'Earnings', icon: DollarSign },
    { id: 'games', name: 'Games Played', icon: Activity },
    { id: 'winrate', name: 'Win Rate', icon: Trophy },
    { id: 'users', name: 'Active Users', icon: Users }
  ];

  // Mock chart data
  const earningsData: ChartData[] = [
    { label: 'Mon', value: 1250, change: 5.2 },
    { label: 'Tue', value: 1890, change: 12.1 },
    { label: 'Wed', value: 1650, change: -3.4 },
    { label: 'Thu', value: 2100, change: 8.7 },
    { label: 'Fri', value: 1950, change: 2.3 },
    { label: 'Sat', value: 2300, change: 15.2 },
    { label: 'Sun', value: 2050, change: 6.8 }
  ];

  const gamePerformance = [
    { game: 'Cyber Warriors', earnings: 4500, games: 45, winRate: 72 },
    { game: 'Dragon Realm', earnings: 3200, games: 38, winRate: 65 },
    { game: 'Speed Legends', earnings: 2800, games: 42, winRate: 58 },
    { game: 'Battle Arena', earnings: 1950, games: 31, winRate: 74 }
  ];

  const portfolioData = [
    { name: 'Gaming Tokens', value: 45, amount: 5625 },
    { name: 'NFT Assets', value: 35, amount: 4375 },
    { name: 'Staking Rewards', value: 15, amount: 1875 },
    { name: 'Tournament Prizes', value: 5, amount: 625 }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalEarnings: prev.totalEarnings + (Math.random() * 10 - 5),
        stakingRewards: prev.stakingRewards + (Math.random() * 0.5),
        rank: prev.rank + Math.floor(Math.random() * 10 - 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: any) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-purple-400" />
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  );

  return (
    <section id="analytics" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your gaming performance, earnings, and portfolio insights
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          {/* Timeframe Selector */}
          <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
            {timeframes.map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeframe === tf.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tf.name}
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex space-x-2">
            {metrics.map(metric => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedMetric === metric.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{metric.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Earnings"
            value={analyticsData.totalEarnings}
            change={12.5}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard
            title="Games Played"
            value={analyticsData.totalGamesPlayed}
            change={8.3}
            icon={Activity}
          />
          <StatCard
            title="Win Rate"
            value={analyticsData.winRate}
            change={2.1}
            icon={Trophy}
            suffix="%"
          />
          <StatCard
            title="Global Rank"
            value={analyticsData.rank}
            change={-5.2}
            icon={Users}
            prefix="#"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Earnings Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Earnings Trend</h3>
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-4">
              {earningsData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm w-12">{data.label}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.value / 2500) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white font-semibold w-16 text-right">${data.value}</span>
                  <span className={`text-sm w-12 text-right ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data.change >= 0 ? '+' : ''}{data.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Portfolio Distribution</h3>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: `hsl(${index * 90 + 240}, 70%, 50%)`
                      }}
                    />
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{item.value}%</div>
                    <div className="text-gray-400 text-sm">${item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Performance */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Game Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-3">Game</th>
                  <th className="text-right text-gray-400 py-3">Earnings</th>
                  <th className="text-right text-gray-400 py-3">Games Played</th>
                  <th className="text-right text-gray-400 py-3">Win Rate</th>
                  <th className="text-right text-gray-400 py-3">Avg. per Game</th>
                </tr>
              </thead>
              <tbody>
                {gamePerformance.map((game, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-4">
                      <span className="text-white font-medium">{game.game}</span>
                    </td>
                    <td className="text-right py-4">
                      <span className="text-green-400 font-semibold">${game.earnings}</span>
                    </td>
                    <td className="text-right py-4">
                      <span className="text-white">{game.games}</span>
                    </td>
                    <td className="text-right py-4">
                      <span className={`font-semibold ${game.winRate >= 70 ? 'text-green-400' : game.winRate >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {game.winRate}%
                      </span>
                    </td>
                    <td className="text-right py-4">
                      <span className="text-white">${(game.earnings / game.games).toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-bold text-white mb-4">Staking Overview</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Staked</span>
                <span className="text-white font-semibold">${analyticsData.totalStaked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rewards Earned</span>
                <span className="text-green-400 font-semibold">${analyticsData.stakingRewards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">APY</span>
                <span className="text-purple-400 font-semibold">22.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-bold text-white mb-4">NFT Portfolio</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Value</span>
                <span className="text-white font-semibold">${analyticsData.nftValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Items Owned</span>
                <span className="text-white font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">24h Change</span>
                <span className="text-green-400 font-semibold">+5.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-bold text-white mb-4">Session Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Session</span>
                <span className="text-white font-semibold">{analyticsData.averageSessionTime}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Streak</span>
                <span className="text-white font-semibold">12 wins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Game</span>
                <span className="text-purple-400 font-semibold">Cyber Warriors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}