'use client';

import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';

export default function PointField() {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const { profile, isLoading } = useProfile(shouldFetch);

  return (
    <Input
      type="text"
      placeholder="Nilai Poin"
      readOnly
      value={isLoading ? 'Memuat...' : `Poin anda: ${parseInt(profile?.Umum?.poin ?? '0', 10).toLocaleString()}`}
      className="md:max-w-xs"
    />
  );
}
