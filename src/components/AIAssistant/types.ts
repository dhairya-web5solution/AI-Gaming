export interface BaseMessage {
  id: string;
  timestamp: Date;
}

export interface UserMessage extends BaseMessage {
  type: 'user';
  content: string;
}

export interface AIMessage extends BaseMessage {
  type: 'ai';
  content: string;
  confidence: number;
  context?: string;
  suggestions?: string[];
  actions?: MessageAction[];
}

export interface SystemMessage extends BaseMessage {
  type: 'system';
  content: string;
  level: 'info' | 'warning' | 'error';
}

export interface MessageAction {
  id: string;
  label: string;
  action: string;
  data?: any;
}

export interface WebSocketMessage {
  message: string;
  context: {
    currentPage: string;
    pageContent: any;
    relevantContent: any;
    timestamp: string;
    sessionId: string;
    userAgent: string;
  };
  conversationHistory: (AIMessage | UserMessage | SystemMessage)[];
}

export interface ContextData {
  pageTitle: string;
  currentSection: string;
  visibleContent: string[];
  userActions: string[];
  gameData?: any;
  marketplaceData?: any;
  stakingData?: any;
}