import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from 'react-router-dom';
import { testSetup } from './utils/test-setup';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import Platforms from './pages/Platforms';
import Agent from './pages/Agent';
import Settings from './pages/Settings';
import Support from './pages/Support';
import NotFound from './pages/NotFound';
import InstagramCallback from './pages/InstagramCallback';
import ProtectedRoute from './components/ProtectedRoute';
import EmailVerificationRoute from './components/EmailVerificationRoute';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route 
                path="email-verification" 
                element={
                  <EmailVerificationRoute>
                    <EmailVerification />
                  </EmailVerificationRoute>
                } 
              />
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="platforms" 
                element={
                  <ProtectedRoute>
                    <Platforms />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="agent" 
                element={
                  <ProtectedRoute>
                    <Agent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="support" 
                element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                } 
              />
              <Route path="instagram/callback" element={<InstagramCallback />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
          {import.meta.env.DEV && (
            <button
              onClick={() => testSetup()}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                zIndex: 9999,
              }}
            >
              Test Setup
            </button>
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
