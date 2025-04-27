import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface EmailVerificationRouteProps {
  children: React.ReactNode;
}

const EmailVerificationRoute = ({ children }: EmailVerificationRouteProps) => {
  const { isAuthenticated, isEmailConfirmed, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isEmailConfirmed) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

export default EmailVerificationRoute; 