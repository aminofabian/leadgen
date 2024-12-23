// app/unauthorized/page.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
    <Card className="w-[380px] p-6 shadow-lg border-red-200">
    <div className="flex flex-col items-center space-y-6 text-center">
    {/* Icon */}
    <div className="rounded-full bg-red-100 p-3">
    <ShieldX className="w-8 h-8 text-red-500" />
    </div>
    
    {/* Title */}
    <div className="space-y-2">
    <h1 className="text-2xl font-bold tracking-tight text-red-700">
    Access Denied
    </h1>
    <p className="text-sm text-red-600">
    You don&apos;t have permission to access this page.
    </p>
    </div>
    
    {/* Divider */}
    <div className="w-full border-t border-red-200" />
    
    {/* Action Button */}
    <div className="space-y-3 w-full">
    <Link href="/" className="w-full">
    <Button 
    className="w-full bg-red-600 hover:bg-red-700 text-white" 
    size="lg"
    >
    Return to Home
    </Button>
    </Link>
    <p className="text-xs text-red-500">
    If you believe this is an error, please contact our administrator.
    </p>
    </div>
    </div>
    </Card>
    </div>
  );
}