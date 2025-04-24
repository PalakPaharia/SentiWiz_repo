import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isEmailConfirmed: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth event:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check if the user's email is confirmed
        const isConfirmed = !!currentSession?.user?.email_confirmed_at;
        setIsEmailConfirmed(isConfirmed);
        
        // Handle email verification updates
        if (event === 'USER_UPDATED' && isConfirmed) {
          console.log('User verified email, redirecting to dashboard...');
          navigate('/dashboard');
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsEmailConfirmed(!!currentSession?.user?.email_confirmed_at);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      // Check if the user's email is confirmed
      if (!data.user?.email_confirmed_at) {
        toast({
          title: 'Email Not Verified',
          description: 'Please check your email and click the confirmation link before logging in.',
          variant: 'destructive',
        });
        await logout();
        throw new Error('Email not verified. Please check your inbox and verify your email.');
      }

      toast({
        title: 'Success',
        description: 'You have successfully logged in.',
        variant: 'default',
      });
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast({
        title: 'Login Failed',
        description: error.message || 'Failed to login. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Sign up the user
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/email-verification`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }
      
      toast({
        title: 'Account created',
        description: 'We\'ve sent a verification link to your email.',
        variant: 'default',
      });
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error.message);
      toast({
        title: 'Logout Failed',
        description: error.message || 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isEmailConfirmed,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
