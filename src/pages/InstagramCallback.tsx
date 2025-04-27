import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstagramService } from '@/integrations/instagram/service';
import { useToast } from '@/hooks/use-toast';

export default function InstagramCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const error = params.get('error');
      const errorReason = params.get('error_reason');

      if (error || !code) {
        console.error('Instagram auth error:', error, errorReason);
        toast({
          title: 'Authentication Failed',
          description: errorReason || 'Failed to connect Instagram account',
          variant: 'destructive',
        });
        navigate('/platforms');
        return;
      }

      try {
        await InstagramService.handleAuthCallback(code);
        toast({
          title: 'Success',
          description: 'Instagram account connected successfully',
        });
        navigate('/platforms');
      } catch (error) {
        console.error('Error handling callback:', error);
        toast({
          title: 'Error',
          description: 'Failed to complete Instagram connection',
          variant: 'destructive',
        });
        navigate('/platforms');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Connecting Instagram</h1>
        <p className="text-muted-foreground">Please wait while we complete the connection...</p>
      </div>
    </div>
  );
} 