import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  address: string;
  username: string;
  level: number;
  xp: number;
  isOnboarded: boolean;
  walletConnected: boolean;
  balances: {
    AGT: number;
    NFT: number;
    TOUR: number;
    GOV: number;
    ETH: number;
  };
  stats: {
    gamesPlayed: number;
    totalEarnings: number;
    winRate: number;
    rank: number;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  connectWallet: () => Promise<void>;
  completeOnboarding: () => void;
  updateBalance: (token: string, amount: number) => void;
  updateStats: (stats: Partial<User['stats']>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser: User = {
        id: 'user_' + Date.now(),
        address: '0x' + Math.random().toString(16).substr(2, 40),
        username: 'Player' + Math.floor(Math.random() * 10000),
        level: 1,
        xp: 0,
        isOnboarded: false,
        walletConnected: true,
        balances: {
          AGT: 1000,
          NFT: 50,
          TOUR: 25,
          GOV: 100,
          ETH: 0.5
        },
        stats: {
          gamesPlayed: 0,
          totalEarnings: 0,
          winRate: 0,
          rank: 999999
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true, xp: 100 };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateBalance = (token: string, amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balances: {
          ...user.balances,
          [token]: Math.max(0, user.balances[token as keyof typeof user.balances] + amount)
        }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateStats = (newStats: Partial<User['stats']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        stats: { ...user.stats, ...newStats }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      connectWallet,
      completeOnboarding,
      updateBalance,
      updateStats,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};