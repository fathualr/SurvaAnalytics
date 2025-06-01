'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../api';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000);

    setLoading(false);
    return () => clearInterval(interval);
  }, []);

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      if (response.status === 'success' && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await logout();
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }
  };

  return {
    loading,
    logout,
    refreshToken,
  };
}
