'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../api'
import { LoginPayload, UserProfile } from '../types'
import { api } from '@/lib/api'

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile.data);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
          console.error('[Auth] Failed to load profile:', err);
          await logout();
        }
      }
      setLoading(false);
    };

    initialize();

    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(payload);

      if (response.status === 'success' && response.data?.accessToken) {
        const token = response.data.accessToken;

        localStorage.setItem('accessToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const profile = await authService.getProfile();
        setUser(profile.data);

        router.push('/explore');
      } else {
        setError(response.message || 'Login gagal');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      if (response.status === 'success' && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
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
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      router.push('/login');
    }
  };

  return {
    loading,
    error,
    user,
    role: user?.role || null,
    isLoggedIn: !!user,
    login,
    logout,
    refreshToken,
    setError,
  };
}
