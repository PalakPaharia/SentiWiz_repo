
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelect }: ExamplePromptsProps) => {
  const examples = [
    "What are the most common complaints about our delivery service?",
    "Analyze sentiment trends for 'product quality' over the last month",
    "Identify top keywords in negative reviews about our mobile app",
    "Compare sentiment across different platforms for our customer service",
    "Generate a weekly summary of customer feedback highlights",
  ];

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Analysis Examples</CardTitle>
        <CardDescription>
          Try asking questions like these
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {examples.map((example, index) => (
          <Button 
            key={index} 
            variant="outline" 
            className="justify-start h-auto py-2 px-3"
            onClick={() => onSelect(example)}
          >
            {example}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
