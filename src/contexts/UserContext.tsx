import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  address?: string; // Optional - only set when wallet is connected
  username: string;
  email: string;
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
  createdAt: Date;
  lastLogin: Date;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  completeOnboarding: () => void;
  updateBalance: (token: string, amount: number) => void;
  updateStats: (stats: Partial<User['stats']>) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user database (in production, this would be a real backend)
  const getUsersFromStorage = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveUsersToStorage = (users: any[]) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const users = getUsersFromStorage();
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const loggedInUser = {
          ...userWithoutPassword,
          lastLogin: new Date(),
          createdAt: new Date(userWithoutPassword.createdAt)
        };
        
        setUser(loggedInUser);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const users = getUsersFromStorage();
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email || u.username === username);
      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Create new user
      const newUser: User = {
        id: 'user_' + Date.now(),
        username,
        email,
        level: 1,
        xp: 0,
        isOnboarded: false,
        walletConnected: false,
        balances: {
          AGT: 100, // Welcome bonus
          NFT: 0,
          TOUR: 0,
          GOV: 0,
          ETH: 0
        },
        stats: {
          gamesPlayed: 0,
          totalEarnings: 0,
          winRate: 0,
          rank: 999999
        },
        createdAt: new Date(),
        lastLogin: new Date()
      };

      // Save to mock database
      const userWithPassword = { ...newUser, password };
      users.push(userWithPassword);
      saveUsersToStorage(users);

      // Set current user (without password)
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('walletAddress');
    
    // Disconnect wallet if connected
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  };

  const connectWallet = async () => {
    if (!user) {
      throw new Error('Please login first to connect your wallet');
    }

    setIsLoading(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access directly - this will open MetaMask popup
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            
            // Get network information
            const chainId = await window.ethereum.request({
              method: 'eth_chainId',
            });

            // Get balance
            const balance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest'],
            });

            // Convert balance from wei to ETH
            const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);

            console.log('Successfully connected to MetaMask:', { 
              address, 
              chainId, 
              balance: ethBalance.toFixed(4) + ' ETH' 
            });

            // Update user with wallet info
            const updatedUser = {
              ...user,
              address: address,
              walletConnected: true,
              balances: {
                ...user.balances,
                ETH: parseFloat(ethBalance.toFixed(4))
              }
            };
            
            setUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('walletAddress', address);

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
              if (accounts.length === 0) {
                // User disconnected wallet
                disconnectWallet();
              } else {
                // User switched accounts
                const newAddress = accounts[0];
                const updatedUserWithNewAddress = { ...updatedUser, address: newAddress };
                setUser(updatedUserWithNewAddress);
                localStorage.setItem('currentUser', JSON.stringify(updatedUserWithNewAddress));
                localStorage.setItem('walletAddress', newAddress);
              }
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', (chainId: string) => {
              console.log('Chain changed to:', chainId);
              // Optionally reload the page or update UI based on new chain
            });

          } else {
            throw new Error('No accounts found. Please unlock MetaMask and try again.');
          }
        } catch (error: any) {
          if (error.code === 4001) {
            throw new Error('Connection rejected. Please approve the connection in MetaMask to continue.');
          } else if (error.code === -32002) {
            throw new Error('MetaMask is already processing a request. Please check MetaMask and try again.');
          } else {
            throw new Error('Failed to connect to MetaMask: ' + error.message);
          }
        }
      } else {
        // MetaMask is not installed - provide clear instructions
        throw new Error('MetaMask wallet not detected. Please install MetaMask browser extension first.');
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    if (user) {
      const updatedUser = {
        ...user,
        address: undefined,
        walletConnected: false,
        balances: {
          ...user.balances,
          ETH: 0
        }
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.removeItem('walletAddress');
    }

    // Remove event listeners
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true, xp: user.xp + 100 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const updateStats = (newStats: Partial<User['stats']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        stats: { ...user.stats, ...newStats }
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authToken');
    
    if (savedUser && authToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        parsedUser.lastLogin = new Date(parsedUser.lastLogin);
        setUser(parsedUser);
        setIsAuthenticated(true);

        // If user had a wallet connected, verify it's still connected
        if (parsedUser.walletConnected && typeof window.ethereum !== 'undefined') {
          window.ethereum.request({ method: 'eth_accounts' })
            .then((accounts: string[]) => {
              if (accounts.length === 0 || !parsedUser.address) {
                // Wallet disconnected, update user state
                disconnectWallet();
              }
            })
            .catch(() => {
              // Error checking accounts, disconnect wallet
              disconnectWallet();
            });
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      login,
      signup,
      logout,
      connectWallet,
      disconnectWallet,
      completeOnboarding,
      updateBalance,
      updateStats,
      isLoading,
      isAuthenticated
    }}>
      {children}
    </UserContext.Provider>
  );
};