import axios from 'axios';

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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
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
