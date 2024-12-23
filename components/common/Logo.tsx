import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-3 group">
        <div className="relative transition-transform duration-300 group-hover:scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/30 to-[#a03494]/30 rounded-full blur-md" />
          <Image 
            src="/instagram-icon.png" 
            alt="Logo" 
            width={50} 
            height={50}
            className="object-contain relative z-10 drop-shadow-[0_0_8px_rgba(240,89,218,0.5)]"
          />
        </div>
        <h1 className={cn(
          "text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#f059da] to-[#a03494]",
          "transition-all duration-300 group-hover:from-[#f059da] group-hover:to-[#f059da]",
          font.className
        )}>
          IgLeadGen
        </h1>
      </div>
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  );
};

export default Header;