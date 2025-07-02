import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Mock database - replace with real database in production
let users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';

// Helper functions
const generateTokens = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { token, refreshToken };
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Auth Controllers
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = users.find(user => 
      user.email === email || user.username === username
    );

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? 'User with this email already exists' 
          : 'Username already taken'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
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

    users.push(newUser);

    // Generate tokens
    const { token, refreshToken } = generateTokens(newUser.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate tokens
    const { token, refreshToken } = generateTokens(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, picture, email_verified } = req.body;

    if (!googleId || !email || !email_verified) {
      return res.status(400).json({ message: 'Invalid Google authentication data' });
    }

    // Check if user exists with Google ID
    let user = users.find(u => u.googleId === googleId);

    if (user) {
      // Existing Google user - login
      user.lastLogin = new Date();
    } else {
      // Check if user exists with same email but different auth provider
      const existingEmailUser = users.find(u => u.email === email);
      if (existingEmailUser) {
        return res.status(400).json({ 
          message: 'An account with this email already exists. Please login with your email and password.' 
        });
      }

      // Create new Google user
      user = {
        id: uuidv4(),
        username: name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
        email,
        googleId,
        authProvider: 'google',
        avatar: picture,
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

      users.push(user);
    }

    // Generate tokens
    const { token, refreshToken } = generateTokens(user.id);

    // Remove sensitive data from response
    const { password, ...userWithoutPassword } = user;

    res.json({
      message: user.createdAt === user.lastLogin ? 'Account created successfully' : 'Login successful',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const tokens = generateTokens(user.id);

    res.json({
      message: 'Token refreshed successfully',
      ...tokens
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    const allowedUpdates = ['username', 'bio', 'location', 'website', 'twitter', 'github', 'phone', 'avatar'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    users[userIndex] = { ...users[userIndex], ...updates };

    // Remove password from response
    const { password, ...userWithoutPassword } = users[userIndex];

    res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    // In a real implementation, you would invalidate the refresh token
    // For now, we'll just send a success response
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};