"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { User } from "@/src/types/admin";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
  Shield,
  Search,
  Filter,
  Download,
  Upload
} from "lucide-react";
import { useUser } from "@/lib/stores/useUser";
import { SubscriptionStatus } from '@prisma/client';
import { UserRole } from '@prisma/client';

function AdminPage() {
  const { data: session, status } = useSession();
  const { users, fetchAllUsers, isLoading } = useUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user && session.user.role !== "ADMIN")) {
      redirect("/unauthorized");
    }
  }, [session, status]);

  const mappedUsers: User[] = users.map((user: any) => ({
    id: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
    email: user.email || '',
    role: user.role,
    status: 'Active',
    subscription: {
      status: user.subscription?.status || SubscriptionStatus.INCOMPLETE,
      type: user.subscription?.priceId?.includes('premium') ? 'Premium' : 'Basic'
    }
  }));

  const overviewStats = {
    totalUsers: users.length,
    activeSessions: users.filter(u => u.subscription?.status === SubscriptionStatus.ACTIVE).length,
    serverStatus: 'Healthy'
  };

  const recentActivities = users.length > 0 ? [
    {
      id: 1,
      title: "User Profile Updated",
      description: `${users[0].firstName || 'User'} updated their profile`,
      time: "Just now"
    },
    {
      id: 2,
      title: "Subscription Status",
      description: `Subscription status is ${users[0].subscription?.status || 'inactive'}`,
      time: "5 min ago"
    },
    {
      id: 3,
      title: "Account Created",
      description: `Account was created with email ${users[0].email}`,
      time: "1 hour ago"
    }
  ] : [];

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#f059da]"></div>
      </div>
    );
  }

  const handleSendEmail = async () => {
    if (!selectedUser) return;
    // TODO: Implement email sending functionality
    console.log("Sending email to:", selectedUser.email, emailContent);
    setEmailContent("");
    setIsEmailModalOpen(false);
  };

  const handleSendMessage = async () => {
    if (!selectedUser) return;
    // TODO: Implement message sending functionality
    console.log("Sending message to:", selectedUser.email, messageContent);
    setMessageContent("");
    setIsMessageModalOpen(false);
  };

  const handleEmailUser = (user: User) => {
    setSelectedUser(user);
    setIsEmailModalOpen(true);
  };

  const handleMessageUser = (user: User) => {
    setSelectedUser(user);
    setIsMessageModalOpen(true);
  };

  const handleManageSubscription = (user: User) => {
    setSelectedUser(user);
    setIsSubscriptionModalOpen(true);
  };

  const handleUpdateRole = async (userId: string, role: UserRole) => {
    try {
      const response = await fetch('/api/users/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role })
      });
      
      if (!response.ok) throw new Error('Failed to update role');
      
      // Refresh users list
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleUpdateSubscription = async (userId: string, subscriptionStatus: SubscriptionStatus) => {
    try {
      const response = await fetch('/api/users/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, subscriptionStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update subscription');
      
      // Refresh users list
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13111C] via-[#0F0F0F] to-black min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,#f059da10,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_80%_60%,#f059da05,transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.01]" />

      <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto relative">
        {/* Header - Enhanced gradient */}
        <div className="flex flex-col gap-4 bg-black/40 p-6 md:p-8 rounded-xl border border-white/20 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f059da15,transparent)]" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-white/80 mt-2 text-base md:text-lg">
                  Manage your application settings and monitor performance.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-black/40 hover:bg-black/60 rounded-lg flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all border border-white/20">
                  <Download className="h-4 w-4" />
                  Export Data
                </button>
                <button className="px-4 py-2 bg-[#f059da]/10 hover:bg-[#f059da]/20 rounded-lg flex items-center gap-2 text-sm text-[#f059da] transition-all border border-[#f059da]/20">
                  <Upload className="h-4 w-4" />
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Enhanced contrast */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 border border-white/20 p-1 overflow-x-auto flex whitespace-nowrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 bg-black/40 border-white/20 hover:bg-black/60 transition-colors group backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#f059da] transition-colors">Total Users</h3>
                    <p className="text-3xl font-bold text-[#f059da]">{overviewStats.totalUsers}</p>
                    <p className="text-sm text-zinc-400 mt-1 flex items-center gap-1">
                      <span className="text-emerald-500">↑</span>
                      Updated just now
                    </p>
                  </div>
                  <div className="p-2 bg-[#f059da]/10 rounded-lg">
                    <Users className="h-5 w-5 text-[#f059da]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-black/40 border-white/20 hover:bg-black/60 transition-colors group backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#f059da] transition-colors">Active Sessions</h3>
                    <p className="text-3xl font-bold text-[#f059da]">{overviewStats.activeSessions}</p>
                    <p className="text-sm text-zinc-400 mt-1">Current active users</p>
                  </div>
                  <div className="p-2 bg-[#f059da]/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-[#f059da]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-black/40 border-white/20 hover:bg-black/60 transition-colors group backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-500 transition-colors">Server Status</h3>
                    <p className="text-3xl font-bold text-emerald-500">{overviewStats.serverStatus}</p>
                    <p className="text-sm text-zinc-400 mt-1">All systems operational</p>
                  </div>
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity - Enhanced contrast */}
            <Card className="mt-6 p-6 bg-black/40 border-white/20 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                <div className="flex flex-wrap gap-2">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <input 
                      type="text" 
                      placeholder="Search activities..." 
                      className="w-full md:w-64 h-10 pl-9 pr-4 rounded-lg bg-black/40 border border-white/20 focus:border-[#f059da] focus:ring-[#f059da]/10 transition-all text-white placeholder:text-white/50"
                    />
                  </div>
                  <button className="px-4 py-2 bg-black/40 hover:bg-black/60 rounded-lg flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all border border-white/20">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-[#f059da]/10" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                      <p className="text-xs text-white/70">{activity.description}</p>
                    </div>
                    <span className="text-xs text-white/60 ml-auto">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UsersTable 
              users={mappedUsers}
              onEmailUser={handleEmailUser}
              onMessageUser={handleMessageUser}
              onManageSubscription={handleManageSubscription}
              onUpdateRole={handleUpdateRole}
              onUpdateSubscription={handleUpdateSubscription}
            />
          </TabsContent>

          {/* Other tab contents with similar enhanced styling */}
          <TabsContent value="content">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">Content Management</h2>
              <p className="text-white/80">Enhanced content management tools will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">Security Settings</h2>
              <p className="text-white/80">Enhanced security configuration options will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">Notification Center</h2>
              <p className="text-white/80">Enhanced notification settings and history will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">System Settings</h2>
              <p className="text-white/80">Enhanced system configuration options will be displayed here.</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Email Modal */}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogContent className="bg-zinc-900/95 border-white/20 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Send Email to {selectedUser?.name}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Compose and send an email to {selectedUser?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Textarea
                placeholder="Write your email content here..."
                className="min-h-[200px] bg-zinc-800/50 border-zinc-700/50 focus:border-[#f059da] focus:ring-[#f059da]/10"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendEmail}
                  className="bg-[#f059da] hover:bg-[#f059da]/90"
                >
                  Send Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Message Modal */}
        <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
          <DialogContent className="bg-zinc-900/95 border-white/20 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Send Message to {selectedUser?.name}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Send a direct message to {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Textarea
                placeholder="Write your message here..."
                className="min-h-[150px] bg-zinc-800/50 border-zinc-700/50 focus:border-[#f059da] focus:ring-[#f059da]/10"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#f059da] hover:bg-[#f059da]/90"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Subscription Modal */}
        <Dialog open={isSubscriptionModalOpen} onOpenChange={setIsSubscriptionModalOpen}>
          <DialogContent className="bg-zinc-900/95 border-white/20 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Manage Subscription - {selectedUser?.name}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                {selectedUser?.subscription.status === SubscriptionStatus.ACTIVE 
                  ? `Current Plan: ${selectedUser?.subscription.type}`
                  : `Subscription Status: ${selectedUser?.subscription.status}`
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {selectedUser?.subscription.status === SubscriptionStatus.ACTIVE ? (
                <>
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h3 className="text-sm font-medium text-red-400 mb-2">Warning</h3>
                    <p className="text-sm text-zinc-400">
                      Canceling the subscription will immediately stop all premium features for this user.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Textarea
                    placeholder="Reason for cancellation..."
                    className="min-h-[100px] bg-zinc-800/50 border-zinc-700/50 focus:border-[#f059da] focus:ring-[#f059da]/10"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubscriptionModalOpen(false);
                        setCancelReason("");
                      }}
                      className="bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={async () => {
                        // TODO: Implement subscription cancellation
                        console.log("Cancelling subscription for:", selectedUser?.email, cancelReason);
                        setIsSubscriptionModalOpen(false);
                        setCancelReason("");
                      }}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Stop Subscription
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-zinc-400">
                    This user&apos;s subscription is already {selectedUser?.subscription.status}.
                  </p>
                  <Button
                    onClick={() => setIsSubscriptionModalOpen(false)}
                    className="mt-4 bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
export default AdminPage;

