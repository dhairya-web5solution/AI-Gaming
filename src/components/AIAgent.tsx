import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Bot, Lightbulb, TrendingUp, Shield, Gamepad2 } from 'lucide-react';
import { AIAssistant } from './AIAssistant';

interface AIAgentProps {
  onClose: () => void;
}

export default function AIAgent({ onClose }: AIAgentProps) {
  const [showAssistant, setShowAssistant] = useState(true);

  // Handle AI suggestion clicks
  useEffect(() => {
    const handleSuggestionClick = (event: CustomEvent) => {
      console.log('AI Suggestion clicked:', event.detail);
      // Handle suggestion click - could auto-fill input or trigger actions
    };

    const handleActionClick = (event: CustomEvent) => {
      console.log('AI Action clicked:', event.detail);
      const action = event.detail;
      
      if (action.action === 'navigate' && action.data?.section) {
        // Navigate to section
        const element = document.getElementById(action.data.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('ai-suggestion-click', handleSuggestionClick as EventListener);
    window.addEventListener('ai-action-click', handleActionClick as EventListener);

    return () => {
      window.removeEventListener('ai-suggestion-click', handleSuggestionClick as EventListener);
      window.removeEventListener('ai-action-click', handleActionClick as EventListener);
    };
  }, []);

  const handleClose = () => {
    setShowAssistant(false);
    onClose();
  };

  return (
    <AIAssistant 
      isVisible={showAssistant} 
      onClose={handleClose}
    />
  );
}