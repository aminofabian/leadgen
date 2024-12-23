"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/default-avatar.png" />
          <AvatarFallback className="bg-[#f059da]">IG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-white border-[#f059da]/20" align="end">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-[#f059da]/10"
          onClick={() => router.push("/settings")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-[#f059da]/10"
          onClick={() => router.push("/auth/logout")}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
