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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Instagram,
  Link as LinkIcon,
  MapPin,
  Globe,
  Calendar,
  Camera,
  AtSign,
  Edit,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    username: "alexthompson",
    email: "alex@example.com",
    instagram: "@alexcreates",
    website: "https://alexthompson.com",
    location: "New York, USA",
    bio: "Digital creator passionate about photography and visual storytelling. Always exploring new perspectives and sharing moments that inspire.",
    joinedDate: "January 2024",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/50">
        {/* Background Pattern */}
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

        {/* Profile Content */}
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#f059da] to-[#a03494] p-[3px] ring-4 ring-zinc-900/50 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/90 p-4">
                    <User className="w-full h-full text-zinc-600" />
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8 bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {profileData.name}
                  </h1>
                  <p className="text-zinc-400 flex items-center gap-1 mt-1">
                    <AtSign className="w-4 h-4 text-[#f059da]" />
                    {profileData.username}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2 bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>

              <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                {profileData.bio}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-zinc-900/50 group-hover:bg-[#f059da]/10 transition-colors">
                    <MapPin className="w-4 h-4 text-[#f059da]" />
                  </div>
                  {profileData.location}
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-zinc-900/50 group-hover:bg-[#f059da]/10 transition-colors">
                    <Globe className="w-4 h-4 text-[#f059da]" />
                  </div>
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f059da] transition-colors"
                  >
                    {profileData.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-zinc-900/50 group-hover:bg-[#f059da]/10 transition-colors">
                    <Calendar className="w-4 h-4 text-[#f059da]" />
                  </div>
                  Joined {profileData.joinedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-zinc-900/90 border border-zinc-800/50 p-1 rounded-lg">
          <TabsTrigger
            value="general"
            className={cn(
              "data-[state=active]:bg-[#f059da]/10",
              "data-[state=active]:text-white",
              "transition-all duration-300",
              "rounded-md"
            )}
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className={cn(
              "data-[state=active]:bg-[#f059da]/10",
              "data-[state=active]:text-white",
              "transition-all duration-300",
              "rounded-md"
            )}
          >
            Social Profiles
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className={cn(
              "data-[state=active]:bg-[#f059da]/10",
              "data-[state=active]:text-white",
              "transition-all duration-300",
              "rounded-md"
            )}
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-100">General Information</CardTitle>
              <CardDescription className="text-zinc-400">
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    disabled={!isEditing}
                    className={cn(
                      "bg-zinc-900/50 border-zinc-800",
                      "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                      "disabled:opacity-70",
                      "text-white placeholder:text-zinc-400",
                      "transition-colors"
                    )}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-zinc-300">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    disabled={!isEditing}
                    className={cn(
                      "bg-zinc-900/50 border-zinc-800",
                      "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                      "disabled:opacity-70",
                      "text-white placeholder:text-zinc-400",
                      "transition-colors"
                    )}
                    onChange={(e) =>
                      setProfileData({ ...profileData, username: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
                <Input
                  id="bio"
                  value={profileData.bio}
                  disabled={!isEditing}
                  className={cn(
                    "bg-zinc-900/50 border-zinc-800",
                    "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                    "disabled:opacity-70",
                    "text-white placeholder:text-zinc-400",
                    "transition-colors"
                  )}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    className={cn(
                      "bg-zinc-900/50 border-zinc-800",
                      "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                      "disabled:opacity-70",
                      "text-white placeholder:text-zinc-400",
                      "transition-colors"
                    )}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-300">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    disabled={!isEditing}
                    className={cn(
                      "bg-zinc-900/50 border-zinc-800",
                      "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                      "disabled:opacity-70",
                      "text-white placeholder:text-zinc-400",
                      "transition-colors"
                    )}
                    onChange={(e) =>
                      setProfileData({ ...profileData, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-100">Social Profiles</CardTitle>
              <CardDescription className="text-zinc-400">
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-800/50 hover:border-[#f059da]/20 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-[#f059da]/10 transition-colors">
                      <Instagram className="w-5 h-5 text-[#f059da]" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-100">Instagram</p>
                      <p className="text-sm text-zinc-400">
                        {profileData.instagram}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
                  >
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-800/50 hover:border-[#f059da]/20 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-[#f059da]/10 transition-colors">
                      <LinkIcon className="w-5 h-5 text-[#f059da]" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-100">Website</p>
                      <p className="text-sm text-zinc-400">
                        {profileData.website}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-100">Profile Preferences</CardTitle>
              <CardDescription className="text-zinc-400">
                Customize your profile settings and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-800/50 hover:border-[#f059da]/20 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-zinc-100">Public Profile</p>
                    <p className="text-sm text-zinc-400">
                      Make your profile visible to everyone
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#f059da]" />
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-800/50 hover:border-[#f059da]/20 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-zinc-100">Email Notifications</p>
                    <p className="text-sm text-zinc-400">
                      Receive email notifications about your account
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#f059da]" />
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-800/50 hover:border-[#f059da]/20 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-zinc-100">Profile Analytics</p>
                    <p className="text-sm text-zinc-400">
                      Track who views your profile
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#f059da]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
