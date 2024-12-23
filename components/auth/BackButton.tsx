'use client';

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({
  href,
  label
}: BackButtonProps) => {
  return (
    <Link 
    href={href}
    className="text-slate-50 text-xs hover:text-[#f059da] underline-offset-4 hover:underline transition-colors mx-auto"
    >
    {label}
    </Link>
  );
};

export default BackButton;