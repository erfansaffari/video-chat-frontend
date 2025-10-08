import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            1v1 <span className="text-blue-400">Chat</span>
          </h1>
          <p className="text-xl text-gray-300">
            Connect with random people around the world
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700">
          <p className="text-gray-300 text-lg mb-6">
            Experience spontaneous video conversations with strangers. 
            Click start, get matched instantly, and enjoy face-to-face chats.
          </p>

          {/* Start Button */}
          <Link
            href="/chat"
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Start Chatting
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-blue-400 mb-3">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Instant Video</h3>
            <p className="text-gray-400 text-sm">
              High-quality video chat powered by WebRTC technology
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-green-400 mb-3">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Random Matching</h3>
            <p className="text-gray-400 text-sm">
              Get paired with someone new every time you click Next
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-purple-400 mb-3">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Private & Secure</h3>
            <p className="text-gray-400 text-sm">
              Peer-to-peer connections with no data storage
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4 text-lg">How it works</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</span>
              <p className="text-gray-300 pt-1">Click "Start Chatting" and allow camera/microphone access</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</span>
              <p className="text-gray-300 pt-1">Wait a few seconds while we find you a random match</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</span>
              <p className="text-gray-300 pt-1">Enjoy your conversation! Click "Next" to meet someone new</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>By using this service, you agree to be respectful and follow community guidelines.</p>
        </div>
      </div>
    </main>
  );
}
