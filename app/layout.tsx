import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "IgLeadGen || Instagram Growth Tool",
  description: "IgLeadGen - Instagram Growth and Lead Generation Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="relative bg-[#0a0a0a]">
              {/* Content */}
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="hidden md:flex h-full md:w-72 md:flex-col md:fixed md:inset-y-0 z-50">
                  <Sidebar />
                </div>

                {/* Main content */}
                <main className="md:pl-72 flex-1 min-h-screen">
                  <Navbar />
                  <div className="container mx-auto px-4 py-6 mt-20">
                    <Toaster position="top-center" />
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </SessionProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
