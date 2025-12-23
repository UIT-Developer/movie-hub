import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// API Response wrapper type based on backend format
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

// Error response type
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

// Normalize backend base URL so services can consistently use `/api/v1/...` paths
const rawBase = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000';
// Remove trailing slashes and whitespace
let normalizedBase = rawBase.replace(/\/+$|\s+$/g, '');
// If environment accidentally includes the `/api/v1` prefix, strip it so
// service paths (which already include `/api/v1`) won't be duplicated.
normalizedBase = normalizedBase.replace(/\/api\/v1$/i, '');

// Base API client
const apiClient = axios.create({
  baseURL: normalizedBase,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for auth token
// Attach Clerk token for authenticated admin calls (client-side only).
// We dynamically import `getToken` to avoid server-side import errors.
apiClient.interceptors.request.use(
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
      // Ignore token attach failures — requests can still proceed (will 401 if protected)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// Generic API methods
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data.data;
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },

  delete: async <T = void>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  },
};

export default apiClient;
