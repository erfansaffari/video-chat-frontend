'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/auth');
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/auth');
      return;
    }

    // Check if email is verified
    if (!user.email_confirmed_at) {
      router.push('/verify-email');
      return;
    }

    setUser(user);
    setLoading(false);
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

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

      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl md:text-4xl font-black">
              <span className="bg-gradient-to-r from-[#FDB714] via-[#FFCC00] to-[#FDB714] bg-clip-text text-transparent animate-gradient">
                Campus
              </span>
              <span className="text-white">Shuffle</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-bold rounded-full border border-white/20 transition-all"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="glassmorphism-card rounded-3xl p-8 md:p-12 mb-6 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FDB714] to-[#FFCC00] rounded-full flex items-center justify-center text-4xl">
                🎓
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back!
              </h1>
              <p className="text-white/70">
                {user?.email}
              </p>
            </div>

            {/* Start Chat Button */}
            <div className="text-center mb-6">
              <Link
                href="/chat"
                className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#FDB714] to-[#FFCC00] hover:from-[#FFCC00] hover:to-[#FDB714] text-black text-xl font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                🎥 Start Video Chat
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p className="text-white/60 text-sm text-center">
              Click to be matched with a random student from Waterloo or Laurier
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10">
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-white font-bold text-lg mb-2">Your Profile</h3>
              <p className="text-white/70 text-sm mb-4">
                Verified university student
              </p>
              <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold">
                ✓ Verified
              </div>
            </div>

            {/* University Card */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10">
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="text-white font-bold text-lg mb-2">University</h3>
              <p className="text-white/70 text-sm">
                {user?.email?.includes('uwaterloo') ? 'University of Waterloo' : 'Wilfrid Laurier University'}
              </p>
            </div>

            {/* Stats Card */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-bold text-lg mb-2">Ready to Connect</h3>
              <p className="text-white/70 text-sm">
                Meet other students instantly
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-8 glassmorphism-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-bold text-xl mb-4 text-center">
              <span className="bg-gradient-to-r from-[#FDB714] to-[#FFCC00] bg-clip-text text-transparent">
                How It Works
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="text-white/70 text-sm">Click "Start Video Chat"</p>
              </div>
              <div>
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="text-white/70 text-sm">Get matched with a student</p>
              </div>
              <div>
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="text-white/70 text-sm">Chat, make friends, or click "Next"!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

