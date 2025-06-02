'use client'

import { useState } from 'react';
import { UserProfile } from '../types';
import { profileService } from '../api';

export function useProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const payload: any = {
        umum: {
          ...(data.Umum?.nama && { nama: data.Umum.nama }),
          ...(data.Umum?.profil_responden && { profil_responden: data.Umum.profil_responden }),
          ...(data.Umum?.profil_klien && {
            profil_klien: Object.fromEntries(
              Object.entries(data.Umum.profil_klien).filter(([_, v]) => v !== '')
            )
          })
        }
      }

      await profileService.updateProfile(payload);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Gagal memperbarui profil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditing,
    loading,
    error,
    setIsEditing,
    updateProfile,
    setError,
  };
}
