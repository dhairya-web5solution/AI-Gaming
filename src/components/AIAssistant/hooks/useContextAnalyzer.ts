import { useCallback } from 'react';
import { ContextData } from '../types';

export function useContextAnalyzer() {
  const analyzeCurrentContext = useCallback((): ContextData => {
    const currentPath = window.location.pathname;
    const pageTitle = document.title;
    
    // Get current section based on URL or scroll position
    const getCurrentSection = () => {
      if (currentPath.includes('/about')) return 'about';
      if (currentPath.includes('/creator-hub')) return 'creator-hub';
      if (currentPath.includes('/governance')) return 'governance';
      if (currentPath.includes('/referral')) return 'referral';
      if (currentPath.includes('/landing')) return 'landing';
      
      // For main page, detect section by scroll position
      const sections = ['hero', 'games', 'marketplace', 'staking', 'tournaments', 'analytics'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            return section;
          }
        }
      }
      return 'home';
    };

    // Extract visible content from the current section
    const getVisibleContent = () => {
      const content: string[] = [];
      
      // Get headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          content.push(heading.textContent || '');
        }
      });
      
      // Get visible text content
      const textElements = document.querySelectorAll('p, span, div');
      textElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight && element.textContent) {
          const text = element.textContent.trim();
          if (text.length > 20 && text.length < 200) {
            content.push(text);
          }
        }
      });
      
      return content.slice(0, 10); // Limit to prevent too much data
    };

    // Track user actions
    const getUserActions = () => {
      const actions = JSON.parse(sessionStorage.getItem('user-actions') || '[]');
      return actions.slice(-5); // Last 5 actions
    };

    // Extract game data if on games section
    const getGameData = () => {
      const currentSection = getCurrentSection();
      if (currentSection === 'games') {
        const gameCards = document.querySelectorAll('[data-game-id]');
        return Array.from(gameCards).map(card => ({
          id: card.getAttribute('data-game-id'),
          title: card.querySelector('h3')?.textContent,
          category: card.querySelector('[data-category]')?.textContent,
          players: card.querySelector('[data-players]')?.textContent,
          rating: card.querySelector('[data-rating]')?.textContent
        }));
      }
      return null;
    };

    // Extract marketplace data if on marketplace section
    const getMarketplaceData = () => {
      const currentSection = getCurrentSection();
      if (currentSection === 'marketplace') {
        const nftCards = document.querySelectorAll('[data-nft-id]');
        return Array.from(nftCards).map(card => ({
          id: card.getAttribute('data-nft-id'),
          name: card.querySelector('h3')?.textContent,
          price: card.querySelector('[data-price]')?.textContent,
          rarity: card.querySelector('[data-rarity]')?.textContent
        }));
      }
      return null;
    };

    // Extract staking data if on staking section
    const getStakingData = () => {
      const currentSection = getCurrentSection();
      if (currentSection === 'staking') {
        const stakingPools = document.querySelectorAll('[data-pool-id]');
        return Array.from(stakingPools).map(pool => ({
          id: pool.getAttribute('data-pool-id'),
          name: pool.querySelector('h3')?.textContent,
          apy: pool.querySelector('[data-apy]')?.textContent,
          totalStaked: pool.querySelector('[data-total-staked]')?.textContent
        }));
      }
      return null;
    };

    return {
      pageTitle,
      currentSection: getCurrentSection(),
      visibleContent: getVisibleContent(),
      userActions: getUserActions(),
      gameData: getGameData(),
      marketplaceData: getMarketplaceData(),
      stakingData: getStakingData()
    };
  }, []);

  const getRelevantContent = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    const relevantContent: any = {};

    // Game-related content
    if (lowerQuery.includes('game') || lowerQuery.includes('play')) {
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        relevantContent.games = {
          totalGames: gamesSection.querySelectorAll('[data-game-id]').length,
          categories: Array.from(gamesSection.querySelectorAll('[data-category]')).map(el => el.textContent),
          topRated: Array.from(gamesSection.querySelectorAll('[data-rating]')).map(el => el.textContent)
        };
      }
    }

    // Staking-related content
    if (lowerQuery.includes('stak') || lowerQuery.includes('earn') || lowerQuery.includes('apy')) {
      const stakingSection = document.getElementById('staking');
      if (stakingSection) {
        relevantContent.staking = {
          totalPools: stakingSection.querySelectorAll('[data-pool-id]').length,
          apyRanges: Array.from(stakingSection.querySelectorAll('[data-apy]')).map(el => el.textContent),
          totalValueLocked: stakingSection.querySelector('[data-tvl]')?.textContent
        };
      }
    }

    // Tournament-related content
    if (lowerQuery.includes('tournament') || lowerQuery.includes('compete') || lowerQuery.includes('prize')) {
      const tournamentsSection = document.getElementById('tournaments');
      if (tournamentsSection) {
        relevantContent.tournaments = {
          activeTournaments: tournamentsSection.querySelectorAll('[data-tournament-status="active"]').length,
          totalPrizePool: Array.from(tournamentsSection.querySelectorAll('[data-prize-pool]')).map(el => el.textContent),
          upcomingTournaments: tournamentsSection.querySelectorAll('[data-tournament-status="upcoming"]').length
        };
      }
    }

    // Marketplace-related content
    if (lowerQuery.includes('nft') || lowerQuery.includes('marketplace') || lowerQuery.includes('trade')) {
      const marketplaceSection = document.getElementById('marketplace');
      if (marketplaceSection) {
        relevantContent.marketplace = {
          totalItems: marketplaceSection.querySelectorAll('[data-nft-id]').length,
          priceRanges: Array.from(marketplaceSection.querySelectorAll('[data-price]')).map(el => el.textContent),
          rarities: Array.from(marketplaceSection.querySelectorAll('[data-rarity]')).map(el => el.textContent)
        };
      }
    }

    return relevantContent;
  }, []);

  // Track user actions for context
  const trackUserAction = useCallback((action: string, data?: any) => {
    const actions = JSON.parse(sessionStorage.getItem('user-actions') || '[]');
    actions.push({
      action,
      data,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
    
    // Keep only last 20 actions
    if (actions.length > 20) {
      actions.splice(0, actions.length - 20);
    }
    
    sessionStorage.setItem('user-actions', JSON.stringify(actions));
  }, []);

  return {
    analyzeCurrentContext,
    getRelevantContent,
    trackUserAction
  };
}