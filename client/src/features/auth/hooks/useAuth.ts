'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../api';
import { LoginPayload } from '../types';
import { useAuthStore } from '../store';
import { api } from '@/lib/api';
import { profileService } from '@/features/profile/api';
import { UserProfile } from '@/features/profile/types';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    accessToken,
    setAccessToken,
    clearAccessToken,
    user,
    setUser,
    hydrated
  } = useAuthStore();

  const login = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async (response) => {
      if (response.status === 'success' && response.data?.accessToken) {
        const token = response.data.accessToken;
        setAccessToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const profile = await profileService.getProfile();
        const user = profile.data;
        setUser(user);
        switch (user.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'umum':
            router.push('/explore');
            break;
          default:
            router.push('/');
            break;
        }
      } else {
        setError(response.message || 'Login gagal');
      }
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
    },
  });

  const logout = async () => {
    await authService.logout();
    clearAccessToken();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    queryClient.clear();
    router.push('/login');
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      if (response.status === 'success' && response.data?.accessToken) {
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      } else {
        await logout();
      }
    } catch {
      await logout();
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    profileService
      .getProfile()
      .then((res) => setUser(res.data))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(refreshToken, 1000 * 60 * 15);
    return () => clearInterval(interval);
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    loading,
    error,
    login: login.mutate,
    logout,
    refreshToken,
    setError,
    hydrated,
  };
};
