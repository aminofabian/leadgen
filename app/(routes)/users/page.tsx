"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Users,
  Heart,
  MessageCircle,
  Filter,
  ArrowUpRight,
  UserCheck,
  Star,
  Verified,
  Globe2,
} from "lucide-react";

interface User {
  username: string;
  name: string;
  followers: number;
  engagement: number;
  category: string;
  isVerified: boolean;
  location: string;
  avatar: string;
  posts: number;
  bio: string;
}

const demoUsers: User[] = [
  {
    username: "naturephotographer",
    name: "Alex Thompson",
    followers: 450000,
    engagement: 4.5,
    category: "Photography",
    isVerified: true,
    location: "New York, USA",
    avatar: "/avatars/1.jpg",
    posts: 892,
    bio: "Professional nature photographer 📸 Wildlife enthusiast 🦁",
  },
  {
    username: "foodie_adventures",
    name: "Sarah Chen",
    followers: 280000,
    engagement: 3.8,
    category: "Food & Dining",
    isVerified: false,
    location: "San Francisco, USA",
    avatar: "/avatars/2.jpg",
    posts: 1243,
    bio: "Food blogger 🍜 Recipe creator 👩‍🍳 Travel enthusiast ✈️",
  },
  {
    username: "fitness_coach",
    name: "Mike Johnson",
    followers: 520000,
    engagement: 5.2,
    category: "Fitness",
    isVerified: true,
    location: "Los Angeles, USA",
    avatar: "/avatars/3.jpg",
    posts: 2156,
    bio: "Personal trainer 💪 Nutrition expert 🥗 Life coach 🌟",
  },
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [minFollowers, setMinFollowers] = useState(0);
  const [minEngagement, setMinEngagement] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = demoUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" || user.category.toLowerCase() === category.toLowerCase();
    const matchesFollowers = user.followers >= minFollowers * 1000;
    const matchesEngagement = user.engagement >= minEngagement;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFollowers &&
      matchesEngagement
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search by username or name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="food & dining">Food & Dining</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">
                Min. Followers (in thousands)
              </label>
              <Slider
                value={[minFollowers]}
                onValueChange={([value]) => setMinFollowers(value)}
                max={1000}
                step={10}
              />
              <div className="text-sm text-zinc-400">{minFollowers}K+</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Min. Engagement Rate</label>
              <Slider
                value={[minEngagement]}
                onValueChange={([value]) => setMinEngagement(value)}
                max={10}
                step={0.1}
              />
              <div className="text-sm text-zinc-400">{minEngagement}%+</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.username}
            className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm hover:border-[#f059da]/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative p-6 space-y-4">
              {/* User Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/20 to-transparent rounded-full" />
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-1">
                      {user.name}
                      {user.isVerified && (
                        <Verified className="h-4 w-4 text-[#f059da]" />
                      )}
                    </h3>
                    <p className="text-sm text-white">@{user.username}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#f059da]/10 hover:bg-[#f059da]/20 text-[#f059da]"
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-3 gap-4 py-3 border-y border-zinc-800/50">
                <div>
                  <p className="text-sm text-white/70">Followers</p>
                  <p className="text-lg font-semibold text-white">
                    {(user.followers / 1000).toFixed(1)}k
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Posts</p>
                  <p className="text-lg font-semibold text-white">{user.posts}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Engagement</p>
                  <p className="text-lg font-semibold text-white flex items-center gap-1">
                    {user.engagement}%
                    <Star className="h-4 w-4 text-[#f059da]" />
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/70">
                  <Globe2 className="h-4 w-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {user.bio}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/60 px-2 py-1 rounded-full bg-[#f059da]/10">
                    {user.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button
                  className="flex-1 bg-[#f059da] hover:bg-[#f059da]/90 text-white"
                >
                  View Profile
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
