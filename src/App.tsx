import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import Dashboard from "./pages/Dashboard";
import Platforms from "./pages/Platforms";
import Agent from "./pages/Agent";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import React from "react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isEmailConfirmed, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isEmailConfirmed) {
    return <Navigate to="/email-verification" />;
  }
  
  return <>{children}</>;
};

// EmailVerificationRoute component
const EmailVerificationRoute = ({ children }: { children: React.ReactNode }) => {
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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<MainLayout><Index /></MainLayout>} />
              <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
              <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
              <Route 
                path="/email-verification" 
                element={
                  <MainLayout>
                    <EmailVerificationRoute>
                      <EmailVerification />
                    </EmailVerificationRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/platforms" 
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Platforms />
                    </ProtectedRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/agent" 
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Agent />
                    </ProtectedRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  </MainLayout>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Support />
                    </ProtectedRoute>
                  </MainLayout>
                } 
              />
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
