import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InstagramService } from '@/integrations/instagram/service';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function InstagramConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const status = await InstagramService.checkConnection();
      setIsConnected(status.isConnected);
      setLastSync(status.lastSyncedAt);
      setUsername(status.username);
    } catch (error) {
      console.error('Error checking connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to check Instagram connection status',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    InstagramService.startAuth();
  };

  const handleReport = () => {
    navigate('/instagram/report');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Instagram</CardTitle>
          <CardDescription>Loading connection status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instagram</CardTitle>
        <CardDescription>
          {isConnected
            ? `Connected as @${username}`
            : 'Connect your Instagram Business account'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <Button onClick={handleReport}>Report</Button>
        ) : (
          <Button onClick={handleConnect}>Connect Instagram</Button>
        )}
        <Button variant="outline" onClick={() => navigate('/instagram/stats')}>
          View Instagram Stats
        </Button>
      </CardContent>
    </Card>
  );
} 