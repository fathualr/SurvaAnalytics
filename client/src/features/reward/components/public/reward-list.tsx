'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useHadiahs } from '../../hooks/usePublicHadiah';
import { RewardCard } from './reward-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/umum/pagination';

interface RewardListProps {
  page: number;
  limit?: number;
  filters?: Record<string, any>;
  onPageChange: (newPage: number) => void;
}

export function RewardList({
  page,
  limit = 10,
  filters = {},
  onPageChange,
}: RewardListProps) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    hadiahs,
    isLoading,
    isError,
    errorMessage,
    refetch,
    meta,
  } = useHadiahs({ page, limit, filters, enabled: shouldFetch });

  const totalPages = meta?.total_pages ?? 1;

  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-5 grid-cols-2 md:gap-5 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg w-full h-[200px]"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded">
        <p>{errorMessage || 'Gagal memuat daftar hadiah.'}</p>
        {refetch && (
          <Button variant="destructive" onClick={() => refetch()}>
            Coba Lagi
          </Button>
        )}
      </div>
    );
  }

  if (hadiahs.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground italic">
        Belum ada hadiah tersedia.
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow">
        <div className="grid xl:grid-cols-5 grid-cols-2 md:gap-5 gap-3">
          {hadiahs.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
