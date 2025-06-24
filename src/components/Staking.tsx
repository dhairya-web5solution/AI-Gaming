import React, { useState, useEffect } from 'react';
import { Lock, Unlock, TrendingUp, Clock, DollarSign, Percent } from 'lucide-react';

interface StakingPool {
  id: string;
  name: string;
  token: string;
  apy: number;
  totalStaked: number;
  minStake: number;
  lockPeriod: number;
  rewards: number;
  isActive: boolean;
}

export default function Staking() {
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [userStakes, setUserStakes] = useState<any[]>([]);

  const stakingPools: StakingPool[] = [
    {
      id: '1',
      name: 'Gaming Token Pool',
      token: 'AGT',
      apy: 25.5,
      totalStaked: 1250000,
      minStake: 100,
      lockPeriod: 30,
      rewards: 125000,
      isActive: true
    },
    {
      id: '2',
      name: 'NFT Rewards Pool',
      token: 'NFT',
      apy: 18.2,
      totalStaked: 850000,
      minStake: 50,
      lockPeriod: 14,
      rewards: 85000,
      isActive: true
    },
    {
      id: '3',
      name: 'Tournament Pool',
      token: 'TOUR',
      apy: 35.8,
      totalStaked: 650000,
      minStake: 200,
      lockPeriod: 60,
      rewards: 195000,
      isActive: true
    },
    {
      id: '4',
      name: 'Governance Pool',
      token: 'GOV',
      apy: 12.4,
      totalStaked: 2100000,
      minStake: 1000,
      lockPeriod: 90,
      rewards: 260000,
      isActive: true
    }
  ];

  const [poolStats, setPoolStats] = useState({
    totalValueLocked: 4850000,
    totalRewards: 665000,
    activeStakers: 12500,
    averageApy: 22.9
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPoolStats(prev => ({
        ...prev,
        totalValueLocked: prev.totalValueLocked + Math.floor(Math.random() * 1000),
        totalRewards: prev.totalRewards + Math.floor(Math.random() * 100),
        activeStakers: prev.activeStakers + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStake = (poolId: string) => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    const pool = stakingPools.find(p => p.id === poolId);
    if (!pool) return;

    if (parseFloat(stakeAmount) < pool.minStake) {
      alert(`Minimum stake amount is ${pool.minStake} ${pool.token}`);
      return;
    }

    // Simulate staking
    const newStake = {
      id: Date.now().toString(),
      poolId,
      poolName: pool.name,
      amount: parseFloat(stakeAmount),
      token: pool.token,
      apy: pool.apy,
      startDate: new Date(),
      lockPeriod: pool.lockPeriod,
      estimatedRewards: (parseFloat(stakeAmount) * pool.apy / 100) * (pool.lockPeriod / 365)
    };

    setUserStakes(prev => [...prev, newStake]);
    setStakeAmount('');
    alert(`Successfully staked ${stakeAmount} ${pool.token}!`);
  };

  const handleUnstake = (stakeId: string) => {
    setUserStakes(prev => prev.filter(stake => stake.id !== stakeId));
    alert('Successfully unstaked!');
  };

  const calculateTimeRemaining = (startDate: Date, lockPeriod: number) => {
    const endDate = new Date(startDate.getTime() + lockPeriod * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Unlocked';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  };

  return (
    <section id="staking" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Staking Pools
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stake your tokens and earn passive rewards while supporting the gaming ecosystem
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">${poolStats.totalValueLocked.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Value Locked</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-green-400 text-sm">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-white">${poolStats.totalRewards.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Rewards Paid</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Lock className="w-6 h-6 text-purple-400" />
              <span className="text-green-400 text-sm">+12</span>
            </div>
            <div className="text-2xl font-bold text-white">{poolStats.activeStakers.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Active Stakers</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Percent className="w-6 h-6 text-yellow-400" />
              <span className="text-green-400 text-sm">+2.1%</span>
            </div>
            <div className="text-2xl font-bold text-white">{poolStats.averageApy}%</div>
            <div className="text-gray-400 text-sm">Average APY</div>
          </div>
        </div>

        {/* Staking Pools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {stakingPools.map(pool => (
            <div key={pool.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                  <span className="text-purple-400 font-semibold">{pool.token}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                  <div className="text-gray-400 text-sm">APY</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-gray-400 text-sm">Total Staked</div>
                  <div className="text-white font-semibold">{pool.totalStaked.toLocaleString()} {pool.token}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Min Stake</div>
                  <div className="text-white font-semibold">{pool.minStake} {pool.token}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Lock Period</div>
                  <div className="text-white font-semibold">{pool.lockPeriod} days</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Rewards Pool</div>
                  <div className="text-white font-semibold">{pool.rewards.toLocaleString()} {pool.token}</div>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="number"
                  placeholder={`Enter ${pool.token} amount`}
                  value={selectedPool === pool.id ? stakeAmount : ''}
                  onChange={(e) => {
                    setSelectedPool(pool.id);
                    setStakeAmount(e.target.value);
                  }}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={() => handleStake(pool.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Stake {pool.token}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Stakes */}
        {userStakes.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Your Stakes</h3>
            <div className="space-y-4">
              {userStakes.map(stake => (
                <div key={stake.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-white font-semibold">{stake.poolName}</div>
                        <div className="text-gray-400 text-sm">{stake.amount} {stake.token} staked</div>
                      </div>
                      <div>
                        <div className="text-green-400 font-semibold">{stake.apy}% APY</div>
                        <div className="text-gray-400 text-sm">Est. rewards: {stake.estimatedRewards.toFixed(2)} {stake.token}</div>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-semibold flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{calculateTimeRemaining(stake.startDate, stake.lockPeriod)}</span>
                        </div>
                        <div className="text-gray-400 text-sm">Time remaining</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnstake(stake.id)}
                    disabled={calculateTimeRemaining(stake.startDate, stake.lockPeriod) !== 'Unlocked'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                      calculateTimeRemaining(stake.startDate, stake.lockPeriod) === 'Unlocked'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unstake</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}