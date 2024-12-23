"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  BarChart2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    title: "Total Followers",
    value: "124.2K",
    change: "+12.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.5%",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Post Reach",
    value: "892.1K",
    change: "-2.1%",
    trend: "down",
    icon: Eye,
  },
  {
    title: "Comments",
    value: "1.2K",
    change: "+8.1%",
    trend: "up",
    icon: MessageCircle,
  },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/10 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/grid.svg')",
              backgroundSize: "24px",
              backgroundRepeat: "repeat",
              opacity: 0.1,
            }}
          />
        </div>

        <div className="relative p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Analytics Overview
              </h2>
              <p className="text-zinc-400 mt-1">
                Track your Instagram growth and engagement
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select defaultValue="7d">
                <SelectTrigger className="w-full md:w-32 bg-zinc-900/90 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300 w-full md:w-auto"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 hover:border-[#f059da]/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="relative flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-100">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-[#f059da]" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <div
                className={cn(
                  "text-xs flex items-center font-medium",
                  metric.trend === "up"
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-zinc-100">Growth Trends</CardTitle>
                <CardDescription className="text-zinc-400">
                  Follower growth over time
                </CardDescription>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center rounded-lg bg-zinc-900/70 border border-zinc-800/50">
              <div className="text-center space-y-3">
                <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800/50 inline-block">
                  <TrendingUp className="h-6 w-6 text-[#f059da]" />
                </div>
                <div className="text-sm text-zinc-400">Growth chart placeholder</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-zinc-100">Engagement Analysis</CardTitle>
                <CardDescription className="text-zinc-400">
                  Likes and comments distribution
                </CardDescription>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center rounded-lg bg-zinc-900/70 border border-zinc-800/50">
              <div className="text-center space-y-3">
                <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800/50 inline-block">
                  <BarChart2 className="h-6 w-6 text-[#f059da]" />
                </div>
                <div className="text-sm text-zinc-400">
                  Engagement chart placeholder
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
