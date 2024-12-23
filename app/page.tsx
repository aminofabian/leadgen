'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, Users, BarChart2, Settings, LogOut, ArrowRight, MessageCircle, Bot, Clock, Target, Zap, Database, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const SavedHashtags = dynamic(() => import('@/components/SavedHashtags'), {
  ssr: false,
  loading: () => (
    <div className="w-full p-8 flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f059da]"></div>
    </div>
  ),
});

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const tools = [
    {
      label: "Search Hashtags",
      icon: Hash,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/hashtag-search",
      description: "Find trending hashtags for your niche",
      stats: "450M+ hashtags"
    },
    {
      label: "Find Users",
      icon: Users,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/users",
      description: "Discover potential followers and collaborators",
      stats: "100K+ profiles"
    },
    {
      label: "DM Automation",
      icon: MessageCircle,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/dm",
      description: "Automate Instagram DMs with smart replies",
      stats: "AI-powered"
    },
    {
      label: "Smart Engagement",
      icon: Zap,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/engagement",
      description: "Auto-engage with your target audience",
      stats: "24/7 Active"
    },
    {
      label: "Hashtag Generator",
      icon: Bot,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/hashtag-generator",
      description: "Generate AI-powered hashtags for your posts",
      stats: "AI-powered"
    },
    {
      label: "Content Scheduler",
      icon: Clock,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/scheduler",
      description: "Schedule and auto-publish content",
      stats: "Smart timing"
    },
    {
      label: "Growth Targeting",
      icon: Target,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/targeting",
      description: "Target and engage specific audiences",
      stats: "Precision tools"
    },
    {
      label: "Analytics",
      icon: BarChart2,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/analytics",
      description: "Track your growth and engagement",
      stats: "Real-time data"
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/settings",
      description: "Customize your experience",
      stats: "Full control"
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.refresh();
      router.push('/auth/login');
    } catch (err) {
      console.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13111C] via-[#0F0F0F] to-black min-h-screen">
      {/* Reduced opacity of background effects for better contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,#f059da10,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_80%_60%,#f059da05,transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.01]" />

      <div className="container h-full mx-auto px-4 sm:px-6 relative pt-4 pb-8">
        <div className="flex-1 h-full flex flex-col">
          {/* Header - Increased text opacity */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-x-2 sm:gap-x-3">
              {session && (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white/90 hover:text-white group relative px-2 sm:px-4"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-semibold text-white truncate">
                  {session ? `Welcome, ${session.user?.firstName}` : 'Dashboard'}
                </span>
                <span className="text-[10px] sm:text-xs text-white/80 truncate">
                  {session?.user?.role === 'ADMIN' ? 'Admin Access' : 'Manage your Instagram growth'}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content - Increased contrast */}
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
              {/* Hero Section - Enhanced visibility */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 shadow-[0_8px_32px_rgba(240,89,218,0.15)]">
                <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col items-center text-center">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/20 bg-black/60 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
                    <span className="mr-2 text-[#f059da] animate-pulse">✨</span>
                    Welcome to &quot;Lead Gen&quot; Net Growth
                  </div>
                  <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Grow Your Instagram{" "}
                      <span className="text-[#f059da]">With Smart Tools</span>
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base font-normal mt-3 tracking-wide">
                      Leverage our tools to expand your reach and track your growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Grid - Enhanced visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {tools.map((tool) => (
                  <button
                    key={tool.label}
                    className="group relative cursor-pointer border border-white/20 hover:border-[#f059da]/40 bg-black/40 hover:bg-black/60 transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-[0_8px_32px_rgba(240,89,218,0.2)] hover:-translate-y-0.5"
                    onClick={() => router.push(tool.href)}
                  >
                    <div className="px-4 sm:px-5 py-4 h-full flex items-center space-x-3 sm:space-x-4 relative">
                      <div className={cn(
                        "p-2.5 sm:p-3 w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 transition-all duration-300",
                        "bg-black/40 group-hover:bg-[#f059da]/20",
                        "border border-white/20 group-hover:border-[#f059da]/40"
                      )}>
                        <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#f059da] transition-all duration-300" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <h3 className="font-semibold text-base sm:text-lg text-white truncate leading-tight">
                          {tool.label}
                        </h3>
                        <p className="text-white/80 text-sm truncate leading-tight mt-1">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-[#f059da] group-hover:translate-x-1 transition-all duration-300 ease-out flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Hashtags Section - Enhanced visibility */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 p-4 sm:p-6 my-6 sm:my-10">
          <div className="relative space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <Hash className="w-5 h-5 sm:w-6 sm:h-6 text-[#f059da]" />
                Saved Hashtags
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push('/hashtag-search')}
                  variant="ghost"
                  className="text-white hover:text-[#f059da] text-sm px-3 h-9"
                >
                  Search More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => router.push('/hashtags')}
                  variant="ghost"
                  className="text-white hover:text-[#f059da] text-sm px-3 h-9"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <SavedHashtags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;