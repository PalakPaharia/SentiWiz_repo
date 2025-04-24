
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export const ChatInput = ({ value, onChange, onSubmit, disabled }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about customer sentiment, trends, or request specific analysis..."
        className="flex-1 min-h-[80px]"
      />
      <Button type="submit" disabled={disabled || !value.trim()} className="self-end">
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </form>
  );
};
