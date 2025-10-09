'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import VideoChat from '@/components/VideoChat';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/auth');
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

    setIsVerified(true);
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

  return isVerified ? <VideoChat /> : null;
}

