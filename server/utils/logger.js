export class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.logLevels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  log(event, data = {}) {
    this.info(`[${event}]`, data);
  }

  error(message, error = null) {
    if (this.shouldLog('error')) {
      const logData = {
        level: 'error',
        message,
        timestamp: new Date().toISOString(),
        error: error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : null
      };
      
      console.error(JSON.stringify(logData, null, 2));
    }
  }

  warn(message, data = {}) {
    if (this.shouldLog('warn')) {
      const logData = {
        level: 'warn',
        message,
        data,
        timestamp: new Date().toISOString()
      };
      
      console.warn(JSON.stringify(logData, null, 2));
    }
  }

  info(message, data = {}) {
    if (this.shouldLog('info')) {
      const logData = {
        level: 'info',
        message,
        data,
        timestamp: new Date().toISOString()
      };
      
      console.log(JSON.stringify(logData, null, 2));
    }
  }

  debug(message, data = {}) {
    if (this.shouldLog('debug')) {
      const logData = {
        level: 'debug',
        message,
        data,
        timestamp: new Date().toISOString()
      };
      
      console.debug(JSON.stringify(logData, null, 2));
    }
  }

  shouldLog(level) {
    return this.logLevels[level] <= this.logLevels[this.logLevel];
  }

  setLogLevel(level) {
    if (this.logLevels.hasOwnProperty(level)) {
      this.logLevel = level;
    }
  }
}