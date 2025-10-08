'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import type { ConnectionStatus, MatchedEvent, SignalEvent, MediaError } from '@/lib/types';

const SIGNALING_SERVER_URL = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL || 'http://localhost:3001';
const CONNECTION_TIMEOUT = 15000; // 15 seconds

export default function VideoChat() {
  // State management
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState<MediaError | null>(null);
  const [partnerId, setPartnerId] = useState<string | null>(null);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = useCallback((leaveQueue = false) => {
    console.log('🧹 Cleaning up connections...');

    // Clear timeout
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }

    // Destroy peer connection
    if (peerRef.current) {
      try {
        peerRef.current.destroy();
      } catch (e) {
        console.error('Error destroying peer:', e);
      }
      peerRef.current = null;
    }

    // Stop remote stream
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(track => track.stop());
      remoteStreamRef.current = null;
    }

    // Clear remote video
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Leave queue if requested
    if (leaveQueue && socketRef.current) {
      socketRef.current.emit('leave');
    }

    setPartnerId(null);
  }, []);

  // Stop all media and disconnect
  const stopEverything = useCallback(() => {
    console.log('🛑 Stopping everything...');

    cleanup(true);

    // Disconnect socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Clear local video
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    setConnectionStatus('idle');
  }, [cleanup]);

  // Create peer connection
  const createPeer = useCallback((initiator: boolean, stream: MediaStream, targetPartnerId: string) => {
    console.log(`🔗 Creating peer connection (initiator: ${initiator})`);

    const peer = new SimplePeer({
      initiator,
      trickle: true,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
        ]
      }
    });

    // Handle signals (send to signaling server)
    peer.on('signal', (signal) => {
      console.log('📡 Sending signal to partner');
      socketRef.current?.emit('signal', {
        to: targetPartnerId,
        signal
      });
    });

    // Handle incoming stream
    peer.on('stream', (remoteStream) => {
      console.log('🎥 Received remote stream');
      remoteStreamRef.current = remoteStream;
      
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      
      setConnectionStatus('connected');
      
      // Clear timeout since connection succeeded
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
    });

    // Handle errors
    peer.on('error', (err) => {
      console.error('❌ Peer error:', err);
      setError({
        type: 'connection',
        message: 'Connection failed. Looking for another person...'
      });
      
      // Auto-retry by rejoining queue
      setTimeout(() => {
        cleanup();
        setError(null);
        setConnectionStatus('waiting');
        socketRef.current?.emit('join-queue');
      }, 2000);
    });

    // Handle close
    peer.on('close', () => {
      console.log('🔌 Peer connection closed');
      cleanup();
      setConnectionStatus('waiting');
      socketRef.current?.emit('join-queue');
    });

    peerRef.current = peer;

    // Set connection timeout
    connectionTimeoutRef.current = setTimeout(() => {
      console.log('⏱️ Connection timeout');
      setError({
        type: 'connection',
        message: 'Connection timeout. Trying again...'
      });
      
      cleanup();
      setTimeout(() => {
        setError(null);
        setConnectionStatus('waiting');
        socketRef.current?.emit('join-queue');
      }, 2000);
    }, CONNECTION_TIMEOUT);

  }, [cleanup]);

  // Handle next button
  const handleNext = useCallback(() => {
    console.log('⏭️ Next button clicked');
    
    cleanup();
    setConnectionStatus('waiting');
    socketRef.current?.emit('next');
  }, [cleanup]);

  // Handle stop button
  const handleStop = useCallback(() => {
    console.log('👋 Stop button clicked');
    stopEverything();
    window.location.href = '/';
  }, [stopEverything]);

  // Retry permissions
  const retryPermissions = useCallback(async () => {
    setError(null);
    setConnectionStatus('requesting-permissions');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      console.log('✓ Media permissions granted');
      setConnectionStatus('waiting');
      
      // Join queue
      socketRef.current?.emit('join-queue');
      
    } catch (err: any) {
      console.error('❌ Failed to get media permissions:', err);
      setError({
        type: 'permissions',
        message: err.name === 'NotAllowedError' 
          ? 'Camera and microphone access denied. Please allow access and try again.'
          : 'Failed to access camera/microphone. Please check your device settings.'
      });
      setConnectionStatus('error');
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (!mounted) return;

      console.log('🚀 Initializing video chat...');
      setConnectionStatus('requesting-permissions');

      // Request media permissions
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        if (!mounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        console.log('✓ Media permissions granted');

        // Connect to signaling server
        const socket = io(SIGNALING_SERVER_URL, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
        });

        socketRef.current = socket;

        socket.on('connect', () => {
          console.log('✓ Connected to signaling server');
          setConnectionStatus('waiting');
          socket.emit('join-queue');
        });

        socket.on('matched', (data: MatchedEvent) => {
          console.log('🤝 Matched with partner:', data.partnerId);
          setPartnerId(data.partnerId);
          setConnectionStatus('connecting');

          if (localStreamRef.current) {
            createPeer(data.initiator, localStreamRef.current, data.partnerId);
          }
        });

        socket.on('signal', (data: SignalEvent) => {
          console.log('📡 Received signal from partner');
          if (peerRef.current) {
            try {
              peerRef.current.signal(data.signal);
            } catch (err) {
              console.error('Error processing signal:', err);
            }
          }
        });

        socket.on('peer-left', () => {
          console.log('👋 Partner left');
          setError({
            type: 'connection',
            message: 'Partner disconnected. Looking for someone new...'
          });
          
          cleanup();
          
          setTimeout(() => {
            setError(null);
            setConnectionStatus('waiting');
            socket.emit('join-queue');
          }, 2000);
        });

        socket.on('disconnect', () => {
          console.log('⚠️ Disconnected from signaling server');
          setError({
            type: 'network',
            message: 'Lost connection to server. Reconnecting...'
          });
        });

        socket.on('connect_error', (err) => {
          console.error('❌ Connection error:', err);
          setError({
            type: 'network',
            message: 'Cannot connect to server. Please check your internet connection.'
          });
          setConnectionStatus('error');
        });

      } catch (err: any) {
        console.error('❌ Failed to get media permissions:', err);
        
        if (!mounted) return;

        setError({
          type: 'permissions',
          message: err.name === 'NotAllowedError'
            ? 'Camera and microphone access denied. Please allow access and try again.'
            : 'Failed to access camera/microphone. Please check your device settings.'
        });
        setConnectionStatus('error');
      }
    };

    initialize();

    // Cleanup on unmount
    return () => {
      mounted = false;
      console.log('🧹 Component unmounting, cleaning up...');
      
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [createPeer, cleanup]);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Remote video (full screen) */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Local video (small, bottom-right corner) */}
      <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Status overlay */}
      {connectionStatus !== 'connected' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="text-center px-6">
            {connectionStatus === 'requesting-permissions' && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h2 className="text-2xl font-semibold text-white mb-2">Requesting Permissions...</h2>
                <p className="text-gray-400">Please allow camera and microphone access</p>
              </>
            )}

            {connectionStatus === 'waiting' && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h2 className="text-2xl font-semibold text-white mb-2">Looking for a match...</h2>
                <p className="text-gray-400">Waiting for someone to connect with you</p>
              </>
            )}

            {connectionStatus === 'connecting' && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                <h2 className="text-2xl font-semibold text-white mb-2">Connecting...</h2>
                <p className="text-gray-400">Establishing connection with your match</p>
              </>
            )}

            {connectionStatus === 'error' && error && (
              <>
                <div className="text-red-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Connection Error</h2>
                <p className="text-gray-400 mb-6">{error.message}</p>
                
                {error.type === 'permissions' && (
                  <button
                    onClick={retryPermissions}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Error toast (for non-critical errors) */}
      {error && connectionStatus !== 'error' && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {error.message}
        </div>
      )}

      {/* Control buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={handleNext}
          disabled={connectionStatus !== 'connected'}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          Next
        </button>

        <button
          onClick={handleStop}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Stop
        </button>
      </div>
    </div>
  );
}

