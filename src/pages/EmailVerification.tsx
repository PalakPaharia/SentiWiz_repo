import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function EmailVerification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isEmailConfirmed } = useAuth();
  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // Redirect if user is already logged in and verified
    if (user?.email_confirmed_at) {
      navigate('/dashboard');
      return;
    }

    setLoading(false);

    // Set up polling interval to check email verification status
    const interval = setInterval(async () => {
      try {
        // Refresh the session to get the latest user data
        const { data: sessionData } = await supabase.auth.refreshSession();
        const { data: userData } = await supabase.auth.getUser();

        // Check if the user's email is confirmed
        if (userData?.user?.email_confirmed_at || sessionData?.session?.user?.email_confirmed_at) {
          console.log('Email verified, redirecting to dashboard...');
          clearInterval(interval);
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error('Error checking email verification:', error);
        toast({
          title: 'Error',
          description: 'Failed to check email verification status.',
          variant: 'destructive',
        });
      }
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [user, navigate, toast, isEmailConfirmed]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user?.email || '',
      });

      if (error) throw error;

      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for the verification link.',
        variant: 'default',
      });
    } catch (error: any) {
      console.error('Error resending verification:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to resend verification email.',
        variant: 'destructive',
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">🎉 You're almost there!</CardTitle>
          <CardDescription className="text-center">
            Please confirm your email through your registered email ID to complete the signup process.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>We've sent a verification link to your email.</p>
            <p>Please click on the link to verify your account.</p>
          </div>
          
          <div className="animate-pulse mt-4">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>

          <Button
            variant="outline"
            onClick={handleResendVerification}
            disabled={resendLoading}
            className="mt-4"
          >
            {resendLoading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Resending...
              </>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Already verified your email?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
