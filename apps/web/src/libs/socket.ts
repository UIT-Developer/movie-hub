import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let runtimeConfig: { NEXT_PUBLIC_WEBSOCKET_URL?: string } | null = null;

/**
 * Fetch runtime configuration from server
 * This allows Docker to use runtime env vars instead of build-time
 */
async function getRuntimeConfig() {
  if (runtimeConfig) return runtimeConfig;
  
  try {
    const response = await fetch('/api/config');
    runtimeConfig = await response.json();
    console.log('[Socket] Runtime config loaded:', runtimeConfig?.NEXT_PUBLIC_WEBSOCKET_URL);
    return runtimeConfig;
  } catch (error) {
    console.error('[Socket] Failed to fetch runtime config:', error);
    return null;
  }
}

export const getSocket = async (showtimeId: string, token: string): Promise<Socket | null> => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!socket) {
    // Fetch runtime config from server
    const config = await getRuntimeConfig();
    let SOCKET_URL = config?.NEXT_PUBLIC_WEBSOCKET_URL;
    
    // If no URL from config, construct from current location
    if (!SOCKET_URL) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      SOCKET_URL = `${protocol}//${window.location.host}`;
    }
    
    console.log('[Socket] Connecting to:', SOCKET_URL);
    console.log('[Socket] Current location:', window.location.href);
    
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: false,
      auth: { token: token },
      query: { showtimeId: showtimeId },
    });
    
    // Debug connection events
    socket.on('connect', () => {
      console.log('[Socket] ✅ Connected successfully to', SOCKET_URL);
    });
    
    socket.on('connect_error', (error) => {
      console.error('[Socket] ❌ Connection error:', error.message);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });
  }
  
  return socket;
};
