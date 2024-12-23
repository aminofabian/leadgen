"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  Lock,
  User,
  Palette,
  Globe,
  Shield,
  CreditCard,
  KeyRound,
  Instagram,
  MessageCircle,
  Settings,
  Clock,
  Bot,
  Zap,
  Target,
  Database,
} from "lucide-react";
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 p-8 rounded-xl border border-zinc-800/50 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f059da15,transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px] pointer-events-none" />
        <div className="relative">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
            Settings
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-gradient-to-r from-zinc-900/80 to-zinc-900/50 border border-zinc-800/50 p-1">
          <TabsTrigger value="account" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Bot className="h-4 w-4 mr-2" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-white/70">
                  Update your account profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90" htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={`${session?.user?.firstName || ''} ${session?.user?.lastName || ''}`}
                      className="bg-zinc-900/50 border-zinc-800 text-white/90 focus:ring-[#f059da]/50"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90" htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={session?.user?.email || ''}
                      className="bg-zinc-900/50 border-zinc-800 text-white/90 focus:ring-[#f059da]/50"
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90" htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    placeholder="Tell us about yourself" 
                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-white/40 focus:ring-[#f059da]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700">
                    <Shield className="w-4 h-4 text-[#f059da]" />
                    <span>{session?.user?.role === 'ADMIN' ? 'Administrator' : 'Standard User'}</span>
                  </div>
                </div>
                <Button className="bg-[#f059da] hover:bg-[#f059da]/90 text-white">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Language & Region</CardTitle>
                <CardDescription className="text-white/70">
                  Set your language and regional preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Language</Label>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-zinc-900/50 border-zinc-800 text-white hover:bg-[#f059da]/10 hover:border-[#f059da]/50"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      English (US)
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90">Time Zone</Label>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-zinc-900/50 border-zinc-800 text-white hover:bg-[#f059da]/10 hover:border-[#f059da]/50"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      UTC-7 (Pacific Time)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="grid gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Instagram Automation</CardTitle>
                <CardDescription className="text-white/70">
                  Configure Instagram DM and engagement automation settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Instagram DM Automation</Label>
                    <span className="text-sm text-white/70">Automatically send DMs to new followers</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Smart Reply</Label>
                    <span className="text-sm text-white/70">AI-powered automatic responses to common messages</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Follow/Unfollow Automation</Label>
                    <span className="text-sm text-white/70">Automate following and unfollowing based on engagement</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Comment Automation</Label>
                    <span className="text-sm text-white/70">Auto-comment on posts from target audience</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Advanced Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Configure advanced automation parameters and limits.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Rate Limiting</Label>
                    <span className="text-sm text-white/70">Smart rate limiting to avoid Instagram restrictions</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Analytics Tracking</Label>
                    <span className="text-sm text-white/70">Track performance of automated actions</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Scheduled Posts</Label>
                    <span className="text-sm text-white/70">Schedule and auto-publish content</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-white/90">Backup Settings</Label>
                    <span className="text-sm text-white/70">Auto-backup of automation settings and data</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Password</CardTitle>
                <CardDescription className="text-white/70">Change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/90" htmlFor="current">Current Password</Label>
                  <Input 
                    id="current" 
                    type="password" 
                    className="bg-zinc-900/50 border-zinc-800 text-white/90 focus:ring-[#f059da]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90" htmlFor="new">New Password</Label>
                  <Input 
                    id="new" 
                    type="password" 
                    className="bg-zinc-900/50 border-zinc-800 text-white/90 focus:ring-[#f059da]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90" htmlFor="confirm">Confirm Password</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    className="bg-zinc-900/50 border-zinc-800 text-white/90 focus:ring-[#f059da]/50"
                  />
                </div>
                <Button className="bg-[#f059da] hover:bg-[#f059da]/90 text-white">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-white/70">
                  Add an extra layer of security to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-white/70">
                      Secure your account with 2FA.
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#f059da]" />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-zinc-900/50 border-zinc-800 text-white hover:bg-[#f059da]/10 hover:border-[#f059da]/50"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Setup 2FA
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-white/70">
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-white/70">
                    Receive email about your account activity.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">Push Notifications</p>
                  <p className="text-sm text-white/70">
                    Receive push notifications on your devices.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
              <CardDescription className="text-white/70">
                Customize how IgLeadGen looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">Dark Mode</p>
                  <p className="text-sm text-white/70">
                    Toggle between light and dark themes.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">Reduce Animations</p>
                  <p className="text-sm text-white/70">
                    Minimize motion effects throughout the interface.
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
