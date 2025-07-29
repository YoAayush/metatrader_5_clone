"use client";

import { AuthPage } from "@/components/auth-page";
import { Dashboard } from "@/components/dashboard";
import { useAuth } from "@/providers/auth-provider";

export default function Home() {

  const { user, isLoading } = useAuth();
  
  // below codeline is used to generate random jwt secret
  // console.log(require('crypto').randomBytes(32).toString('hex'))
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main>
      {user ? <Dashboard /> : <AuthPage />}
    </main>
  );
}
