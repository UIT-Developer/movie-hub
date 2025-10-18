import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL;

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  if (typeof window === 'undefined') {
    return null
  }
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }
  return socket;
};
