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
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  phone?: string;
  avatar?: string;
  authProvider?: 'email' | 'google' | 'discord';
  googleId?: string;
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
  loginWithGoogle: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  updateProfile?: (profileData: Partial<User>) => Promise<void>;
  completeOnboarding: () => void;
  updateBalance: (token: string, amount: number) => void;
  updateStats: (stats: Partial<User['stats']>) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  googleAvailable: boolean;
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

// Declare ethereum and google types for TypeScript
declare global {
  interface Window {
    ethereum?: any;
    google?: any;
    gapi?: any;
  }
}

// For demo purposes - in production, replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const [googleInitialized, setGoogleInitialized] = useState(false);

  // Initialize Google OAuth
  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        // Check if we have a valid Google Client ID
        if (GOOGLE_CLIENT_ID === 'demo-client-id' || !GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com')) {
          console.warn('Demo mode: Google OAuth not configured with valid client ID');
          setGoogleAvailable(false);
          setGoogleInitialized(true);
          return;
        }

        // Load Google Identity Services script
        if (!window.google) {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => {
              console.error('Failed to load Google Identity Services');
              setGoogleAvailable(false);
              setGoogleInitialized(true);
              reject(new Error('Failed to load Google script'));
            };
            setTimeout(() => {
              setGoogleAvailable(false);
              setGoogleInitialized(true);
              reject(new Error('Google script load timeout'));
            }, 10000);
          });
        }

        // Wait for the script to fully initialize
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Initialize Google OAuth
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          setGoogleAvailable(true);
          console.log('Google OAuth initialized successfully');
        } else {
          console.error('Google accounts API not available');
          setGoogleAvailable(false);
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
        setGoogleAvailable(false);
      } finally {
        setGoogleInitialized(true);
      }
    };

    initializeGoogleAuth();
  }, []);

  // Mock API calls for development
  const mockApiCall = async (endpoint: string, options: RequestInit = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : null;

    // Mock user database
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    switch (endpoint) {
      case '/auth/login':
        const loginUser = users.find((u: any) => 
          u.email === body.email && u.password === body.password
        );
        if (!loginUser) {
          throw new Error('Invalid email or password');
        }
        const { password: _, ...userWithoutPassword } = loginUser;
        return {
          user: userWithoutPassword,
          token: `mock-jwt-token-${Date.now()}`,
          refreshToken: `mock-refresh-token-${Date.now()}`
        };

      case '/auth/register':
        const existingUser = users.find((u: any) => 
          u.email === body.email || u.username === body.username
        );
        if (existingUser) {
          throw new Error('User with this email or username already exists');
        }
        
        const newUser = {
          id: `user_${Date.now()}`,
          username: body.username,
          email: body.email,
          password: body.password,
          authProvider: 'email',
          level: 1,
          xp: 0,
          isOnboarded: false,
          walletConnected: false,
          bio: '',
          location: '',
          website: '',
          twitter: '',
          github: '',
          phone: '',
          avatar: '',
          balances: { AGT: 100, NFT: 0, TOUR: 0, GOV: 0, ETH: 0 },
          stats: { gamesPlayed: 0, totalEarnings: 0, winRate: 0, rank: 999999 },
          createdAt: new Date(),
          lastLogin: new Date()
        };
        
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        const { password: __, ...newUserWithoutPassword } = newUser;
        return {
          user: newUserWithoutPassword,
          token: `mock-jwt-token-${Date.now()}`,
          refreshToken: `mock-refresh-token-${Date.now()}`
        };

      case '/auth/google':
        const googleUser = users.find((u: any) => u.googleId === body.googleId);
        if (googleUser) {
          // Login existing Google user
          googleUser.lastLogin = new Date();
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          const { password: ___, ...existingGoogleUser } = googleUser;
          return {
            user: existingGoogleUser,
            token: `mock-jwt-token-${Date.now()}`,
            refreshToken: `mock-refresh-token-${Date.now()}`
          };
        } else {
          // Register new Google user
          const newGoogleUser = {
            id: `user_${Date.now()}`,
            username: body.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
            email: body.email,
            googleId: body.googleId,
            authProvider: 'google',
            avatar: body.picture,
            level: 1,
            xp: 0,
            isOnboarded: false,
            walletConnected: false,
            bio: '',
            location: '',
            website: '',
            twitter: '',
            github: '',
            phone: '',
            balances: { AGT: 100, NFT: 0, TOUR: 0, GOV: 0, ETH: 0 },
            stats: { gamesPlayed: 0, totalEarnings: 0, winRate: 0, rank: 999999 },
            createdAt: new Date(),
            lastLogin: new Date()
          };
          
          users.push(newGoogleUser);
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          
          return {
            user: newGoogleUser,
            token: `mock-jwt-token-${Date.now()}`,
            refreshToken: `mock-refresh-token-${Date.now()}`
          };
        }

      case '/auth/refresh':
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No refresh token');
        }
        return {
          token: `mock-jwt-token-${Date.now()}`,
          refreshToken: `mock-refresh-token-${Date.now()}`
        };

      case '/auth/me':
        const currentToken = localStorage.getItem('authToken');
        if (!currentToken) {
          throw new Error('Not authenticated');
        }
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
          throw new Error('User not found');
        }
        return { user: currentUser };

      default:
        throw new Error('Endpoint not found');
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      setIsLoading(true);
      
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const googleUserData = {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        email_verified: payload.email_verified
      };

      const authResponse = await mockApiCall('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleUserData),
      });

      const userData = {
        ...authResponse.user,
        createdAt: new Date(authResponse.user.createdAt),
        lastLogin: new Date()
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('authToken', authResponse.token);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      
      console.log('Google authentication successful');
    } catch (error: any) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockApiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const userData = {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
        lastLogin: new Date()
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockApiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      const userData = {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
        lastLogin: new Date()
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      if (!googleInitialized) {
        throw new Error('Google authentication is still initializing. Please wait a moment and try again.');
      }

      if (!googleAvailable) {
        // Demo mode fallback
        const demoGoogleUser = {
          googleId: 'demo-google-id-' + Date.now(),
          email: 'demo.user@gmail.com',
          name: 'Demo Google User',
          picture: '',
          email_verified: true
        };

        const authResponse = await mockApiCall('/auth/google', {
          method: 'POST',
          body: JSON.stringify(demoGoogleUser),
        });

        const userData = {
          ...authResponse.user,
          createdAt: new Date(authResponse.user.createdAt),
          lastLogin: new Date()
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('authToken', authResponse.token);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        return;
      }

      if (!window.google || !window.google.accounts) {
        throw new Error('Google Sign-In is not available. Please check your internet connection and try again.');
      }
      
      // Try to trigger Google Sign-In popup
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to renderButton if prompt doesn't work
          showGoogleSignInButton();
        }
      });
    } catch (error: any) {
      console.error('Google login failed:', error);
      throw new Error(error.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showGoogleSignInButton = () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    `;

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: #1f2937;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-width: 400px;
      width: 90%;
      text-align: center;
      position: relative;
      border: 1px solid #374151;
    `;

    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Continue with Google';
    title.style.cssText = `
      margin: 0 0 24px 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Add subtitle
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Sign in to your account or create a new one';
    subtitle.style.cssText = `
      margin: 0 0 32px 0;
      color: #9ca3af;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      margin: 24px 0;
      display: flex;
      justify-content: center;
    `;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 16px;
      right: 20px;
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #9ca3af;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeButton.onmouseover = () => {
      closeButton.style.backgroundColor = '#374151';
      closeButton.style.color = '#ffffff';
    };
    closeButton.onmouseout = () => {
      closeButton.style.backgroundColor = 'transparent';
      closeButton.style.color = '#9ca3af';
    };
    closeButton.onclick = () => {
      document.body.removeChild(overlay);
      setIsLoading(false);
    };

    modal.appendChild(closeButton);
    modal.appendChild(title);
    modal.appendChild(subtitle);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Render Google button
    if (window.google && window.google.accounts) {
      window.google.accounts.id.renderButton(buttonContainer, {
        theme: 'filled_blue',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: 280,
        logo_alignment: 'left'
      });
    }

    // Close on overlay click
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        setIsLoading(false);
      }
    };
  };

  const signupWithGoogle = async () => {
    // Same as login for Google OAuth (registration happens automatically)
    return loginWithGoogle();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('walletAddress');
    
    // Disconnect wallet if connected
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }

    // Sign out from Google
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const refreshToken = async () => {
    try {
      const response = await mockApiCall('/auth/refresh', {
        method: 'POST',
      });
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.token;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // In production, this would be a real API call
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update in mock database
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...profileData };
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    if (!user) {
      throw new Error('Please login first to connect your wallet');
    }

    setIsLoading(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            
            const chainId = await window.ethereum.request({
              method: 'eth_chainId',
            });

            const balance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest'],
            });

            const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);

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

            window.ethereum.on('accountsChanged', (accounts: string[]) => {
              if (accounts.length === 0) {
                disconnectWallet();
              } else {
                const newAddress = accounts[0];
                const updatedUserWithNewAddress = { ...updatedUser, address: newAddress };
                setUser(updatedUserWithNewAddress);
                localStorage.setItem('currentUser', JSON.stringify(updatedUserWithNewAddress));
                localStorage.setItem('walletAddress', newAddress);
              }
            });

            window.ethereum.on('chainChanged', (chainId: string) => {
              console.log('Chain changed to:', chainId);
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

  // Auto-login on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('currentUser');
      const authToken = localStorage.getItem('authToken');
      
      if (savedUser && authToken) {
        try {
          // Verify token is still valid
          const response = await mockApiCall('/auth/me');
          const userData = {
            ...response.user,
            createdAt: new Date(response.user.createdAt),
            lastLogin: new Date(response.user.lastLogin)
          };
          
          setUser(userData);
          setIsAuthenticated(true);

          // Check wallet connection
          if (userData.walletConnected && typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              if (accounts.length === 0 || !userData.address) {
                disconnectWallet();
              }
            } catch (error) {
              disconnectWallet();
            }
          }
        } catch (error) {
          // Token expired or invalid, try to refresh
          try {
            await refreshToken();
            const parsedUser = JSON.parse(savedUser);
            parsedUser.createdAt = new Date(parsedUser.createdAt);
            parsedUser.lastLogin = new Date(parsedUser.lastLogin);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (refreshError) {
            logout();
          }
        }
      }
    };

    initializeAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    }, 50 * 60 * 1000); // Refresh every 50 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      login,
      loginWithGoogle,
      signup,
      signupWithGoogle,
      logout,
      connectWallet,
      disconnectWallet,
      updateProfile,
      completeOnboarding,
      updateBalance,
      updateStats,
      isLoading,
      isAuthenticated,
      googleAvailable
    }}>
      {children}
    </UserContext.Provider>
  );
};