export class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.maxSessions = 10000;
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    this.cleanupInterval = 5 * 60 * 1000; // 5 minutes
    
    // Start cleanup process
    this.startCleanup();
  }

  getSession(sessionId) {
    let session = this.sessions.get(sessionId);
    
    if (!session) {
      session = this.createSession(sessionId);
      this.sessions.set(sessionId, session);
    } else {
      session.updateActivity();
    }
    
    return session;
  }

  createSession(sessionId) {
    // If we're at max capacity, remove oldest session
    if (this.sessions.size >= this.maxSessions) {
      this.removeOldestSession();
    }

    return new Session(sessionId);
  }

  removeSession(sessionId) {
    return this.sessions.delete(sessionId);
  }

  removeOldestSession() {
    let oldestSession = null;
    let oldestTime = Date.now();

    for (const [sessionId, session] of this.sessions) {
      if (session.lastActivity < oldestTime) {
        oldestTime = session.lastActivity;
        oldestSession = sessionId;
      }
    }

    if (oldestSession) {
      this.sessions.delete(oldestSession);
    }
  }

  startCleanup() {
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, this.cleanupInterval);
  }

  cleanupExpiredSessions() {
    const now = Date.now();
    const expiredSessions = [];

    for (const [sessionId, session] of this.sessions) {
      if (now - session.lastActivity > this.sessionTimeout) {
        expiredSessions.push(sessionId);
      }
    }

    expiredSessions.forEach(sessionId => {
      this.sessions.delete(sessionId);
    });

    if (expiredSessions.length > 0) {
      console.log(`Cleaned up ${expiredSessions.length} expired sessions`);
    }
  }

  getSessionCount() {
    return this.sessions.size;
  }

  getSessionStats() {
    const now = Date.now();
    let activeCount = 0;
    let totalMessages = 0;

    for (const session of this.sessions.values()) {
      if (now - session.lastActivity < 5 * 60 * 1000) { // Active in last 5 minutes
        activeCount++;
      }
      totalMessages += session.messageCount;
    }

    return {
      totalSessions: this.sessions.size,
      activeSessions: activeCount,
      totalMessages,
      averageMessagesPerSession: totalMessages / this.sessions.size || 0
    };
  }
}

class Session {
  constructor(id) {
    this.id = id;
    this.createdAt = Date.now();
    this.lastActivity = Date.now();
    this.messageHistory = [];
    this.messageCount = 0;
    this.userPreferences = {};
    this.context = {};
    this.maxHistoryLength = 50;
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }

  addMessage(type, content, metadata = {}) {
    const message = {
      id: `${this.id}_${this.messageCount}`,
      type,
      content,
      timestamp: new Date(),
      metadata
    };

    this.messageHistory.push(message);
    this.messageCount++;
    this.updateActivity();

    // Trim history if it gets too long
    if (this.messageHistory.length > this.maxHistoryLength) {
      this.messageHistory = this.messageHistory.slice(-this.maxHistoryLength);
    }

    return message;
  }

  getHistory(limit = 10) {
    return this.messageHistory.slice(-limit);
  }

  getFullHistory() {
    return [...this.messageHistory];
  }

  setPreference(key, value) {
    this.userPreferences[key] = value;
    this.updateActivity();
  }

  getPreference(key, defaultValue = null) {
    return this.userPreferences[key] || defaultValue;
  }

  setContext(key, value) {
    this.context[key] = value;
    this.updateActivity();
  }

  getContext(key, defaultValue = null) {
    return this.context[key] || defaultValue;
  }

  clearHistory() {
    this.messageHistory = [];
    this.messageCount = 0;
    this.updateActivity();
  }

  getSessionDuration() {
    return Date.now() - this.createdAt;
  }

  isActive(timeoutMs = 5 * 60 * 1000) {
    return Date.now() - this.lastActivity < timeoutMs;
  }

  getStats() {
    return {
      id: this.id,
      createdAt: new Date(this.createdAt),
      lastActivity: new Date(this.lastActivity),
      messageCount: this.messageCount,
      duration: this.getSessionDuration(),
      isActive: this.isActive(),
      historyLength: this.messageHistory.length
    };
  }
}