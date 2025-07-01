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

// Declare ethereum type for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            
            // Get network information
            const chainId = await window.ethereum.request({
              method: 'eth_chainId',
            });

            console.log('Connected to MetaMask:', { address, chainId });

            // Create user object with real wallet address
            const mockUser: User = {
              id: 'user_' + Date.now(),
              address: address,
              username: 'Player' + Math.floor(Math.random() * 10000),
              level: Math.floor(Math.random() * 5) + 1,
              xp: Math.floor(Math.random() * 2000) + 500,
              isOnboarded: Math.random() > 0.5,
              walletConnected: true,
              balances: {
                AGT: Math.floor(Math.random() * 2000) + 500,
                NFT: Math.floor(Math.random() * 100) + 20,
                TOUR: Math.floor(Math.random() * 50) + 10,
                GOV: Math.floor(Math.random() * 200) + 50,
                ETH: Math.random() * 2 + 0.1
              },
              stats: {
                gamesPlayed: Math.floor(Math.random() * 100) + 10,
                totalEarnings: Math.floor(Math.random() * 1000) + 100,
                winRate: Math.floor(Math.random() * 40) + 50,
                rank: Math.floor(Math.random() * 10000) + 1000
              }
            };
            
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('walletAddress', address);

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
              if (accounts.length === 0) {
                // User disconnected wallet
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('walletAddress');
              } else {
                // User switched accounts
                const newAddress = accounts[0];
                if (mockUser) {
                  const updatedUser = { ...mockUser, address: newAddress };
                  setUser(updatedUser);
                  localStorage.setItem('user', JSON.stringify(updatedUser));
                  localStorage.setItem('walletAddress', newAddress);
                }
              }
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', (chainId: string) => {
              console.log('Chain changed to:', chainId);
              // Optionally reload the page or update UI
            });

          } else {
            throw new Error('No accounts found');
          }
        } catch (error: any) {
          if (error.code === 4001) {
            // User rejected the request
            throw new Error('Please connect to MetaMask to continue');
          } else {
            throw new Error('Failed to connect to MetaMask: ' + error.message);
          }
        }
      } else {
        // MetaMask is not installed
        alert('MetaMask is not installed. Please install MetaMask to connect your wallet.\n\nVisit: https://metamask.io/download/');
        window.open('https://metamask.io/download/', '_blank');
        throw new Error('MetaMask not installed');
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      alert(error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true, xp: user.xp + 100 };
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
    const savedAddress = localStorage.getItem('walletAddress');
    
    if (savedUser && savedAddress) {
      const parsedUser = JSON.parse(savedUser);
      // Verify the wallet is still connected
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
              setUser(parsedUser);
            } else {
              // Wallet disconnected, clear saved data
              localStorage.removeItem('user');
              localStorage.removeItem('walletAddress');
            }
          })
          .catch(() => {
            // Error checking accounts, clear saved data
            localStorage.removeItem('user');
            localStorage.removeItem('walletAddress');
          });
      }
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