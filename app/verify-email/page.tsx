'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  const resendEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      setResent(true);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#4B2080] to-black">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#FDB714] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="glassmorphism-card rounded-3xl p-8 md:p-12 max-w-md border border-white/20 text-center">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Check Your Email
          </h1>
          <p className="text-white/80 mb-6">
            We sent you a verification link to your university email. 
            Please check your inbox and click the link to verify your account.
          </p>
          
          <button
            onClick={resendEmail}
            disabled={resent}
            className="px-6 py-3 bg-gradient-to-r from-[#FDB714] to-[#FFCC00] hover:from-[#FFCC00] hover:to-[#FDB714] disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-full hover:scale-105 transition-all disabled:cursor-not-allowed"
          >
            {resent ? '✓ Email Resent!' : 'Resend Email'}
          </button>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm mb-3">
              After verifying, return to CampusShuffle and sign in!
            </p>
            <Link 
              href="/auth" 
              className="text-[#FDB714] hover:text-[#FFCC00] text-sm font-semibold"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

