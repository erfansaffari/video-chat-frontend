'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Auth from '@/components/Auth';

export default function AuthPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();

    // If user is logged in and verified, redirect to dashboard
    if (user && user.email_confirmed_at) {
      router.push('/dashboard');
      return;
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#4B2080] to-black">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#FFCC00]/30"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-[#FFCC00] animate-spin"></div>
          </div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#4B2080] to-black">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#FDB714] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#4B2080] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black mb-2">
              <span className="bg-gradient-to-r from-[#FDB714] via-[#FFCC00] to-[#FDB714] bg-clip-text text-transparent animate-gradient">
                Campus
              </span>
              <span className="text-white">Shuffle</span>
            </h1>
            <p className="text-white/60 text-sm">Meet Fellow Students Instantly</p>
          </div>

          {/* Auth Form */}
          <Auth />
        </div>
      </div>
    </main>
  );
}

