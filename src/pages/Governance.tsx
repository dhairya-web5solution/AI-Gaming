import React, { useState } from 'react';
import { Vote, Users, Clock, CheckCircle, XCircle, TrendingUp, MessageSquare, Award } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: Date;
  category: 'game-addition' | 'reward-allocation' | 'protocol-change' | 'treasury';
}

export default function Governance() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userVotes, setUserVotes] = useState<{[key: string]: 'for' | 'against'}>({});

  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Add Battle Royale Tournament Mode',
      description: 'Proposal to add a new Battle Royale tournament format with 100-player matches and increased prize pools.',
      proposer: '0x1234...5678',
      status: 'active',
      votesFor: 15420,
      votesAgainst: 3280,
      totalVotes: 18700,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      category: 'game-addition'
    },
    {
      id: '2',
      title: 'Increase Staking Rewards by 5%',
      description: 'Proposal to increase staking rewards across all pools by 5% to incentivize long-term holding.',
      proposer: '0x9876...5432',
      status: 'active',
      votesFor: 12850,
      votesAgainst: 8920,
      totalVotes: 21770,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      category: 'reward-allocation'
    },
    {
      id: '3',
      title: 'Implement Cross-Chain Bridge',
      description: 'Technical proposal to implement cross-chain asset bridging between Ethereum and Polygon networks.',
      proposer: '0x5555...7777',
      status: 'passed',
      votesFor: 25600,
      votesAgainst: 4200,
      totalVotes: 29800,
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: 'protocol-change'
    },
    {
      id: '4',
      title: 'Allocate Treasury Funds for Marketing',
      description: 'Proposal to allocate 500,000 tokens from treasury for global marketing campaign.',
      proposer: '0x3333...9999',
      status: 'rejected',
      votesFor: 8900,
      votesAgainst: 16500,
      totalVotes: 25400,
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: 'treasury'
    },
    {
      id: '5',
      title: 'Add Mobile Gaming Support',
      description: 'Proposal to develop and launch mobile versions of top 5 games with touch-optimized controls.',
      proposer: '0x7777...1111',
      status: 'pending',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: 'game-addition'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Proposals', count: proposals.length },
    { id: 'game-addition', name: 'Game Addition', count: proposals.filter(p => p.category === 'game-addition').length },
    { id: 'reward-allocation', name: 'Reward Allocation', count: proposals.filter(p => p.category === 'reward-allocation').length },
    { id: 'protocol-change', name: 'Protocol Changes', count: proposals.filter(p => p.category === 'protocol-change').length },
    { id: 'treasury', name: 'Treasury', count: proposals.filter(p => p.category === 'treasury').length }
  ];

  const filteredProposals = proposals.filter(proposal => {
    if (selectedCategory === 'all') return true;
    return proposal.category === selectedCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-400/20';
      case 'passed': return 'text-green-400 bg-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Clock;
      case 'passed': return CheckCircle;
      case 'rejected': return XCircle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Voting ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const handleVote = (proposalId: string, vote: 'for' | 'against') => {
    setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
    console.log(`Vote cast ${vote} proposal ${proposalId}! In production, this would interact with the governance smart contract.`);
  };

  const handleDiscuss = (proposalId: string) => {
    console.log(`Opening discussion for proposal ${proposalId}`);
    // In production, this would open a discussion forum or comments section
  };

  const handleSubmitProposal = () => {
    console.log('Opening proposal submission form...');
    // In production, this would open a form to submit new proposals
  };

  const handleViewConstitution = () => {
    console.log('Opening DAO constitution...');
    // In production, this would open the DAO constitution document
  };

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Governance DAO
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Shape the future of AI Gaming through decentralized governance. 
            Vote on proposals, submit ideas, and help guide our platform's evolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleSubmitProposal}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Submit Proposal
            </button>
            <button 
              onClick={handleViewConstitution}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              View Constitution
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">45</div>
              <div className="text-gray-400">Total Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">12,500</div>
              <div className="text-gray-400">Active Voters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
              <div className="text-gray-400">Participation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">5M</div>
              <div className="text-gray-400">Tokens Staked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

          {/* Proposals */}
          <div className="space-y-6">
            {filteredProposals.map(proposal => {
              const StatusIcon = getStatusIcon(proposal.status);
              const forPercentage = getVotePercentage(proposal.votesFor, proposal.totalVotes);
              const againstPercentage = getVotePercentage(proposal.votesAgainst, proposal.totalVotes);
              const userVote = userVotes[proposal.id];

              return (
                <div key={proposal.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(proposal.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{proposal.status.toUpperCase()}</span>
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{proposal.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Proposed by {proposal.proposer}</span>
                        <span>•</span>
                        <span>{formatTimeRemaining(proposal.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Voting Results */}
                  {proposal.totalVotes > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Voting Results</span>
                        <span className="text-gray-400">{proposal.totalVotes.toLocaleString()} votes</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">For</span>
                          </div>
                          <span className="text-white font-semibold">{forPercentage}% ({proposal.votesFor.toLocaleString()})</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${forPercentage}%` }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400">Against</span>
                          </div>
                          <span className="text-white font-semibold">{againstPercentage}% ({proposal.votesAgainst.toLocaleString()})</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-red-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${againstPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Voting Buttons */}
                  {proposal.status === 'active' && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleVote(proposal.id, 'for')}
                        disabled={!!userVote}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                          userVote === 'for'
                            ? 'bg-green-500 text-white'
                            : userVote
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white border border-green-500'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{userVote === 'for' ? 'Voted For' : 'Vote For'}</span>
                      </button>
                      <button
                        onClick={() => handleVote(proposal.id, 'against')}
                        disabled={!!userVote}
                        className={`flex-1 py-3 rounded-lg font-semib old transition-all duration-200 flex items-center justify-center space-x-2 ${
                          userVote === 'against'
                            ? 'bg-red-500 text-white'
                            : userVote
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>{userVote === 'against' ? 'Voted Against' : 'Vote Against'}</span>
                      </button>
                      <button 
                        onClick={() => handleDiscuss(proposal.id)}
                        className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Discuss</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How to Participate</h2>
            <p className="text-xl text-gray-400">Get involved in shaping the future of AI Gaming</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-center">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Stake Tokens</h3>
              <p className="text-gray-400">Stake your tokens to gain voting power and participate in governance decisions.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-center">
              <Vote className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Vote on Proposals</h3>
              <p className="text-gray-400">Cast your vote on active proposals to influence platform development.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-center">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Submit Ideas</h3>
              <p className="text-gray-400">Propose new features, games, or changes to improve the platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}