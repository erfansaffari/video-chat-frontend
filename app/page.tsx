'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background with University Colors */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#4B2080] to-black">
        {/* Animated Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#FDB714] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#4B2080] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          
          {/* University Badges */}
          <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
            <div className="glassmorphism px-6 py-3 rounded-full border border-white/20">
              <span className="text-[#FDB714] font-bold text-lg">University of Waterloo</span>
            </div>
            <div className="text-white/40 text-2xl">×</div>
            <div className="glassmorphism px-6 py-3 rounded-full border border-white/20">
              <span className="text-[#FFCC00] font-bold text-lg">Wilfrid Laurier University</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-7xl md:text-8xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#FDB714] via-[#FFCC00] to-[#FDB714] bg-clip-text text-transparent animate-gradient">
                  Campus
                </span>
                <span className="text-white"> Connect</span>
              </h1>
              <div className="flex items-center justify-center gap-3 text-xl text-white/80">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FDB714]"></div>
                <p>Meet fellow students instantly</p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFCC00]"></div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="glassmorphism-card rounded-3xl p-8 md:p-12 mb-8 border border-white/20 shadow-2xl backdrop-blur-xl">
            <p className="text-white/90 text-xl mb-8 leading-relaxed text-center">
              Connect with students from <span className="text-[#FDB714] font-semibold">Waterloo</span> and{' '}
              <span className="text-[#FFCC00] font-semibold">Laurier</span> for random 1-on-1 video conversations.
              Make friends, study together, or just chat!
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-8">
              <Link
                href="/chat"
                className="group relative px-12 py-5 bg-gradient-to-r from-[#FDB714] to-[#FFCC00] text-black text-xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  🎥 Start Chatting
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FDB714] mb-1">100%</div>
                <div className="text-white/60 text-sm">Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFCC00] mb-1">24/7</div>
                <div className="text-white/60 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4B2080] mb-1">∞</div>
                <div className="text-white/60 text-sm">Connections</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Feature 1 */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10 hover:border-[#FDB714]/50 transition-all duration-300 group">
              <div className="text-[#FDB714] mb-4 transform group-hover:scale-110 transition-transform">
                <svg className="w-14 h-14 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 text-center">HD Video Chat</h3>
              <p className="text-white/70 text-sm text-center">
                Crystal-clear video powered by advanced WebRTC technology
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10 hover:border-[#FFCC00]/50 transition-all duration-300 group">
              <div className="text-[#FFCC00] mb-4 transform group-hover:scale-110 transition-transform">
                <svg className="w-14 h-14 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 text-center">Random Matching</h3>
              <p className="text-white/70 text-sm text-center">
                Meet new students from both universities every time
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glassmorphism-card rounded-2xl p-6 border border-white/10 hover:border-[#4B2080]/50 transition-all duration-300 group">
              <div className="text-[#4B2080] mb-4 transform group-hover:scale-110 transition-transform">
                <div className="w-14 h-14 mx-auto bg-[#4B2080] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 text-center">Private & Secure</h3>
              <p className="text-white/70 text-sm text-center">
                End-to-end encrypted connections. No data stored.
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="glassmorphism-card rounded-3xl p-8 border border-white/10 mb-8">
            <h3 className="text-white font-bold text-2xl mb-6 text-center">
              <span className="bg-gradient-to-r from-[#FDB714] to-[#FFCC00] bg-clip-text text-transparent">
                How It Works
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FDB714] to-[#FFCC00] rounded-2xl flex items-center justify-center text-black text-2xl font-bold shadow-lg transform hover:rotate-6 transition-transform">
                  1
                </div>
                <p className="text-white/80">Click "Start Chatting" and allow camera access</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FFCC00] to-[#FDB714] rounded-2xl flex items-center justify-center text-black text-2xl font-bold shadow-lg transform hover:rotate-6 transition-transform">
                  2
                </div>
                <p className="text-white/80">Get matched with a fellow student instantly</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FDB714] to-[#FFCC00] rounded-2xl flex items-center justify-center text-black text-2xl font-bold shadow-lg transform hover:rotate-6 transition-transform">
                  3
                </div>
                <p className="text-white/80">Chat, make friends, or click "Next" for someone new!</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">
              By using Campus Connect, you agree to be respectful and follow community guidelines.
            </p>
            <p className="text-white/30 text-xs">
              For students of University of Waterloo and Wilfrid Laurier University
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </main>
  );
}
