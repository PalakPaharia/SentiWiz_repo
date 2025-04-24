
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Check, Settings, User, Bell, Key, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully."
    });
    
    setSaving(false);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and application preferences
        </p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="platforms">Platform Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Update your personal information and password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      "Weekly sentiment summary reports",
                      "New negative feedback alerts",
                      "Platform connection status updates",
                      "System announcements",
                    ].map((item, index) => (
                      <div className="flex items-center justify-between" key={index}>
                        <Label htmlFor={`email-${index}`} className="cursor-pointer">{item}</Label>
                        <Switch id={`email-${index}`} defaultChecked={index < 2} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-4">
                    {[
                      "Real-time sentiment alerts",
                      "Platform sync notifications",
                      "Mention notifications",
                      "Feature updates and tips",
                    ].map((item, index) => (
                      <div className="flex items-center justify-between" key={index}>
                        <Label htmlFor={`app-${index}`} className="cursor-pointer">{item}</Label>
                        <Switch id={`app-${index}`} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Manage API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">OpenAI Integration</h3>
                <div className="p-4 rounded-md bg-accent/10 border border-accent/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">OpenAI API Key</h4>
                      <p className="text-sm text-muted-foreground">Used for sentiment analysis and AI features</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SentiPulse API</h3>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Your API Key</Label>
                  <div className="flex">
                    <Input id="apiKey" value="sk_live_•••••••••••••••••••••••••" readOnly className="rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none">Copy</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this key to access the SentiPulse API from your applications
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Generate New Key</Button>
                  <Button variant="outline">View API Documentation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platforms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Integrations
              </CardTitle>
              <CardDescription>
                Manage connections to external platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connected Platforms</h3>
                <div className="space-y-2">
                  {[
                    { name: "Instagram", connected: true, lastSync: "2025-04-20" },
                    { name: "Facebook", connected: true, lastSync: "2025-04-21" },
                    { name: "Twitter", connected: true, lastSync: "2025-04-19" },
                    { name: "Google Reviews", connected: false },
                    { name: "LinkedIn", connected: false },
                  ].map((platform, index) => (
                    <div className="flex justify-between items-center p-3 border rounded-md" key={index}>
                      <div>
                        <h4 className="font-medium">{platform.name}</h4>
                        {platform.connected ? (
                          <p className="text-sm text-muted-foreground">
                            Connected • Last synced: {platform.lastSync}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                      <Button variant={platform.connected ? "outline" : "default"}>
                        {platform.connected ? "Manage" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-primary/10 border border-primary/20">
                <h4 className="font-medium">Custom Data Sources</h4>
                <p className="text-sm mt-1 mb-3">
                  Need to connect to a custom data source? Our team can help set up 
                  custom integrations with your existing systems.
                </p>
                <Button variant="outline">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
