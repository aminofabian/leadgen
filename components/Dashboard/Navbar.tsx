"use client";

import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare,
  Plus,
  Settings
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 md:left-72 h-16 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#f059da]/10">
      <div className="flex items-center justify-between h-full px-4 gap-4 max-w-[2000px] mx-auto">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-zinc-400" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-[#0a0a0a]">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search anything..." 
              className="w-full pl-10 bg-zinc-900/50 border-zinc-800 focus:ring-[#f059da]/50 text-zinc-200 placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Right Side Menu Items */}
        <div className="flex items-center gap-3">
          {/* New Button */}
          <Button 
            size="sm" 
            className="hidden md:flex bg-gradient-to-r from-[#f059da] to-[#f059da]/80 hover:to-[#f059da] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-zinc-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#f059da] rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#0a0a0a] border-zinc-800">
              <DropdownMenuLabel className="text-zinc-400">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-zinc-300 focus:bg-[#f059da]/10 focus:text-white">
                New message from user
              </DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-[#f059da]/10 focus:text-white">
                Campaign completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5 text-zinc-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f059da] rounded-full flex items-center justify-center text-[10px] text-white">3</span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-zinc-400" />
          </Button>

          {/* User Button */}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
