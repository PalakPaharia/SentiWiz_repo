import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, User, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [notifications, setNotifications] = useState(2); // Mock notifications count

  // Access name from user_metadata or use a fallback
  const userName = user?.user_metadata?.name || 'Profile';

  return (
    <nav className="border-b border-border bg-card text-card-foreground shadow-sm px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Left: Brand logo with background and mirror effect */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <img
            src="/sentiwiz-logo.png"
            alt="SentiWiz"
            className="h-20 w-auto hover:opacity-90 transition-opacity"
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>

      {/* Right: Auth logic */}
      <div className="flex gap-3 items-center">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{userName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild className="hover:bg-white/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
