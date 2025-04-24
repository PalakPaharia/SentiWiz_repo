
import { useState, useEffect } from 'react';
import { PLATFORMS, Platform } from '@/constants/platforms';
import PlatformCard from '@/components/platforms/PlatformCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';

export default function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Update some platforms as connected with last sync for demo
      setPlatforms(prev => 
        prev.map((platform, index) => ({
          ...platform,
          isConnected: index < 3,
          lastSync: index < 3 ? new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24) : null
        }))
      );
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSyncPlatform = async (platformId: string) => {
    // Simulate API call to sync platform
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Update the lastSync time
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, lastSync: new Date() } 
          : platform
      )
    );
    
    toast({
      title: "Platform Synced",
      description: "Your platform data has been updated successfully.",
    });
  };

  const handleConnect = (platformId: string) => {
    // In a real app, this would open a connection flow
    toast({
      title: "Connect Platform",
      description: "This would open the OAuth flow for this platform.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platforms & Reports</h1>
          <p className="text-muted-foreground mt-2">
            Connect and manage your feedback platforms
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Source
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-lg bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onSync={handleSyncPlatform}
            />
          ))}
        </div>
      )}

      <Card className="bg-accent/10 border border-accent/20">
        <CardHeader>
          <CardTitle>Need a custom integration?</CardTitle>
          <CardDescription>
            We can help you connect to custom data sources like your CRM, help desk, or internal databases.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Contact Support</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
