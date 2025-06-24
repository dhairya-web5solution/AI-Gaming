export class ContextAnalyzer {
  constructor() {
    this.pageContexts = this.initializePageContexts();
    this.sectionMappings = this.initializeSectionMappings();
  }

  analyzeContext(rawContext) {
    if (!rawContext) {
      return this.getDefaultContext();
    }

    try {
      const context = {
        currentPage: this.normalizePage(rawContext.currentPage),
        currentSection: this.normalizeSection(rawContext.pageContent?.currentSection),
        userActivity: this.analyzeUserActivity(rawContext.pageContent?.userActions),
        visibleContent: this.analyzeVisibleContent(rawContext.pageContent?.visibleContent),
        relevantData: this.extractRelevantData(rawContext.relevantContent),
        sessionInfo: this.analyzeSessionInfo(rawContext),
        timestamp: new Date(rawContext.timestamp || Date.now())
      };

      // Enrich with page-specific context
      context.pageContext = this.getPageContext(context.currentPage);
      
      // Determine user intent based on context
      context.inferredIntent = this.inferUserIntent(context);
      
      // Calculate context confidence
      context.confidence = this.calculateContextConfidence(context);

      return context;
    } catch (error) {
      console.error('Context analysis error:', error);
      return this.getDefaultContext();
    }
  }

  normalizePage(page) {
    if (!page || typeof page !== 'string') return 'home';
    
    const cleanPage = page.toLowerCase().replace(/^\/+|\/+$/g, '');
    
    const pageMap = {
      '': 'home',
      'home': 'home',
      'about': 'about',
      'creator-hub': 'creator',
      'governance': 'governance',
      'referral': 'referral',
      'landing': 'landing'
    };

    return pageMap[cleanPage] || 'home';
  }

  normalizeSection(section) {
    if (!section || typeof section !== 'string') return 'unknown';
    
    const sectionMap = {
      'hero': 'hero',
      'games': 'games',
      'marketplace': 'marketplace',
      'staking': 'staking',
      'tournaments': 'tournaments',
      'analytics': 'analytics'
    };

    return sectionMap[section.toLowerCase()] || 'unknown';
  }

  analyzeUserActivity(userActions) {
    if (!Array.isArray(userActions)) return { recentActions: [], patterns: [] };

    const recentActions = userActions.slice(-5);
    const patterns = this.detectActivityPatterns(userActions);
    
    return {
      recentActions,
      patterns,
      activityLevel: this.calculateActivityLevel(userActions),
      lastAction: recentActions[recentActions.length - 1]
    };
  }

  analyzeVisibleContent(visibleContent) {
    if (!Array.isArray(visibleContent)) return { keywords: [], topics: [] };

    const keywords = this.extractKeywords(visibleContent);
    const topics = this.identifyTopics(keywords);
    
    return {
      keywords,
      topics,
      contentType: this.determineContentType(visibleContent),
      relevanceScore: this.calculateRelevanceScore(keywords)
    };
  }

  extractRelevantData(relevantContent) {
    if (!relevantContent || typeof relevantContent !== 'object') {
      return { games: null, staking: null, marketplace: null, tournaments: null };
    }

    return {
      games: this.processGameData(relevantContent.games),
      staking: this.processStakingData(relevantContent.staking),
      marketplace: this.processMarketplaceData(relevantContent.marketplace),
      tournaments: this.processTournamentData(relevantContent.tournaments)
    };
  }

  analyzeSessionInfo(rawContext) {
    return {
      sessionId: rawContext.sessionId || 'unknown',
      userAgent: this.parseUserAgent(rawContext.userAgent),
      timestamp: rawContext.timestamp,
      conversationLength: rawContext.conversationHistory?.length || 0
    };
  }

  getPageContext(page) {
    return this.pageContexts[page] || this.pageContexts.default;
  }

  inferUserIntent(context) {
    const intents = [];

    // Page-based intent
    if (context.currentPage === 'games') intents.push('explore_games');
    if (context.currentPage === 'creator') intents.push('development');
    if (context.currentPage === 'governance') intents.push('governance');

    // Section-based intent
    if (context.currentSection === 'staking') intents.push('earn_passive');
    if (context.currentSection === 'tournaments') intents.push('compete');
    if (context.currentSection === 'marketplace') intents.push('trade_nfts');

    // Activity-based intent
    const recentActions = context.userActivity.recentActions;
    if (recentActions.some(action => action?.includes('click'))) {
      intents.push('navigation');
    }

    // Content-based intent
    const topics = context.visibleContent.topics;
    if (topics.includes('earning')) intents.push('maximize_earnings');
    if (topics.includes('security')) intents.push('learn_safety');

    return intents.length > 0 ? intents[0] : 'general_help';
  }

  calculateContextConfidence(context) {
    let confidence = 0.5; // Base confidence

    // Page context adds confidence
    if (context.currentPage !== 'unknown') confidence += 0.2;
    
    // Section context adds confidence
    if (context.currentSection !== 'unknown') confidence += 0.15;
    
    // User activity adds confidence
    if (context.userActivity.recentActions.length > 0) confidence += 0.1;
    
    // Visible content adds confidence
    if (context.visibleContent.keywords.length > 0) confidence += 0.1;
    
    // Relevant data adds confidence
    const hasRelevantData = Object.values(context.relevantData).some(data => data !== null);
    if (hasRelevantData) confidence += 0.05;

    return Math.min(1.0, confidence);
  }

  detectActivityPatterns(actions) {
    if (!Array.isArray(actions) || actions.length < 3) return [];

    const patterns = [];
    
    // Detect repeated actions
    const actionCounts = {};
    actions.forEach(action => {
      if (action?.action) {
        actionCounts[action.action] = (actionCounts[action.action] || 0) + 1;
      }
    });

    Object.entries(actionCounts).forEach(([action, count]) => {
      if (count >= 3) {
        patterns.push(`repeated_${action}`);
      }
    });

    // Detect navigation patterns
    const pages = actions.map(action => action?.page).filter(Boolean);
    if (pages.length >= 3) {
      const uniquePages = new Set(pages);
      if (uniquePages.size > 2) {
        patterns.push('exploring_platform');
      }
    }

    return patterns;
  }

  calculateActivityLevel(actions) {
    if (!Array.isArray(actions)) return 'low';
    
    const recentActions = actions.filter(action => {
      if (!action?.timestamp) return false;
      const actionTime = new Date(action.timestamp);
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      return actionTime > fiveMinutesAgo;
    });

    if (recentActions.length >= 10) return 'high';
    if (recentActions.length >= 5) return 'medium';
    return 'low';
  }

  extractKeywords(content) {
    if (!Array.isArray(content)) return [];

    const keywords = [];
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);

    content.forEach(text => {
      if (typeof text === 'string') {
        const words = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 2 && !stopWords.has(word));
        
        keywords.push(...words);
      }
    });

    // Count frequency and return top keywords
    const frequency = {};
    keywords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  identifyTopics(keywords) {
    const topicMap = {
      gaming: ['game', 'play', 'player', 'gaming', 'level', 'character', 'quest'],
      earning: ['earn', 'reward', 'money', 'income', 'profit', 'token', 'coin'],
      defi: ['stake', 'staking', 'yield', 'apy', 'liquidity', 'pool', 'farm'],
      nft: ['nft', 'token', 'collectible', 'art', 'digital', 'unique'],
      security: ['safe', 'security', 'protect', 'wallet', 'private', 'key'],
      tournament: ['tournament', 'compete', 'competition', 'prize', 'winner'],
      marketplace: ['buy', 'sell', 'trade', 'market', 'price', 'value']
    };

    const topics = [];
    Object.entries(topicMap).forEach(([topic, topicKeywords]) => {
      const matches = keywords.filter(keyword => 
        topicKeywords.some(topicKeyword => keyword.includes(topicKeyword))
      );
      if (matches.length > 0) {
        topics.push(topic);
      }
    });

    return topics;
  }

  determineContentType(content) {
    if (!Array.isArray(content)) return 'unknown';

    const contentText = content.join(' ').toLowerCase();
    
    if (contentText.includes('game') || contentText.includes('play')) return 'gaming';
    if (contentText.includes('stake') || contentText.includes('earn')) return 'defi';
    if (contentText.includes('nft') || contentText.includes('marketplace')) return 'marketplace';
    if (contentText.includes('tournament') || contentText.includes('compete')) return 'tournament';
    
    return 'general';
  }

  calculateRelevanceScore(keywords) {
    const relevantKeywords = [
      'game', 'stake', 'earn', 'nft', 'tournament', 'reward', 'token',
      'play', 'compete', 'trade', 'buy', 'sell', 'yield', 'apy'
    ];

    const relevantCount = keywords.filter(keyword => 
      relevantKeywords.some(relevant => keyword.includes(relevant))
    ).length;

    return Math.min(1.0, relevantCount / 5);
  }

  processGameData(gameData) {
    if (!gameData) return null;
    
    return {
      totalGames: gameData.totalGames || 0,
      categories: Array.isArray(gameData.categories) ? gameData.categories : [],
      topRated: Array.isArray(gameData.topRated) ? gameData.topRated : [],
      hasGameData: true
    };
  }

  processStakingData(stakingData) {
    if (!stakingData) return null;
    
    return {
      totalPools: stakingData.totalPools || 0,
      apyRanges: Array.isArray(stakingData.apyRanges) ? stakingData.apyRanges : [],
      totalValueLocked: stakingData.totalValueLocked || '0',
      hasStakingData: true
    };
  }

  processMarketplaceData(marketplaceData) {
    if (!marketplaceData) return null;
    
    return {
      totalItems: marketplaceData.totalItems || 0,
      priceRanges: Array.isArray(marketplaceData.priceRanges) ? marketplaceData.priceRanges : [],
      rarities: Array.isArray(marketplaceData.rarities) ? marketplaceData.rarities : [],
      hasMarketplaceData: true
    };
  }

  processTournamentData(tournamentData) {
    if (!tournamentData) return null;
    
    return {
      activeTournaments: tournamentData.activeTournaments || 0,
      totalPrizePool: Array.isArray(tournamentData.totalPrizePool) ? tournamentData.totalPrizePool : [],
      upcomingTournaments: tournamentData.upcomingTournaments || 0,
      hasTournamentData: true
    };
  }

  parseUserAgent(userAgent) {
    if (!userAgent || typeof userAgent !== 'string') {
      return { browser: 'unknown', os: 'unknown', device: 'unknown' };
    }

    const browser = this.detectBrowser(userAgent);
    const os = this.detectOS(userAgent);
    const device = this.detectDevice(userAgent);

    return { browser, os, device };
  }

  detectBrowser(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'unknown';
  }

  detectOS(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'unknown';
  }

  detectDevice(userAgent) {
    if (userAgent.includes('Mobile')) return 'mobile';
    if (userAgent.includes('Tablet')) return 'tablet';
    return 'desktop';
  }

  getDefaultContext() {
    return {
      currentPage: 'home',
      currentSection: 'unknown',
      userActivity: { recentActions: [], patterns: [], activityLevel: 'low' },
      visibleContent: { keywords: [], topics: [], contentType: 'general', relevanceScore: 0 },
      relevantData: { games: null, staking: null, marketplace: null, tournaments: null },
      sessionInfo: { sessionId: 'unknown', userAgent: { browser: 'unknown', os: 'unknown', device: 'unknown' } },
      pageContext: this.pageContexts.default,
      inferredIntent: 'general_help',
      confidence: 0.3,
      timestamp: new Date()
    };
  }

  initializePageContexts() {
    return {
      home: {
        primaryFeatures: ['games', 'staking', 'marketplace', 'tournaments'],
        userGoals: ['explore', 'learn', 'start_earning'],
        commonQuestions: ['how to start', 'best games', 'earning potential']
      },
      games: {
        primaryFeatures: ['game_selection', 'categories', 'rewards', 'difficulty'],
        userGoals: ['find_games', 'start_playing', 'maximize_earnings'],
        commonQuestions: ['best games for beginners', 'highest rewards', 'how to play']
      },
      creator: {
        primaryFeatures: ['sdk', 'templates', 'documentation', 'support'],
        userGoals: ['build_games', 'integrate_defi', 'monetize'],
        commonQuestions: ['how to start developing', 'sdk features', 'revenue sharing']
      },
      governance: {
        primaryFeatures: ['voting', 'proposals', 'dao_participation'],
        userGoals: ['participate_governance', 'vote_proposals', 'submit_ideas'],
        commonQuestions: ['how to vote', 'proposal process', 'governance tokens']
      },
      default: {
        primaryFeatures: ['general_help', 'navigation', 'platform_overview'],
        userGoals: ['get_help', 'understand_platform', 'find_information'],
        commonQuestions: ['what is this platform', 'how to get started', 'support']
      }
    };
  }

  initializeSectionMappings() {
    return {
      hero: 'platform_introduction',
      games: 'game_exploration',
      marketplace: 'nft_trading',
      staking: 'passive_earning',
      tournaments: 'competitive_gaming',
      analytics: 'performance_tracking'
    };
  }
}