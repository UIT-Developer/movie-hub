import axios from 'axios';

const rawBaseTop = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
const normalizedTop = rawBaseTop.replace(/\/+$|\s+$/g, '').replace(/\/api\/v1$/i, '') || undefined;

const api = axios.create({
  baseURL: normalizedTop,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;

// Attach Clerk token to top-level api client as well (client-side only)
api.interceptors.request.use(
  async (config) => {
    try {
      if (typeof window === 'undefined') return config;
      const clerkModule = await import('@clerk/nextjs');
      const clerkTyped = clerkModule as unknown as {
        getToken?: () => Promise<string | undefined>;
        default?: { getToken?: () => Promise<string | undefined> };
      };
      const getTokenFn = clerkTyped.getToken ?? clerkTyped.default?.getToken;
      if (typeof getTokenFn === 'function') {
        const token = await getTokenFn();
        if (token) {
          config.headers = config.headers || {};
          (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);
