import React, { useState, useEffect } from 'react';
import { X, Activity, ExternalLink, Database, Zap, CheckCircle, Clock, AlertCircle, TrendingUp, Users, DollarSign, Gamepad2, Link as LinkIcon, Hash, Eye, RefreshCw } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface BlockchainDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Transaction {
  id: string;
  hash: string;
  type: 'game_session' | 'reward_claim' | 'staking' | 'nft_mint';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
  details: string;
  value?: string;
  gasUsed?: string;
  blockNumber?: number;
}

interface GameSession {
  id: string;
  gameId: string;
  gameName: string;
  sessionId: string;
  walletAddress: string;
  status: 'active' | 'completed' | 'abandoned';
  startTime: Date;
  endTime?: Date;
  score?: number;
  tokensEarned?: number;
  txHash?: string;
  aiRiskProfile?: 'conservative' | 'moderate' | 'aggressive';
  yieldAdjustment?: number;
}

interface SmartContractInfo {
  name: string;
  address: string;
  network: string;
  status: 'deployed' | 'verified' | 'audited';
  functions: string[];
  lastActivity: Date;
  totalTransactions: number;
}

export default function BlockchainDashboard({ isOpen, onClose }: BlockchainDashboardProps) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    totalSessions: 1247,
    activeSessions: 23,
    totalTransactions: 8934,
    totalValueLocked: 485000,
    aiClassifications: 156,
    yieldAdjustments: 89
  });

  // Mock real-time transactions
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      type: 'game_session',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      details: 'Game session completed - Cyber Warriors',
      value: '25 AGT',
      gasUsed: '0.0023 ETH',
      blockNumber: 18945672
    },
    {
      id: '2',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef123',
      type: 'reward_claim',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      details: 'AI-adjusted yield reward claimed',
      value: '12.5 AGT',
      gasUsed: '0.0018 ETH',
      blockNumber: 18945665
    },
    {
      id: '3',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234',
      type: 'staking',
      status: 'pending',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      details: 'Staking 100 AGT tokens',
      value: '100 AGT',
      gasUsed: 'Pending...'
    }
  ]);

  // Mock active game sessions
  const [gameSessions, setGameSessions] = useState<GameSession[]>([
    {
      id: 'session_001',
      gameId: 'cyber-warriors',
      gameName: 'Cyber Warriors',
      sessionId: 'CW_0x1a2b_1642',
      walletAddress: user?.address || '0x1a2b3c4d5e6f7890abcdef12',
      status: 'completed',
      startTime: new Date(Date.now() - 15 * 60 * 1000),
      endTime: new Date(Date.now() - 2 * 60 * 1000),
      score: 8750,
      tokensEarned: 25,
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      aiRiskProfile: 'aggressive',
      yieldAdjustment: 1.15
    },
    {
      id: 'session_002',
      gameId: 'dragon-realm',
      gameName: 'Dragon Realm',
      sessionId: 'DR_0x1a2b_1643',
      walletAddress: user?.address || '0x1a2b3c4d5e6f7890abcdef12',
      status: 'active',
      startTime: new Date(Date.now() - 8 * 60 * 1000),
      aiRiskProfile: 'moderate',
      yieldAdjustment: 1.08
    },
    {
      id: 'session_003',
      gameId: 'puzzle-master',
      gameName: 'Puzzle Master',
      sessionId: 'PM_0x1a2b_1641',
      walletAddress: user?.address || '0x1a2b3c4d5e6f7890abcdef12',
      status: 'abandoned',
      startTime: new Date(Date.now() - 45 * 60 * 1000),
      endTime: new Date(Date.now() - 30 * 60 * 1000),
      score: 1200,
      tokensEarned: 0
    }
  ]);

  // Smart contract information
  const smartContracts: SmartContractInfo[] = [
    {
      name: 'GameSessionTracker',
      address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      network: 'Polygon Testnet',
      status: 'deployed',
      functions: ['startSession', 'endSession', 'claimRewards', 'getSessionData'],
      lastActivity: new Date(Date.now() - 2 * 60 * 1000),
      totalTransactions: 1247
    },
    {
      name: 'AIYieldOptimizer',
      address: '0x8D4C0532925a3b8D4742d35Cc6634C0532925a3b',
      network: 'Polygon Testnet',
      status: 'verified',
      functions: ['classifyRisk', 'adjustYield', 'calculateRewards'],
      lastActivity: new Date(Date.now() - 5 * 60 * 1000),
      totalTransactions: 856
    },
    {
      name: 'StakingRewards',
      address: '0x532925a3b8D4742d35Cc6634C0532925a3b8D4C0',
      network: 'Polygon Testnet',
      status: 'audited',
      functions: ['stake', 'unstake', 'claimRewards', 'getStakingInfo'],
      lastActivity: new Date(Date.now() - 1 * 60 * 1000),
      totalTransactions: 2341
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Live Overview', icon: Activity },
    { id: 'transactions', name: 'Blockchain Txns', icon: Database },
    { id: 'sessions', name: 'Game Sessions', icon: Gamepad2 },
    { id: 'contracts', name: 'Smart Contracts', icon: Zap },
    { id: 'ai-tracking', name: 'AI Analytics', icon: TrendingUp }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + Math.floor(Math.random() * 3),
        activeSessions: Math.max(15, prev.activeSessions + Math.floor(Math.random() * 6 - 3)),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 2),
        aiClassifications: prev.aiClassifications + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': case 'deployed': case 'completed': return 'text-green-400 bg-green-400/20';
      case 'pending': case 'active': return 'text-yellow-400 bg-yellow-400/20';
      case 'failed': case 'abandoned': return 'text-red-400 bg-red-400/20';
      case 'verified': return 'text-blue-400 bg-blue-400/20';
      case 'audited': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const openBlockExplorer = (hash: string) => {
    window.open(`https://mumbai.polygonscan.com/tx/${hash}`, '_blank');
  };

  const openContractExplorer = (address: string) => {
    window.open(`https://mumbai.polygonscan.com/address/${address}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Blockchain Activity Dashboard</h2>
              <p className="text-gray-400">Real-time tracking of external games & on-chain activity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 p-4 bg-gray-800/50 border-b border-gray-700 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Real-time Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Gamepad2 className="w-5 h-5 text-blue-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{realTimeData.totalSessions.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Sessions</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{realTimeData.activeSessions}</div>
                  <div className="text-gray-400 text-sm">Active Now</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{realTimeData.totalTransactions.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Blockchain Txns</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">${realTimeData.totalValueLocked.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">TVL</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{realTimeData.aiClassifications}</div>
                  <div className="text-gray-400 text-sm">AI Classifications</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{realTimeData.yieldAdjustments}</div>
                  <div className="text-gray-400 text-sm">Yield Adjustments</div>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Live Activity Feed</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(tx.status)}`}>
                          {tx.status === 'confirmed' ? <CheckCircle className="w-4 h-4" /> : 
                           tx.status === 'pending' ? <Clock className="w-4 h-4" /> : 
                           <AlertCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-white font-medium">{tx.details}</p>
                          <p className="text-gray-400 text-sm">{formatTime(tx.timestamp)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{tx.value}</p>
                        <button
                          onClick={() => openBlockExplorer(tx.hash)}
                          className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                        >
                          <span>View Tx</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Recent Blockchain Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-gray-400 py-3">Hash</th>
                        <th className="text-left text-gray-400 py-3">Type</th>
                        <th className="text-left text-gray-400 py-3">Status</th>
                        <th className="text-left text-gray-400 py-3">Value</th>
                        <th className="text-left text-gray-400 py-3">Gas</th>
                        <th className="text-left text-gray-400 py-3">Block</th>
                        <th className="text-left text-gray-400 py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map(tx => (
                        <tr key={tx.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                          <td className="py-3">
                            <button
                              onClick={() => openBlockExplorer(tx.hash)}
                              className="text-blue-400 hover:text-blue-300 font-mono text-sm flex items-center space-x-1"
                            >
                              <span>{formatAddress(tx.hash)}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="py-3">
                            <span className="text-gray-300 capitalize">{tx.type.replace('_', ' ')}</span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                              {tx.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-green-400 font-semibold">{tx.value}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-gray-300 text-sm">{tx.gasUsed}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-gray-300">{tx.blockNumber?.toLocaleString()}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-gray-400 text-sm">{formatTime(tx.timestamp)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">External Game Session Tracking</h3>
                <div className="space-y-4">
                  {gameSessions.map(session => (
                    <div key={session.id} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Gamepad2 className="w-6 h-6 text-blue-400" />
                          <div>
                            <h4 className="text-white font-semibold">{session.gameName}</h4>
                            <p className="text-gray-400 text-sm">Session ID: {session.sessionId}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                          {session.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">Wallet</p>
                          <p className="text-white font-mono text-sm">{formatAddress(session.walletAddress)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Duration</p>
                          <p className="text-white">
                            {session.endTime 
                              ? `${Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 60000)}m`
                              : `${Math.floor((Date.now() - session.startTime.getTime()) / 60000)}m (ongoing)`
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Score</p>
                          <p className="text-white">{session.score?.toLocaleString() || 'In progress'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Tokens Earned</p>
                          <p className="text-green-400 font-semibold">{session.tokensEarned || 0} AGT</p>
                        </div>
                      </div>

                      {session.aiRiskProfile && (
                        <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">AI Risk Profile:</span>
                            <span className={`font-semibold capitalize ${
                              session.aiRiskProfile === 'aggressive' ? 'text-red-400' :
                              session.aiRiskProfile === 'moderate' ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {session.aiRiskProfile}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-300">Yield Multiplier:</span>
                            <span className="text-blue-400 font-semibold">{session.yieldAdjustment}x</span>
                          </div>
                        </div>
                      )}

                      {session.txHash && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <button
                            onClick={() => openBlockExplorer(session.txHash!)}
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                          >
                            <Hash className="w-3 h-3" />
                            <span>View Transaction: {formatAddress(session.txHash)}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Deployed Smart Contracts</h3>
                <div className="space-y-4">
                  {smartContracts.map((contract, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-6 h-6 text-purple-400" />
                          <div>
                            <h4 className="text-white font-semibold">{contract.name}</h4>
                            <p className="text-gray-400 text-sm">{contract.network}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                          {contract.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">Contract Address</p>
                          <button
                            onClick={() => openContractExplorer(contract.address)}
                            className="text-blue-400 hover:text-blue-300 font-mono text-sm flex items-center space-x-1"
                          >
                            <span>{formatAddress(contract.address)}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Transactions</p>
                          <p className="text-white font-semibold">{contract.totalTransactions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Activity</p>
                          <p className="text-white">{formatTime(contract.lastActivity)}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">Available Functions</p>
                        <div className="flex flex-wrap gap-2">
                          {contract.functions.map((func, idx) => (
                            <span key={idx} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                              {func}()
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-tracking' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">AI Risk Classification</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div>
                        <p className="text-red-400 font-semibold">Aggressive Players</p>
                        <p className="text-gray-400 text-sm">High-risk, high-reward behavior</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-2xl font-bold">23</p>
                        <p className="text-red-400 text-sm">1.2x avg yield</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div>
                        <p className="text-yellow-400 font-semibold">Moderate Players</p>
                        <p className="text-gray-400 text-sm">Balanced risk approach</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-2xl font-bold">67</p>
                        <p className="text-yellow-400 text-sm">1.0x avg yield</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div>
                        <p className="text-green-400 font-semibold">Conservative Players</p>
                        <p className="text-gray-400 text-sm">Low-risk, steady behavior</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-2xl font-bold">45</p>
                        <p className="text-green-400 text-sm">0.8x avg yield</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">Real-time Yield Adjustments</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">Player 0x1a2b...ef12</span>
                      </div>
                      <span className="text-green-400 font-semibold">+15% yield</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">Player 0x3c4d...ab34</span>
                      </div>
                      <span className="text-yellow-400 font-semibold">+8% yield</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">Player 0x5e6f...cd56</span>
                      </div>
                      <span className="text-red-400 font-semibold">-5% yield</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">AI Processing Pipeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Database className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-400 font-semibold">Data Collection</p>
                    <p className="text-gray-400 text-sm">Game sessions tracked</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-purple-400 font-semibold">Behavior Analysis</p>
                    <p className="text-gray-400 text-sm">Risk profile classification</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-semibold">Yield Calculation</p>
                    <p className="text-gray-400 text-sm">Dynamic adjustment</p>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-400 font-semibold">On-chain Update</p>
                    <p className="text-gray-400 text-sm">Blockchain execution</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}