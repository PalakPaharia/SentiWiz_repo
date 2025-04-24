
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessages } from '@/components/agent/ChatMessages';
import { ChatInput } from '@/components/agent/ChatInput';
import { ExamplePrompts } from '@/components/agent/ExamplePrompts';

export default function Agent() {
  const [prompt, setPrompt] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: 'Hi! I\'m your SentiPulse Assistant. How can I help analyze your customer feedback today?'}
  ]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setConversation(prev => [...prev, {role: 'user', content: prompt}]);
    const userMessage = prompt;
    setPrompt('');
    setAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-agent', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data || !data.reply) {
        console.error('Unexpected response format:', data);
        throw new Error('Unexpected response format from the server');
      }

      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: data.reply }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again in a moment." }
      ]);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SentiPulse Agent</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered insights about your customer feedback
        </p>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversation
              </CardTitle>
              <CardDescription>
                Ask questions about your customer feedback or request custom analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatMessages messages={conversation} analyzing={analyzing} />
              <ChatInput 
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleSubmit}
                disabled={analyzing}
              />
            </CardContent>
          </Card>
          
          <ExamplePrompts onSelect={setPrompt} />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Configure your AI assistant preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Settings content kept empty for now */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
