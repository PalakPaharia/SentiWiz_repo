import { SentiWizAgent } from "@/components/SentiWizAgent";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function SentiWizAgentPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">SentiWiz Agent</h1>
        <p className="text-muted-foreground text-center mb-8">
          Ask me anything about your sentiment analysis data and trends.
        </p>
        <SentiWizAgent />
      </div>
    </QueryClientProvider>
  );
} 