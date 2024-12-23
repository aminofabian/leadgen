"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Jost } from "next/font/google";
import BackButton from "./BackButton";
import Header from "./Header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const font = Jost({
  subsets: ["latin"],
  weight: ["700"],
});

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "w-full relative",
        "bg-black/40 backdrop-blur-xl text-white",
        "border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        "transition-all duration-300",
        "rounded-2xl",
        "hover:shadow-[0_8px_32px_rgba(240,89,218,0.2)]",
        "group",
        font.className
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#f059da]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content container */}
      <div className="relative flex flex-col p-6 sm:p-8">
        <CardHeader className="p-0 space-y-4">
          <Header label={headerLabel} />
        </CardHeader>
        
        <CardContent className="flex-1 p-0 mt-8">
          {children}
        </CardContent>
        
        {showSocial && (
          <CardFooter className="p-0 mt-6">
            {/* <Social /> */}
          </CardFooter>
        )}
        
        <CardFooter className="flex items-center justify-center p-0 mt-6 pt-6 border-t border-white/10">
          <BackButton 
            href={backButtonHref} 
            label={backButtonLabel}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardWrapper;