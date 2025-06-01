import axios from 'axios';
import { authService } from '@/features/auth/api';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const response = await authService.refreshToken();
        const newAccessToken = response.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      const errorMessage =
        error.response.data?.message || 
        error.response.data?.error ||
        'An unexpected server error occurred';
      
      const customError = new Error(errorMessage);
      customError.name = `HTTP_${error.response.status}`;
      return Promise.reject(customError);
    } else if (error.request) {
      return Promise.reject(new Error('No response received from server'));
    } else {
      return Promise.reject(error);
    }
  }
);
