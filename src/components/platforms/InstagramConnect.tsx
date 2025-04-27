import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InstagramService } from '@/integrations/instagram/service';
import { useToast } from '@/hooks/use-toast';

export default function InstagramConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  const handleDisconnect = async () => {
    try {
      await InstagramService.disconnect();
      setIsConnected(false);
      setLastSync(null);
      setUsername(null);
      toast({
        title: 'Success',
        description: 'Instagram account disconnected successfully',
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect Instagram account',
        variant: 'destructive',
      });
    }
  };

  const handleSync = async () => {
    try {
      await InstagramService.syncComments();
      const status = await InstagramService.checkConnection();
      setLastSync(status.lastSyncedAt);
      toast({
        title: 'Success',
        description: 'Instagram comments synced successfully',
      });
    } catch (error) {
      console.error('Error syncing:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync Instagram comments',
        variant: 'destructive',
      });
    }
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
          <>
            <div className="text-sm text-muted-foreground">
              {lastSync
                ? `Last synced: ${new Date(lastSync).toLocaleString()}`
                : 'Not synced yet'}
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSync}>Sync Comments</Button>
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={handleConnect}>Connect Instagram</Button>
        )}
      </CardContent>
    </Card>
  );
} 