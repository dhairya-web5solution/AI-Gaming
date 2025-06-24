import React, { useState } from 'react';
import { Code, Palette, Zap, DollarSign, Users, Trophy, Download, ExternalLink, Play, Star } from 'lucide-react';

export default function CreatorHub() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const sdkFeatures = [
    {
      icon: Code,
      title: "No-Code Integration",
      description: "Drag-and-drop modules for DeFi features, AI NPCs, and reward systems"
    },
    {
      icon: Palette,
      title: "Customizable UI",
      description: "Pre-built components and themes that match your game's aesthetic"
    },
    {
      icon: Zap,
      title: "AI-Powered NPCs",
      description: "Intelligent characters that adapt to player behavior and provide guidance"
    },
    {
      icon: DollarSign,
      title: "Built-in Monetization",
      description: "Integrated payment systems, NFT minting, and reward distribution"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "RPG Adventure Template",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Complete RPG framework with character progression, quests, and NFT items",
      downloads: 1250,
      rating: 4.8,
      price: "Free"
    },
    {
      id: 2,
      name: "Strategy Game Kit",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Real-time strategy components with AI opponents and tournament support",
      downloads: 890,
      rating: 4.6,
      price: "$49"
    },
    {
      id: 3,
      name: "Puzzle Game Framework",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      description: "Modular puzzle system with difficulty scaling and reward mechanics",
      downloads: 670,
      rating: 4.7,
      price: "$29"
    }
  ];

  const successStories = [
    {
      name: "CryptoQuest",
      developer: "Indie Studios",
      revenue: "$125K",
      players: "50K+",
      description: "Fantasy RPG that generated significant revenue through our DeFi integration"
    },
    {
      name: "Battle Royale Pro",
      developer: "GameDev Team",
      revenue: "$89K",
      players: "35K+",
      description: "Competitive shooter with tournament features and NFT weapon skins"
    },
    {
      name: "Puzzle Kingdom",
      developer: "Solo Developer",
      revenue: "$45K",
      players: "25K+",
      description: "Casual puzzle game with staking rewards and daily challenges"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'sdk', name: 'SDK Features' },
    { id: 'templates', name: 'Templates' },
    { id: 'success', name: 'Success Stories' },
    { id: 'docs', name: 'Documentation' }
  ];

  const handleDownloadSDK = () => {
    console.log('Downloading SDK...');
    // In production, this would trigger SDK download
  };

  const handleViewDocumentation = () => {
    console.log('Opening documentation...');
    // In production, this would open documentation site
  };

  const handleDownloadTemplate = (templateId: number) => {
    console.log(`Downloading template ${templateId}...`);
    // In production, this would download the template
  };

  const handleStartBuilding = () => {
    console.log('Starting building process...');
    // In production, this would redirect to SDK setup
  };

  const handleScheduleDemo = () => {
    console.log('Scheduling demo...');
    // In production, this would open calendar booking
  };

  const handleReadGuide = () => {
    console.log('Opening quick start guide...');
    // In production, this would open the guide
  };

  const handleViewAPI = () => {
    console.log('Opening API reference...');
    // In production, this would open API docs
  };

  const handleWatchVideos = () => {
    console.log('Opening video tutorials...');
    // In production, this would open video library
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Creator Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Empower your indie games with AI-enhanced gameplay and DeFi integration. 
            Our GameFi SDK makes it easy to add blockchain features without complex coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownloadSDK}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download SDK</span>
            </button>
            <button 
              onClick={handleViewDocumentation}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View Documentation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400">Games Created</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$2.5M+</div>
                <div className="text-gray-400">Revenue Generated</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">1,200+</div>
                <div className="text-gray-400">Active Developers</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">For Indie Developers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Monetize your games with built-in DeFi features</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Access to our 125K+ player community</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">No blockchain expertise required</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Revenue sharing and marketing support</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">For Studios</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Enterprise-grade infrastructure and support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Custom integration and white-label solutions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Advanced analytics and player insights</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Priority listing and promotional support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'sdk' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">GameFi SDK Features</h2>
              <p className="text-xl text-gray-400">Everything you need to create blockchain-powered games</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sdkFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                    <Icon className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Code Example */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Quick Integration Example</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`// Initialize AI Gaming SDK
import { AIGamingSDK } from '@aigaming/sdk';

const sdk = new AIGamingSDK({
  apiKey: 'your-api-key',
  network: 'polygon'
});

// Add reward system
sdk.rewards.setup({
  tokenReward: 100,
  nftReward: 'rare-sword',
  trigger: 'level-complete'
});

// Create AI NPC
const npc = sdk.ai.createNPC({
  personality: 'helpful-guide',
  knowledge: 'game-mechanics'
});`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'templates' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Game Templates</h2>
              <p className="text-xl text-gray-400">Pre-built templates to jumpstart your development</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.map(template => (
                <div key={template.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">{template.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-300 text-sm">{template.rating}</span>
                        </div>
                      </div>
                      <span className="text-green-400 font-semibold">{template.price}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleDownloadTemplate(template.id)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                    >
                      Download Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'success' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
              <p className="text-xl text-gray-400">See how developers are thriving with our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                  <p className="text-purple-400 font-semibold mb-4">{story.developer}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{story.revenue}</div>
                      <div className="text-gray-400 text-sm">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{story.players}</div>
                      <div className="text-gray-400 text-sm">Players</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'docs' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Documentation</h2>
              <p className="text-xl text-gray-400">Everything you need to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3">Quick Start Guide</h3>
                <p className="text-gray-400 text-sm mb-4">Get up and running in 5 minutes</p>
                <button 
                  onClick={handleReadGuide}
                  className="text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                >
                  <span>Read Guide</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3">API Reference</h3>
                <p className="text-gray-400 text-sm mb-4">Complete API documentation</p>
                <button 
                  onClick={handleViewAPI}
                  className="text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                >
                  <span>View API</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3">Tutorials</h3>
                <p className="text-gray-400 text-sm mb-4">Step-by-step video tutorials</p>
                <button 
                  onClick={handleWatchVideos}
                  className="text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                >
                  <span>Watch Videos</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build the Future?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers creating the next generation of blockchain games
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartBuilding}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Start Building Now
            </button>
            <button 
              onClick={handleScheduleDemo}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}