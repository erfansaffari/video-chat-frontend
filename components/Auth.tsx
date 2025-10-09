'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const ALLOWED_DOMAINS = [
  '@uwaterloo.ca',
  '@edu.uwaterloo.ca',
  '@mylaurier.ca',
  '@wlu.ca'
];

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const isValidUniversityEmail = (email: string) => {
    return ALLOWED_DOMAINS.some(domain => 
      email.toLowerCase().endsWith(domain)
    );
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate university email
    if (!isValidUniversityEmail(email)) {
      setMessage('❌ Please use your university email (@uwaterloo.ca or @mylaurier.ca)');
      return;
    }

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/chat`,
      }
    });

    setLoading(false);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Check your university email for the verification link!');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      // Check if email is verified
      if (!data.user?.email_confirmed_at) {
        setMessage('⚠️ Please verify your email first!');
        await supabase.auth.signOut();
      } else {
        window.location.href = '/chat';
      }
    }
  };

  return (
    <div className="glassmorphism-card rounded-3xl p-8 md:p-12 max-w-md mx-auto border border-white/20">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-[#FDB714] to-[#FFCC00] bg-clip-text text-transparent">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </span>
      </h2>

      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
        <div>
          <label className="block text-white/80 mb-2">University Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@uwaterloo.ca"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FDB714] transition-colors"
          />
          <p className="text-white/50 text-xs mt-1">
            Must be @uwaterloo.ca or @mylaurier.ca
          </p>
        </div>

        <div>
          <label className="block text-white/80 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FDB714] transition-colors"
          />
          {isSignUp && (
            <p className="text-white/50 text-xs mt-1">
              At least 6 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-gradient-to-r from-[#FDB714] to-[#FFCC00] hover:from-[#FFCC00] hover:to-[#FDB714] disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : isSignUp ? '🎓 Sign Up' : '🚀 Sign In'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${message.includes('❌') ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/10'} text-white text-center text-sm`}>
          {message}
        </div>
      )}

      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
          setMessage('');
        }}
        className="mt-4 w-full text-white/60 hover:text-white transition-colors text-sm"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-white/50 text-xs text-center">
          Only for students of University of Waterloo & Wilfrid Laurier University
        </p>
      </div>
    </div>
  );
}

