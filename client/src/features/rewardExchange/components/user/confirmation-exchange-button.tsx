'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useCreateRewardExchange } from '@/features/rewardExchange/hooks/useUserRewardExchange';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RewardExchangePreviewProps {
  idHadiah: string;
  hargaPoin: number;
  onSuccessClose?: () => void;
}

export default function RewardExchangePreview({
  idHadiah,
  hargaPoin,
  onSuccessClose,
}: RewardExchangePreviewProps) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const { profile, isLoading } = useProfile(shouldFetch);
  const createExchange = useCreateRewardExchange();

  const currentPoin = parseInt(profile?.Umum?.poin ?? '0', 10);
  const remainingPoin = currentPoin - hargaPoin;
  const isNotEnough = remainingPoin < 0;

  const handleConfirm = () => {
    if (!idHadiah) return toast.error('ID Hadiah tidak ditemukan');

    createExchange.mutate(
      { id_hadiah: idHadiah },
      {
        onSuccess: () => {
          toast.success('Penukaran hadiah berhasil!');
          onSuccessClose?.();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan saat menukar hadiah.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-56" />
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="bg-gray-200 p-2 rounded-md">
        <p>
          <strong>Poin Anda:</strong> {currentPoin.toLocaleString()} Poin
        </p>
        <p>
          <strong>Sisa Poin setelah penukaran:</strong>{' '}
          <span className={isNotEnough ? 'text-red-500 font-semibold' : ''}>
            {remainingPoin.toLocaleString()} Poin
          </span>
        </p>
      </div>

      <Button
        className="w-full bg-secondary-1 text-primary-1 hover:bg-secondary-2"
        disabled={isNotEnough || createExchange.isPending}
        onClick={handleConfirm}
      >
        {createExchange.isPending
          ? 'Memproses...'
          : isNotEnough
          ? 'Poin Tidak Cukup'
          : 'Konfirmasi Penukaran'}
      </Button>
    </div>
  );
}
