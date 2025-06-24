import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebSocketReturn {
  sendMessage: (message: string) => void;
  lastMessage: string | null;
  connectionState: 'connecting' | 'connected' | 'disconnected' | 'error';
  error: Error | null;
}

export function useWebSocket(): UseWebSocketReturn {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connected');
  const [error, setError] = useState<Error | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000;
  const messageQueue = useRef<string[]>([]);

  const connect = useCallback(() => {
    try {
      setConnectionState('connecting');
      setError(null);

      // Always use mock implementation for production
      setTimeout(() => {
        setConnectionState('connected');
        setError(null);
        reconnectAttempts.current = 0;
      }, 1000);
      return;

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError(err as Error);
      setConnectionState('error');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (ws.current) {
      ws.current.close(1000, 'User initiated disconnect');
      ws.current = null;
    }
    
    setConnectionState('disconnected');
  }, []);

  const sendMessage = useCallback((message: string) => {
    try {
      const messageData = JSON.parse(message);
      
      // Simulate realistic processing delay based on message complexity
      const processingTime = Math.min(2000 + (messageData.message.length * 50), 5000);
      
      setTimeout(() => {
        const mockResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: generateAdvancedMockResponse(messageData.message, messageData.context?.userProfile),
          timestamp: new Date().toISOString(),
          confidence: calculateConfidence(messageData.message),
          context: determineContext(messageData.message),
          suggestions: generateContextualSuggestions(messageData.message, messageData.context?.userProfile),
          actions: generateSmartActions(messageData.message, messageData.context?.userProfile),
          processingTime
        };
        
        setLastMessage(JSON.stringify(mockResponse));
      }, processingTime);
      
    } catch (err) {
      console.error('Failed to process message:', err);
      setError(err as Error);
    }
  }, []);

  // Advanced AI response generator with context awareness
  const generateAdvancedMockResponse = (userMessage: string, userProfile: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    const userName = userProfile?.username || 'Player';
    
    // Personalized game recommendations
    if (lowerMessage.includes('game') || lowerMessage.includes('play') || lowerMessage.includes('recommend')) {
      if (userProfile) {
        const winRate = userProfile.stats.winRate;
        const gamesPlayed = userProfile.stats.gamesPlayed;
        const level = userProfile.level;
        
        return `Based on your gaming profile analysis, ${userName}, here are my AI-powered recommendations:

🎯 **Personalized Game Recommendations:**
• **Cyber Warriors** - Perfect for your ${winRate}% win rate, offers strategic depth
• **Dragon Realm** - RPG elements match your ${gamesPlayed} games experience
• **Speed Legends** - Quick matches ideal for level ${level} players

📊 **Performance Insights:**
Your win rate of ${winRate}% suggests you excel at strategic games. I recommend focusing on games with:
- Complex decision trees (Strategy/RPG)
- Skill-based progression systems
- Higher reward multipliers for consistent players

💡 **Earning Optimization:**
With your current performance, you could potentially earn 15-25% more by focusing on games that reward consistency over quick wins.

Would you like me to analyze specific games or create a personalized gaming schedule?`;
      } else {
        return `I'd be happy to recommend games! Our AI-powered game matching system analyzes player preferences and skill levels to provide optimal recommendations.

🎮 **Top Recommended Games:**
• **Prediction Markets** - Use your analytical skills to predict outcomes (Entry: 10 AGT, Max: 500 AGT)
• **Fantasy Games** - Build teams and compete strategically (Entry: 15 AGT, Max: 750 AGT)
• **Cyber Warriors** - Strategic combat with AI opponents (Entry: 25 AGT, Max: 1000 AGT)

🚀 **For Beginners:**
• **Puzzle Master** - Learn the platform with lower risk (Entry: 10 AGT)
• **Dragon Realm** - Guided RPG experience with tutorials

Connect your wallet for personalized recommendations based on your gaming style and performance data!`;
      }
    }
    
    // Advanced earning analysis
    if (lowerMessage.includes('earn') || lowerMessage.includes('money') || lowerMessage.includes('profit') || lowerMessage.includes('strategy')) {
      if (userProfile) {
        const totalEarnings = userProfile.stats.totalEarnings;
        const agtBalance = userProfile.balances.AGT;
        const level = userProfile.level;
        
        return `Excellent question about earnings optimization, ${userName}! Let me analyze your financial profile:

💰 **Current Portfolio Analysis:**
• Total Earnings: $${totalEarnings.toFixed(2)}
• AGT Balance: ${agtBalance} tokens
• Player Level: ${level}

📈 **Optimized Earning Strategy:**
1. **Gaming Focus (60% allocation):**
   - High-ROI games based on your skill level
   - Expected daily: $${(totalEarnings * 0.1).toFixed(2)} - $${(totalEarnings * 0.2).toFixed(2)}

2. **DeFi Staking (30% allocation):**
   - Stake ${Math.floor(agtBalance * 0.3)} AGT in Tournament Pool (35.8% APY)
   - Monthly passive income: ~$${((agtBalance * 0.3 * 0.358) / 12).toFixed(2)}

3. **NFT Trading (10% allocation):**
   - Strategic NFT investments for game enhancement
   - Potential 20-40% monthly returns

🎯 **Personalized Recommendations:**
Based on your ${totalEarnings > 100 ? 'strong' : 'developing'} performance history, I suggest focusing on ${totalEarnings > 100 ? 'advanced tournaments and high-stake games' : 'skill development and consistent daily gaming'}.

Would you like me to create a detailed weekly earning schedule?`;
      } else {
        return `Great question about earning strategies! Our platform offers multiple revenue streams optimized by AI algorithms:

💎 **Primary Earning Methods:**
1. **Gaming Rewards (Active Income):**
   - Play-to-earn: $50-500+ daily potential
   - Tournament prizes: $8K-75K prize pools
   - Achievement bonuses: 10-100 AGT per milestone

2. **DeFi Staking (Passive Income):**
   - Gaming Token Pool: 25.5% APY
   - Tournament Pool: 35.8% APY (highest returns)
   - NFT Rewards Pool: 18.2% APY
   - Governance Pool: 12.4% APY

3. **NFT Trading:**
   - Marketplace trading: 23-260 AGT range
   - Rare item flipping: 20-40% monthly returns
   - Game asset rentals: Passive income stream

4. **Referral Program:**
   - 10% of referred player earnings
   - Bonus XP and level progression
   - Exclusive tournament access

🚀 **Optimal Strategy:**
Combine active gaming (60%) with passive staking (30%) and strategic NFT investments (10%) for maximum returns.

Connect your wallet to get personalized earning projections!`;
      }
    }
    
    // Advanced staking analysis
    if (lowerMessage.includes('stak') || lowerMessage.includes('defi') || lowerMessage.includes('apy') || lowerMessage.includes('pool')) {
      if (userProfile) {
        const agtBalance = userProfile.balances.AGT;
        const nftBalance = userProfile.balances.NFT;
        const tourBalance = userProfile.balances.TOUR;
        const govBalance = userProfile.balances.GOV;
        
        return `Perfect timing for staking optimization, ${userName}! Let me analyze your token portfolio:

🏦 **Your Current Holdings:**
• AGT: ${agtBalance} tokens
• NFT: ${nftBalance} tokens  
• TOUR: ${tourBalance} tokens
• GOV: ${govBalance} tokens

📊 **AI-Optimized Staking Strategy:**

**Recommended Allocation:**
1. **Tournament Pool (35.8% APY)** - ${Math.floor(agtBalance * 0.4)} AGT
   - Highest returns, 60-day lock
   - Monthly earnings: ~$${((agtBalance * 0.4 * 0.358) / 12 * 5).toFixed(2)}

2. **Gaming Token Pool (25.5% APY)** - ${Math.floor(agtBalance * 0.3)} AGT
   - Balanced risk/reward, 30-day lock
   - Monthly earnings: ~$${((agtBalance * 0.3 * 0.255) / 12 * 5).toFixed(2)}

3. **NFT Rewards Pool (18.2% APY)** - ${Math.floor(agtBalance * 0.2)} AGT
   - Lower risk, 14-day lock
   - Monthly earnings: ~$${((agtBalance * 0.2 * 0.182) / 12 * 5).toFixed(2)}

4. **Reserve for Gaming** - ${Math.floor(agtBalance * 0.1)} AGT
   - Keep liquid for game entries and opportunities

💡 **Total Projected Monthly Passive Income:** $${(((agtBalance * 0.4 * 0.358) + (agtBalance * 0.3 * 0.255) + (agtBalance * 0.2 * 0.182)) / 12 * 5).toFixed(2)}

⚠️ **Risk Assessment:** Your portfolio shows ${agtBalance > 500 ? 'strong diversification potential' : 'conservative growth opportunity'}. 

Would you like me to execute this staking strategy or analyze alternative allocations?`;
      } else {
        return `Excellent question about our DeFi staking ecosystem! Our AI-optimized pools offer industry-leading returns:

🏆 **Premium Staking Pools:**

**Tournament Pool (35.8% APY)** 🥇
• Minimum: 200 AGT
• Lock period: 60 days
• Risk level: Medium-High
• Best for: Experienced users seeking maximum returns

**Gaming Token Pool (25.5% APY)** 🎮
• Minimum: 100 AGT  
• Lock period: 30 days
• Risk level: Medium
• Best for: Balanced growth strategy

**NFT Rewards Pool (18.2% APY)** 🎨
• Minimum: 50 AGT
• Lock period: 14 days  
• Risk level: Low-Medium
• Best for: Beginners and flexible strategies

**Governance Pool (12.4% APY)** 🗳️
• Minimum: 1000 AGT
• Lock period: 90 days
• Risk level: Low
• Best for: Long-term holders with voting rights

🔒 **Security Features:**
• Multi-signature smart contracts
• Insurance fund protection
• Regular security audits
• Transparent on-chain operations

💡 **Pro Tip:** Diversify across multiple pools to optimize risk-adjusted returns. Our AI recommends a 40-30-20-10 allocation strategy.

Connect your wallet for personalized staking recommendations!`;
      }
    }
    
    // Tournament analysis
    if (lowerMessage.includes('tournament') || lowerMessage.includes('compete') || lowerMessage.includes('prize')) {
      if (userProfile) {
        const winRate = userProfile.stats.winRate;
        const agtBalance = userProfile.balances.AGT;
        const level = userProfile.level;
        
        return `Tournament analysis for ${userName} - Let me find the perfect competitions for your skill level:

🏆 **Recommended Tournaments Based on Your Profile:**

**Cyber Warriors Championship** ($50,000 prize pool)
• Entry fee: 25 AGT ✅ (You have ${agtBalance})
• Skill match: ${winRate > 70 ? 'Excellent' : winRate > 60 ? 'Good' : 'Developing'} (${winRate}% win rate)
• Format: Single elimination
• ROI potential: ${winRate > 70 ? 'High' : winRate > 60 ? 'Medium' : 'Learning opportunity'}

**Dragon Realm Quest** ($25,000 prize pool)
• Entry fee: 15 AGT ✅
• Recommended for level ${level} players
• Format: Round robin (more forgiving)
• Expected placement: ${winRate > 65 ? 'Top 25%' : 'Top 50%'}

📊 **Tournament ROI Calculator:**
With your ${winRate}% win rate:
• Expected value per tournament: ${(winRate * 0.01 * 100).toFixed(2)} AGT
• Recommended weekly tournaments: ${winRate > 70 ? '3-4' : '2-3'}
• Monthly tournament budget: ${Math.floor(agtBalance * 0.2)} AGT

🎯 **Strategy Recommendations:**
${winRate > 70 ? 'Focus on high-stakes tournaments for maximum returns' : 'Build experience in lower-entry tournaments first'}

Would you like me to register you for optimal tournaments or analyze specific competition strategies?`;
      } else {
        return `Tournaments are where champions are made! Our competitive ecosystem offers massive opportunities:

🏆 **Active Tournaments:**

**Cyber Warriors Championship** 
• Prize Pool: $50,000 USDT
• Entry: 25 AGT
• Format: Single Elimination
• Skill Level: Expert
• Registration: Open (1,250/2,000 players)

**Dragon Realm Quest**
• Prize Pool: $25,000 USDT  
• Entry: 15 AGT
• Format: Round Robin
• Skill Level: Intermediate
• Registration: Open (890/1,500 players)

**Speed Legends Grand Prix**
• Prize Pool: $15,000 USDT
• Entry: 10 AGT
• Format: Battle Royale
• Skill Level: Beginner
• Registration: Open (567/1,000 players)

🎯 **Tournament Features:**
• Real-time leaderboards
• Live streaming integration
• Professional esports commentary
• Anti-cheat AI monitoring
• Instant prize distribution

💰 **Prize Distribution:**
• 1st Place: 50% of prize pool
• 2nd Place: 30% of prize pool  
• 3rd Place: 20% of prize pool
• Participation rewards for all players

🚀 **Pro Tips:**
• Start with lower-entry tournaments to build experience
• Study opponent strategies in replay mode
• Join practice sessions before major events

Connect your wallet to register and receive personalized tournament recommendations!`;
      }
    }
    
    // NFT and marketplace analysis
    if (lowerMessage.includes('nft') || lowerMessage.includes('marketplace') || lowerMessage.includes('trade') || lowerMessage.includes('buy')) {
      if (userProfile) {
        const agtBalance = userProfile.balances.AGT;
        const nftBalance = userProfile.balances.NFT;
        
        return `NFT marketplace analysis for ${userName} - Let me find the best investment opportunities:

🎨 **Personalized NFT Recommendations (Budget: ${agtBalance} AGT):**

**Within Your Budget:**
• **Cosmic Weapon Skin** - 23 AGT
  - Game: Cyber Warriors
  - Rarity: Rare
  - Utility: +15% damage boost
  - Investment potential: Strong

• **Neon Racing Car** - 38 AGT  
  - Game: Speed Legends
  - Rarity: Rare
  - Utility: +20% speed boost
  - Market trend: Rising

**Premium Investments (if budget allows):**
• **Dragon Rider Character** - 90 AGT
  - Game: Dragon Realm
  - Rarity: Epic
  - Utility: Exclusive quest access
  - ROI: 25-40% historically

📊 **Your NFT Portfolio Analysis:**
• Current NFT tokens: ${nftBalance}
• Estimated portfolio value: $${(nftBalance * 87.5).toFixed(2)}
• Diversification score: ${nftBalance > 10 ? 'Good' : 'Needs improvement'}

💡 **Investment Strategy:**
1. **Gaming Utility NFTs (70%)** - Items that enhance gameplay
2. **Collectible Assets (20%)** - Rare items for long-term appreciation  
3. **Speculative Plays (10%)** - New releases with high potential

🔥 **Market Insights:**
• Legendary items up 15% this week
• Gaming utility NFTs showing strong demand
• Best buying opportunity: Epic rarity items (undervalued)

Would you like me to execute purchases or provide detailed market analysis for specific items?`;
      } else {
        return `Welcome to our premium NFT marketplace! Discover unique gaming assets with real utility:

🎨 **Featured Collections:**

**Gaming Weapons & Equipment:**
• Legendary Sword of Fire - 125 AGT (Epic damage boost)
• Crystal Mage Staff - 160 AGT (Magical abilities)
• Battle Armor Set - 60 AGT (Defense enhancement)

**Character & Avatars:**
• Dragon Rider Character - 90 AGT (Exclusive quests)
• Stealth Assassin Outfit - 75 AGT (Stealth abilities)

**Vehicles & Mounts:**
• Neon Racing Car - 38 AGT (Speed boost)
• Quantum Bike - 95 AGT (Time manipulation)

**Virtual Real Estate:**
• Mystic Forest Land - 260 AGT (Resource generation)

📊 **Marketplace Features:**
• **Utility-First Design:** All NFTs provide in-game benefits
• **Cross-Game Compatibility:** Use assets across multiple games
• **Rental System:** Earn passive income from your NFTs
• **Auction House:** Competitive bidding for rare items
• **Price History:** Transparent market data

💎 **Investment Highlights:**
• Average NFT appreciation: 25% monthly
• Legendary items: 40%+ returns
• Gaming utility items: Consistent demand
• Limited editions: Premium collectible value

🔒 **Security & Authenticity:**
• Blockchain-verified ownership
• Anti-fraud protection
• Secure escrow system
• Instant transfers

Connect your wallet to start building your NFT portfolio with personalized recommendations!`;
      }
    }
    
    // Portfolio and balance analysis
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('balance') || lowerMessage.includes('optimize') || lowerMessage.includes('allocat')) {
      if (userProfile) {
        const { AGT, NFT, TOUR, GOV } = userProfile.balances;
        const totalValue = AGT * 5 + NFT * 87.5 + TOUR * 75 + GOV * 6.25;
        const totalEarnings = userProfile.stats.totalEarnings;
        
        return `Comprehensive portfolio analysis for ${userName}:

💼 **Current Portfolio Overview:**
• **Total Portfolio Value:** $${totalValue.toFixed(2)}
• **AGT Tokens:** ${AGT} (${((AGT * 5 / totalValue) * 100).toFixed(1)}%)
• **NFT Assets:** ${NFT} (${((NFT * 87.5 / totalValue) * 100).toFixed(1)}%)
• **TOUR Tokens:** ${TOUR} (${((TOUR * 75 / totalValue) * 100).toFixed(1)}%)
• **GOV Tokens:** ${GOV} (${((GOV * 6.25 / totalValue) * 100).toFixed(1)}%)

📊 **Performance Metrics:**
• **Total Lifetime Earnings:** $${totalEarnings.toFixed(2)}
• **Portfolio Growth:** ${totalEarnings > 0 ? '+' : ''}${((totalValue - totalEarnings) / Math.max(totalEarnings, 1) * 100).toFixed(1)}%
• **Risk Score:** ${totalValue > 1000 ? 'Conservative' : totalValue > 500 ? 'Moderate' : 'Aggressive'}

🎯 **AI Optimization Recommendations:**

**Immediate Actions:**
1. **Rebalance Portfolio:** 
   - Target: 40% AGT, 25% NFT, 25% TOUR, 10% GOV
   - Current deviation: ${Math.abs(40 - (AGT * 5 / totalValue) * 100).toFixed(1)}% from optimal

2. **Staking Optimization:**
   - Stake ${Math.floor(AGT * 0.6)} AGT across multiple pools
   - Projected monthly income: $${((AGT * 0.6 * 0.25) / 12 * 5).toFixed(2)}

3. **NFT Strategy:**
   - ${NFT < 10 ? 'Increase NFT holdings for better game performance' : 'Consider selling lower-utility NFTs'}

📈 **Growth Projections (30 days):**
• **Conservative estimate:** +${(totalValue * 0.05).toFixed(2)} (5%)
• **Moderate estimate:** +${(totalValue * 0.12).toFixed(2)} (12%)
• **Aggressive estimate:** +${(totalValue * 0.25).toFixed(2)} (25%)

Would you like me to execute the optimization strategy or provide detailed analysis for specific assets?`;
      } else {
        return `Portfolio management is crucial for maximizing returns! Let me explain our comprehensive approach:

💼 **Optimal Portfolio Allocation Strategy:**

**Recommended Distribution:**
• **AGT Tokens (40%)** - Primary gaming currency
  - Liquid for game entries and opportunities
  - Staking potential: 25.5% APY
  - High liquidity and utility

• **NFT Assets (25%)** - Gaming enhancement items
  - Utility-focused investments
  - Average appreciation: 25% monthly
  - Cross-game compatibility

• **TOUR Tokens (25%)** - Tournament ecosystem
  - Tournament entry and prizes
  - Staking rewards: 35.8% APY
  - Competition-focused utility

• **GOV Tokens (10%)** - Governance participation
  - Voting rights in DAO decisions
  - Long-term value appreciation
  - Platform development influence

📊 **Portfolio Management Tools:**
• **Real-time Analytics:** Track performance across all assets
• **Rebalancing Alerts:** AI-powered optimization suggestions
• **Risk Assessment:** Continuous portfolio health monitoring
• **Yield Optimization:** Automated staking recommendations

🎯 **Advanced Strategies:**
• **Dollar-Cost Averaging:** Systematic investment approach
• **Seasonal Rebalancing:** Quarterly portfolio optimization
• **Yield Farming:** Multi-pool staking strategies
• **NFT Rotation:** Strategic buying and selling cycles

💡 **Pro Tips:**
• Diversify across all token types
• Keep 10-15% liquid for opportunities
• Regular rebalancing (monthly)
• Monitor market trends and adjust accordingly

Connect your wallet for personalized portfolio analysis and optimization recommendations!`;
      }
    }
    
    // Help and getting started
    if (lowerMessage.includes('help') || lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('tutorial')) {
      if (userProfile) {
        return `Welcome back, ${userName}! I see you're level ${userProfile.level} with ${userProfile.stats.gamesPlayed} games played. Here's how I can help optimize your experience:

🚀 **Personalized Assistance Menu:**

**Performance Optimization:**
• Analyze your ${userProfile.stats.winRate}% win rate for improvement opportunities
• Recommend games matching your skill level
• Create custom earning schedules

**Financial Management:**
• Portfolio analysis of your $${(userProfile.balances.AGT * 5 + userProfile.balances.NFT * 87.5).toFixed(2)} holdings
• Staking optimization strategies
• ROI calculations for investments

**Strategic Planning:**
• Tournament recommendations based on your performance
• NFT investment opportunities
• Long-term growth strategies

**Real-time Support:**
• Live market analysis and trends
• Instant answers to platform questions
• Personalized tips and insights

🎯 **Quick Actions:**
• "Analyze my performance" - Detailed gaming statistics
• "Optimize my portfolio" - AI-powered rebalancing
• "Find tournaments" - Skill-matched competitions
• "Show earning opportunities" - Personalized recommendations

💡 **Advanced Features:**
• Predictive analytics for market trends
• Automated strategy suggestions
• Risk assessment and management
• Performance benchmarking

What specific area would you like to explore? I'm here to provide intelligent, data-driven assistance tailored to your gaming journey!`;
      } else {
        return `Welcome to AI Gaming! I'm your intelligent assistant powered by advanced neural networks. Here's everything you need to know:

🎮 **Getting Started Guide:**

**Step 1: Connect Your Wallet**
• Secure wallet integration
• Instant access to all features
• Portfolio tracking and management

**Step 2: Explore Games**
• 47+ AI-powered games
• Multiple categories and skill levels
• Real rewards and achievements

**Step 3: Start Earning**
• Play-to-earn mechanics
• Tournament competitions
• DeFi staking opportunities

**Step 4: Build Your Portfolio**
• Diversified token holdings
• NFT investments
• Strategic asset allocation

🧠 **AI Assistant Capabilities:**
• **Intelligent Recommendations:** Personalized game and investment suggestions
• **Real-time Analysis:** Market trends and performance insights
• **Strategic Planning:** Long-term growth optimization
• **Risk Management:** Portfolio protection strategies

💰 **Earning Opportunities:**
• **Gaming:** $50-500+ daily potential
• **Staking:** 12.4-35.8% APY returns
• **Tournaments:** $8K-75K prize pools
• **NFT Trading:** 20-40% monthly returns
• **Referrals:** 10% of friend earnings

🔒 **Security & Safety:**
• Audited smart contracts
• Multi-signature security
• Insurance fund protection
• Transparent operations

🚀 **Pro Features:**
• Advanced analytics dashboard
• Automated optimization suggestions
• Market prediction algorithms
• Personalized learning paths

Ready to begin your AI Gaming journey? Connect your wallet and I'll provide personalized guidance every step of the way!`;
      }
    }
    
    // Security and safety
    if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('risk') || lowerMessage.includes('protect')) {
      return `Security is our absolute priority! Here's our comprehensive protection framework:

🛡️ **Platform Security Infrastructure:**

**Smart Contract Security:**
• Multiple third-party audits by leading firms
• Formal verification of critical functions
• Bug bounty program with $100K+ rewards
• Real-time monitoring and anomaly detection

**Financial Protection:**
• Multi-signature treasury management
• Insurance fund covering 15% of TVL
• Emergency pause mechanisms
• Decentralized governance oversight

**User Protection:**
• Non-custodial wallet integration
• Zero-knowledge privacy features
• Encrypted data transmission
• GDPR compliance

🔐 **Personal Security Best Practices:**

**Wallet Security:**
• Use hardware wallets for large amounts
• Never share private keys or seed phrases
• Enable 2FA on all accounts
• Verify all transaction details

**Platform Usage:**
• Start with small amounts to learn
• Verify smart contract addresses
• Use official links only
• Report suspicious activity immediately

**Investment Safety:**
• Diversify across multiple assets
• Never invest more than you can afford to lose
• Understand lock periods and risks
• Regular portfolio reviews

⚠️ **Risk Management:**
• **Smart Contract Risk:** Mitigated by audits and insurance
• **Market Risk:** Diversification and position sizing
• **Liquidity Risk:** Multiple exit strategies
• **Regulatory Risk:** Compliance monitoring

📊 **Security Metrics:**
• 99.9% uptime since launch
• Zero security incidents
• $50M+ in assets protected
• 125K+ users trust our platform

🚨 **Emergency Procedures:**
• 24/7 security monitoring
• Instant incident response team
• Community alert systems
• Rapid resolution protocols

💡 **Security Tips:**
• Bookmark official website
• Join official communication channels
• Stay updated on security announcements
• Report phishing attempts

Our security team works around the clock to protect your assets. Any specific security concerns I can address?`;
    }
    
    // Default comprehensive response
    return `Thank you for reaching out! I'm your AI Gaming assistant, powered by advanced neural networks and machine learning algorithms. I provide intelligent, personalized assistance for all aspects of our platform.

🧠 **My Capabilities:**
• **Intelligent Analysis:** Real-time data processing and insights
• **Personalized Recommendations:** Tailored strategies based on your profile
• **Market Intelligence:** Trend analysis and predictive modeling
• **Strategic Planning:** Long-term optimization and growth strategies

🎮 **Platform Overview:**
Our ecosystem combines AI-powered gaming with decentralized finance, creating unique earning opportunities through:
• **47+ Games:** Strategy, RPG, Action, Puzzle, Racing, and more
• **DeFi Staking:** 12.4-35.8% APY across multiple pools
• **NFT Marketplace:** Utility-focused digital assets
• **Tournaments:** $8K-75K prize pools
• **Governance:** Community-driven development

💰 **Earning Potential:**
• **Daily Gaming:** $50-500+ based on skill and time
• **Passive Staking:** $100-1000+ monthly depending on stake
• **Tournament Prizes:** $500-25,000+ for top performers
• **NFT Trading:** 20-40% monthly returns for active traders

🚀 **Getting Started:**
1. Connect your wallet for personalized experience
2. Explore games matching your interests
3. Start with small investments to learn
4. Gradually build your portfolio and skills

What specific area interests you most? I can provide detailed guidance on games, earning strategies, DeFi features, or any other aspect of our platform!`;
  };

  // Calculate response confidence based on message complexity and context
  const calculateConfidence = (message: string): number => {
    let confidence = 0.7; // Base confidence
    
    // Increase confidence for specific topics
    const topics = ['game', 'stake', 'earn', 'tournament', 'nft', 'portfolio'];
    const matchedTopics = topics.filter(topic => message.toLowerCase().includes(topic));
    confidence += matchedTopics.length * 0.05;
    
    // Adjust for message length and complexity
    if (message.length > 50) confidence += 0.1;
    if (message.includes('?')) confidence += 0.05;
    
    return Math.min(0.95, confidence);
  };

  // Determine response context
  const determineContext = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('game') || lowerMessage.includes('play')) return 'gaming';
    if (lowerMessage.includes('earn') || lowerMessage.includes('money')) return 'earning';
    if (lowerMessage.includes('stake') || lowerMessage.includes('defi')) return 'defi';
    if (lowerMessage.includes('tournament')) return 'tournament';
    if (lowerMessage.includes('nft') || lowerMessage.includes('marketplace')) return 'marketplace';
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('balance')) return 'portfolio';
    if (lowerMessage.includes('help') || lowerMessage.includes('start')) return 'help';
    
    return 'general';
  };

  // Generate contextual suggestions
  const generateContextualSuggestions = (message: string, userProfile: any): string[] => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('game')) {
      return userProfile ? [
        'Analyze my gaming performance trends',
        'Find games matching my skill level',
        'Calculate optimal gaming schedule'
      ] : [
        'Show me beginner-friendly games',
        'What are the highest earning games?',
        'Explain game mechanics and rewards'
      ];
    }
    
    if (lowerMessage.includes('earn')) {
      return userProfile ? [
        'Optimize my current earning strategy',
        'Calculate potential monthly income',
        'Show advanced earning techniques'
      ] : [
        'Explain all earning methods',
        'Calculate earning potential',
        'Show me the best strategies'
      ];
    }
    
    if (lowerMessage.includes('stake')) {
      return userProfile ? [
        'Optimize my staking allocation',
        'Calculate staking rewards',
        'Compare all staking pools'
      ] : [
        'Explain staking mechanics',
        'Which pool offers best returns?',
        'What are the risks involved?'
      ];
    }
    
    return userProfile ? [
      'Show me personalized opportunities',
      'Analyze my overall performance',
      'Recommend next actions'
    ] : [
      'Help me get started',
      'Explain platform features',
      'Show earning opportunities'
    ];
  };

  // Generate smart actions
  const generateSmartActions = (message: string, userProfile: any): any[] => {
    const actions = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('game')) {
      actions.push({
        id: 'browse_games',
        label: 'Browse Games',
        action: 'navigate',
        data: { section: 'games' }
      });
    }
    
    if (lowerMessage.includes('stake') || lowerMessage.includes('defi')) {
      actions.push({
        id: 'view_staking',
        label: 'View Staking Pools',
        action: 'navigate',
        data: { section: 'staking' }
      });
    }
    
    if (lowerMessage.includes('tournament')) {
      actions.push({
        id: 'view_tournaments',
        label: 'View Tournaments',
        action: 'navigate',
        data: { section: 'tournaments' }
      });
    }
    
    if (lowerMessage.includes('nft') || lowerMessage.includes('marketplace')) {
      actions.push({
        id: 'browse_nfts',
        label: 'Browse NFTs',
        action: 'navigate',
        data: { section: 'marketplace' }
      });
    }
    
    return actions;
  };

  // Initialize connection
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    sendMessage,
    lastMessage,
    connectionState,
    error
  };
}