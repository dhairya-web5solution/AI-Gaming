export class AIProcessor {
  constructor() {
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.contextPatterns = this.initializeContextPatterns();
    this.responseTemplates = this.initializeResponseTemplates();
  }

  async processMessage({ message, context, sessionId, conversationHistory }) {
    const startTime = Date.now();
    
    try {
      // Analyze message intent and extract entities
      const analysis = this.analyzeMessage(message, context);
      
      // Generate contextual response
      const response = await this.generateResponse(analysis, context, conversationHistory);
      
      // Calculate confidence score
      const confidence = this.calculateConfidence(analysis, response);
      
      // Generate suggestions and actions
      const suggestions = this.generateSuggestions(analysis, context);
      const actions = this.generateActions(analysis, context);
      
      const processingTime = Date.now() - startTime;
      
      return {
        content: response.content,
        confidence,
        context: analysis.category,
        suggestions,
        actions,
        processingTime,
        metadata: {
          intent: analysis.intent,
          entities: analysis.entities,
          sentiment: analysis.sentiment
        }
      };
    } catch (error) {
      console.error('AI Processing error:', error);
      return {
        content: "I apologize, but I encountered an error processing your request. Please try rephrasing your question or contact support if the issue persists.",
        confidence: 0.1,
        context: 'error',
        suggestions: ['Try asking a different question', 'Contact support'],
        actions: [],
        processingTime: Date.now() - startTime
      };
    }
  }

  analyzeMessage(message, context) {
    const lowerMessage = message.toLowerCase();
    
    // Intent classification
    const intent = this.classifyIntent(lowerMessage);
    
    // Entity extraction
    const entities = this.extractEntities(lowerMessage);
    
    // Sentiment analysis
    const sentiment = this.analyzeSentiment(lowerMessage);
    
    // Category determination
    const category = this.determineCategory(lowerMessage, context);
    
    // Urgency detection
    const urgency = this.detectUrgency(lowerMessage);
    
    return {
      intent,
      entities,
      sentiment,
      category,
      urgency,
      originalMessage: message,
      processedMessage: lowerMessage
    };
  }

  classifyIntent(message) {
    const intents = {
      question: ['what', 'how', 'why', 'when', 'where', 'which', 'who', '?'],
      request: ['can you', 'please', 'help me', 'show me', 'tell me'],
      complaint: ['problem', 'issue', 'error', 'bug', 'not working', 'broken'],
      compliment: ['great', 'awesome', 'amazing', 'love', 'excellent', 'perfect'],
      navigation: ['go to', 'take me', 'navigate', 'show', 'find'],
      tutorial: ['how to', 'tutorial', 'guide', 'learn', 'teach'],
      comparison: ['vs', 'versus', 'compare', 'difference', 'better', 'best'],
      recommendation: ['recommend', 'suggest', 'advice', 'should i', 'which one']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return intent;
      }
    }
    
    return 'general';
  }

  extractEntities(message) {
    const entities = {
      games: [],
      amounts: [],
      timeframes: [],
      features: [],
      currencies: []
    };

    // Game names
    const gamePatterns = [
      'cyber warriors', 'dragon realm', 'speed legends', 'puzzle master',
      'battle arena', 'space odyssey', 'mech warriors', 'crystal quest',
      'neon racers', 'mind bender', 'galactic empire', 'combat zone'
    ];
    
    gamePatterns.forEach(game => {
      if (message.includes(game)) {
        entities.games.push(game);
      }
    });

    // Amounts and numbers
    const amountMatches = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
    if (amountMatches) {
      entities.amounts = amountMatches;
    }

    // Timeframes
    const timePatterns = ['day', 'week', 'month', 'year', 'daily', 'weekly', 'monthly'];
    timePatterns.forEach(time => {
      if (message.includes(time)) {
        entities.timeframes.push(time);
      }
    });

    // Platform features
    const featurePatterns = [
      'staking', 'tournament', 'marketplace', 'nft', 'referral', 'governance',
      'analytics', 'creator hub', 'dao', 'voting', 'rewards'
    ];
    
    featurePatterns.forEach(feature => {
      if (message.includes(feature)) {
        entities.features.push(feature);
      }
    });

    // Currencies
    const currencyPatterns = ['eth', 'bitcoin', 'usdt', 'agt', 'nft', 'tour', 'gov'];
    currencyPatterns.forEach(currency => {
      if (message.includes(currency)) {
        entities.currencies.push(currency);
      }
    });

    return entities;
  }

  analyzeSentiment(message) {
    const positiveWords = [
      'good', 'great', 'awesome', 'amazing', 'excellent', 'perfect', 'love',
      'like', 'enjoy', 'happy', 'satisfied', 'impressed', 'wonderful'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'hate', 'dislike', 'problem', 'issue',
      'error', 'bug', 'broken', 'frustrated', 'disappointed', 'confused'
    ];
    
    const neutralWords = [
      'okay', 'fine', 'normal', 'average', 'standard', 'regular'
    ];

    let score = 0;
    const words = message.split(' ');
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });

    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  }

  determineCategory(message, context) {
    const categories = {
      games: ['game', 'play', 'gaming', 'player', 'level', 'character'],
      defi: ['stake', 'staking', 'earn', 'reward', 'apy', 'yield', 'token'],
      marketplace: ['nft', 'buy', 'sell', 'trade', 'marketplace', 'collection'],
      tournaments: ['tournament', 'compete', 'competition', 'prize', 'winner'],
      security: ['safe', 'security', 'risk', 'protect', 'wallet', 'private key'],
      tutorial: ['how', 'tutorial', 'guide', 'learn', 'start', 'begin'],
      technical: ['api', 'sdk', 'develop', 'code', 'integration', 'technical'],
      support: ['help', 'support', 'problem', 'issue', 'contact', 'assistance']
    };

    // Check current page context
    if (context?.currentPage) {
      if (context.currentPage.includes('games')) return 'games';
      if (context.currentPage.includes('marketplace')) return 'marketplace';
      if (context.currentPage.includes('staking')) return 'defi';
      if (context.currentPage.includes('tournaments')) return 'tournaments';
      if (context.currentPage.includes('creator')) return 'technical';
      if (context.currentPage.includes('governance')) return 'governance';
    }

    // Check message content
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return category;
      }
    }

    return 'general';
  }

  detectUrgency(message) {
    const urgentWords = [
      'urgent', 'emergency', 'asap', 'immediately', 'now', 'quick',
      'fast', 'help', 'stuck', 'lost', 'can\'t', 'won\'t', 'broken'
    ];
    
    const hasUrgentWords = urgentWords.some(word => message.includes(word));
    const hasQuestionMarks = (message.match(/\?/g) || []).length > 1;
    const hasExclamation = message.includes('!');
    
    if (hasUrgentWords || hasQuestionMarks || hasExclamation) {
      return 'high';
    }
    
    return 'normal';
  }

  async generateResponse(analysis, context, conversationHistory) {
    const { category, intent, entities, sentiment, urgency } = analysis;
    
    // Get base response template
    const template = this.getResponseTemplate(category, intent);
    
    // Personalize based on context and history
    const personalizedResponse = this.personalizeResponse(template, context, conversationHistory);
    
    // Add dynamic content based on entities
    const enrichedResponse = this.enrichWithEntities(personalizedResponse, entities);
    
    // Adjust tone based on sentiment and urgency
    const tonedResponse = this.adjustTone(enrichedResponse, sentiment, urgency);
    
    return {
      content: tonedResponse,
      template: template.id,
      personalization: true
    };
  }

  getResponseTemplate(category, intent) {
    const templates = this.responseTemplates[category] || this.responseTemplates.general;
    const intentTemplates = templates[intent] || templates.default;
    
    // Select random template for variety
    const randomIndex = Math.floor(Math.random() * intentTemplates.length);
    return intentTemplates[randomIndex];
  }

  personalizeResponse(template, context, conversationHistory) {
    let response = template.content;
    
    // Replace context placeholders
    if (context?.currentSection) {
      response = response.replace('{current_section}', context.currentSection);
    }
    
    // Add user-specific information if available
    if (context?.userLevel) {
      response = response.replace('{user_level}', context.userLevel);
    }
    
    // Reference conversation history for continuity
    if (conversationHistory && conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage && lastMessage.type === 'user') {
        response = response.replace('{previous_topic}', this.extractTopic(lastMessage.content));
      }
    }
    
    return response;
  }

  enrichWithEntities(response, entities) {
    // Add specific game information
    if (entities.games.length > 0) {
      const gameInfo = this.getGameInfo(entities.games[0]);
      response += `\n\n${gameInfo}`;
    }
    
    // Add amount-specific advice
    if (entities.amounts.length > 0) {
      const amount = entities.amounts[0];
      response += `\n\nFor ${amount}, I recommend starting with lower-risk options.`;
    }
    
    return response;
  }

  adjustTone(response, sentiment, urgency) {
    if (urgency === 'high') {
      response = `I understand this is urgent! ${response}`;
    }
    
    if (sentiment === 'negative') {
      response = `I'm sorry you're experiencing difficulties. ${response}`;
    } else if (sentiment === 'positive') {
      response = `I'm glad you're enjoying the platform! ${response}`;
    }
    
    return response;
  }

  generateSuggestions(analysis, context) {
    const { category, entities } = analysis;
    const suggestions = [];
    
    switch (category) {
      case 'games':
        suggestions.push(
          'Show me beginner-friendly games',
          'What are the highest-earning games?',
          'How do I improve my gaming skills?'
        );
        break;
      case 'defi':
        suggestions.push(
          'Explain staking risks and rewards',
          'How to calculate potential earnings?',
          'What are the best staking pools?'
        );
        break;
      case 'marketplace':
        suggestions.push(
          'How to evaluate NFT value?',
          'Show me trending collections',
          'What are the trading fees?'
        );
        break;
      default:
        suggestions.push(
          'Tell me about platform features',
          'How to get started?',
          'Show me earning opportunities'
        );
    }
    
    return suggestions.slice(0, 3);
  }

  generateActions(analysis, context) {
    const { category, intent } = analysis;
    const actions = [];
    
    if (intent === 'navigation' || category === 'games') {
      actions.push({
        id: 'navigate_games',
        label: 'Browse Games',
        action: 'navigate',
        data: { section: 'games' }
      });
    }
    
    if (category === 'defi' || analysis.entities.features.includes('staking')) {
      actions.push({
        id: 'navigate_staking',
        label: 'View Staking',
        action: 'navigate',
        data: { section: 'staking' }
      });
    }
    
    if (category === 'marketplace' || analysis.entities.features.includes('nft')) {
      actions.push({
        id: 'navigate_marketplace',
        label: 'Browse NFTs',
        action: 'navigate',
        data: { section: 'marketplace' }
      });
    }
    
    return actions;
  }

  calculateConfidence(analysis, response) {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence for recognized categories
    if (analysis.category !== 'general') confidence += 0.2;
    
    // Increase confidence for clear intents
    if (analysis.intent !== 'general') confidence += 0.15;
    
    // Increase confidence for entity matches
    const totalEntities = Object.values(analysis.entities).flat().length;
    confidence += Math.min(totalEntities * 0.05, 0.2);
    
    // Decrease confidence for urgent/negative sentiment
    if (analysis.urgency === 'high') confidence -= 0.1;
    if (analysis.sentiment === 'negative') confidence -= 0.05;
    
    return Math.max(0.1, Math.min(1.0, confidence));
  }

  initializeKnowledgeBase() {
    return {
      games: {
        'cyber warriors': {
          category: 'Strategy',
          players: 25000,
          rating: 4.8,
          rewards: '$500/day',
          difficulty: 'Expert',
          description: 'Epic sci-fi strategy game with AI-powered opponents'
        },
        'dragon realm': {
          category: 'RPG',
          players: 18000,
          rating: 4.6,
          rewards: '$300/day',
          difficulty: 'Intermediate',
          description: 'Immersive RPG with blockchain-based character progression'
        },
        'puzzle master': {
          category: 'Puzzle',
          players: 8000,
          rating: 4.5,
          rewards: '$150/day',
          difficulty: 'Beginner',
          description: 'Brain-teasing puzzles with cryptocurrency rewards'
        }
      },
      staking: {
        pools: [
          { name: 'Gaming Token Pool', apy: 25.5, minStake: 100, token: 'AGT' },
          { name: 'NFT Rewards Pool', apy: 18.2, minStake: 50, token: 'NFT' },
          { name: 'Tournament Pool', apy: 35.8, minStake: 200, token: 'TOUR' }
        ]
      },
      platform: {
        totalUsers: 125000,
        totalRewards: 2500000,
        activeGames: 47,
        supportedChains: 15
      }
    };
  }

  initializeContextPatterns() {
    return {
      greeting: /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
      farewell: /^(bye|goodbye|see you|thanks|thank you)/i,
      question: /\?$/,
      urgent: /(urgent|asap|immediately|now|quick)/i,
      positive: /(great|awesome|amazing|excellent|perfect|love)/i,
      negative: /(problem|issue|error|bug|broken|not working)/i
    };
  }

  initializeResponseTemplates() {
    return {
      games: {
        question: [
          {
            id: 'games_info',
            content: "I'd be happy to help you with game information! Our platform features {game_count} games across multiple categories including Strategy, RPG, Action, Puzzle, and Racing. Each game offers unique rewards and gameplay experiences."
          }
        ],
        recommendation: [
          {
            id: 'games_recommend',
            content: "Based on your interests, I recommend checking out our top-rated games. For beginners, Puzzle Master and Dragon Realm are excellent starting points with good tutorials and steady rewards."
          }
        ],
        default: [
          {
            id: 'games_general',
            content: "Our gaming ecosystem offers diverse experiences with real rewards. Whether you prefer strategy, action, or puzzle games, there's something for everyone. What type of games interest you most?"
          }
        ]
      },
      defi: {
        question: [
          {
            id: 'defi_info',
            content: "DeFi features on our platform include staking pools with APYs ranging from 12% to 35%, yield farming opportunities, and governance participation. All smart contracts are audited for security."
          }
        ],
        tutorial: [
          {
            id: 'defi_tutorial',
            content: "Getting started with DeFi is easy! First, connect your wallet, then explore our staking pools. Start with smaller amounts to familiarize yourself with the process. I can guide you through each step."
          }
        ],
        default: [
          {
            id: 'defi_general',
            content: "Our DeFi ecosystem provides multiple ways to earn passive income through staking, liquidity provision, and governance participation. Safety and transparency are our top priorities."
          }
        ]
      },
      security: {
        question: [
          {
            id: 'security_info',
            content: "Security is paramount in DeFi. Always use hardware wallets for large amounts, never share private keys, enable 2FA, and verify smart contract addresses. Our platform uses audited contracts and multi-signature security."
          }
        ],
        default: [
          {
            id: 'security_general',
            content: "We prioritize your security with audited smart contracts, insurance funds, and comprehensive safety guidelines. Remember: your security starts with good personal practices."
          }
        ]
      },
      general: {
        greeting: [
          {
            id: 'greeting',
            content: "Hello! I'm your AI Gaming assistant. I'm here to help you navigate our platform, understand DeFi features, find the best games, and maximize your earnings. What would you like to know?"
          }
        ],
        default: [
          {
            id: 'general_help',
            content: "I can help you with games, DeFi features, platform navigation, security tips, and earning strategies. What specific area would you like to explore?"
          }
        ]
      }
    };
  }

  getGameInfo(gameName) {
    const game = this.knowledgeBase.games[gameName.toLowerCase()];
    if (game) {
      return `**${gameName}** - ${game.description}\n• Players: ${game.players.toLocaleString()}\n• Rating: ${game.rating}/5\n• Daily Rewards: ${game.rewards}\n• Difficulty: ${game.difficulty}`;
    }
    return `I don't have specific information about "${gameName}" in my database. Would you like me to show you our featured games instead?`;
  }

  extractTopic(message) {
    const topics = ['games', 'staking', 'nft', 'tournament', 'marketplace', 'security'];
    for (const topic of topics) {
      if (message.toLowerCase().includes(topic)) {
        return topic;
      }
    }
    return 'general platform features';
  }
}