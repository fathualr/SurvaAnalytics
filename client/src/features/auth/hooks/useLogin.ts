'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../api';
import { LoginPayload } from '../types';
import { api } from '@/lib/api';

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setError(null);
    setLoading(true);

    try {
      const response = await authService.login(payload);

      if (response.status === 'success' && response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        router.push('/explore');
      } else {
        setError(response.message || 'Login gagal');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    setError,
  };
}
