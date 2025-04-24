
import React, { useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  analyzing: boolean;
}

export const ChatMessages = ({ messages, analyzing }: ChatMessagesProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4 bg-muted/30"
    >
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`mb-4 ${message.role === 'assistant' ? 'mr-12' : 'ml-12'}`}
        >
          <div 
            className={`p-3 rounded-lg ${
              message.role === 'assistant' 
                ? 'bg-primary/10 text-primary-foreground/90' 
                : 'bg-secondary text-secondary-foreground ml-auto'
            }`}
          >
            {message.content}
          </div>
          <div className={`text-xs text-muted-foreground mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
            {message.role === 'assistant' ? 'SentiPulse Agent' : 'You'}
          </div>
        </div>
      ))}
      {analyzing && (
        <div className="mb-4 mr-12">
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              <span className="text-sm text-primary-foreground/70">Analyzing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
