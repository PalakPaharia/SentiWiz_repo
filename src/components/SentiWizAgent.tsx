import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { analyzeSentiment, generateInsights } from '@/lib/openai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function SentiWizAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  // Example sentiment data context - replace with your actual data
  const sentimentContext = "Overall sentiment is positive with 65% positive comments, 25% neutral, and 10% negative. Common positive themes include customer service and product quality. Areas of improvement mentioned are delivery times and pricing.";

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: string) => {
      const response = await analyzeSentiment(message, sentimentContext);
      return response;
    },
    onSuccess: (response) => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response || 'No response generated.' }
      ]);
      setInput('');
    },
    onError: (error) => {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto p-4">
      <Card className="flex-1 mb-4 p-4">
        <ScrollArea className="h-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                  : 'bg-muted max-w-[80%]'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about sentiment trends..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </form>
    </div>
  );
} 