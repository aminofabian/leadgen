import { Settings, Mail, MessageSquare, Ban, Bell, X } from "lucide-react";
import { User } from "@/types/admin";

interface UserActionsProps {
  user: User;
  onEmail: () => void;
  onMessage: () => void;
  onManageSubscription: () => void;
}

export function UserActions({ 
  user, 
  onEmail, 
  onMessage, 
  onManageSubscription 
}: UserActionsProps) {
  return (
    <>
      <button 
        className="p-2 hover:bg-[#f059da]/10 rounded-lg text-white/80 hover:text-[#f059da] transition-all"
        title="User Settings"
      >
        <Settings className="h-4 w-4" />
      </button>

      <button 
        className="p-2 hover:bg-[#f059da]/10 rounded-lg text-white/80 hover:text-[#f059da] transition-all"
        onClick={onEmail}
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>

      <button 
        className="p-2 hover:bg-[#f059da]/10 rounded-lg text-white/80 hover:text-[#f059da] transition-all"
        onClick={onMessage}
        title="Send Message"
      >
        <MessageSquare className="h-4 w-4" />
      </button>

      <button 
        className={`p-2 hover:bg-[#f059da]/10 rounded-lg transition-all ${
          user.subscription.status === 'active' 
            ? 'text-emerald-500 hover:text-emerald-400' 
            : 'text-red-500 hover:text-red-400'
        }`}
        onClick={onManageSubscription}
        title={`Subscription: ${user.subscription.type} (${user.subscription.status})`}
      >
        <Ban className="h-4 w-4" />
      </button>

      <button 
        className="p-2 hover:bg-[#f059da]/10 rounded-lg text-white/80 hover:text-[#f059da] transition-all"
        title="Manage Notifications"
      >
        <Bell className="h-4 w-4" />
      </button>

      <button 
        className="p-2 hover:bg-red-500/10 rounded-lg text-white/80 hover:text-red-500 transition-all"
        title="Block User"
      >
        <X className="h-4 w-4" />
      </button>
    </>
  );
} 