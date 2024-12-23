"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Settings, Mail, MessageSquare, Ban, Bell, X } from "lucide-react";
import { User } from "@/src/types/admin";
import { UserActions } from "./UserActions";
import { UserRole, SubscriptionStatus } from '@prisma/client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface UsersTableProps {
  users: User[];
  onEmailUser: (user: User) => void;
  onMessageUser: (user: User) => void;
  onManageSubscription: (user: User) => void;
  onUpdateRole: (userId: string, role: UserRole) => void;
  onUpdateSubscription: (userId: string, status: SubscriptionStatus) => void;
}

export function UsersTable({ 
  users, 
  onEmailUser, 
  onMessageUser, 
  onManageSubscription, 
  onUpdateRole, 
  onUpdateSubscription 
}: UsersTableProps) {
  return (
    <Card className="p-6 bg-black/40 border-white/20 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full md:w-64 h-10 pl-9 pr-4 rounded-lg bg-black/40 border border-white/20 focus:border-[#f059da] focus:ring-[#f059da]/10 transition-all text-white placeholder:text-white/50"
            />
          </div>
          <Button className="bg-[#f059da] hover:bg-[#f059da]/90">
            Add User
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-50">User</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-50">Role</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-50">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#f059da]/10" />
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-white/70">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Select
                    value={user.role}
                    onValueChange={(value: UserRole) => onUpdateRole(user.id, value)}
                  >
                    <SelectTrigger className="w-32 bg-black/40 border-white/20 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/20">
                      {Object.values(UserRole).map((role) => (
                        <SelectItem 
                          key={role} 
                          value={role}
                          className="text-white hover:bg-[#f059da]/10 focus:bg-[#f059da]/10 focus:text-white"
                        >
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-4">
                  <Select
                    value={user.subscription?.status || 'INCOMPLETE'}
                    onValueChange={(value: SubscriptionStatus) => 
                      onUpdateSubscription(user.id, value)
                    }
                  >
                    <SelectTrigger className="w-32 bg-black/40 border-white/20 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/20">
                      {Object.values(SubscriptionStatus).map((status) => (
                        <SelectItem 
                          key={status} 
                          value={status}
                          className="text-white hover:bg-[#f059da]/10 focus:bg-[#f059da]/10 focus:text-white"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <UserActions 
                      user={user}
                      onEmail={() => onEmailUser(user)}
                      onMessage={() => onMessageUser(user)}
                      onManageSubscription={() => onManageSubscription(user)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 