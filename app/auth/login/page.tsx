import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13111C] via-[#0F0F0F] to-black relative flex items-center justify-center px-4 py-10">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,#f059da15,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_80%_60%,#f059da08,transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Content */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f059da]/5 to-transparent opacity-50 blur-3xl -z-10" />
        <Suspense
          fallback={
            <div className="w-full h-[600px] rounded-xl bg-black/20 backdrop-blur-sm animate-pulse" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
