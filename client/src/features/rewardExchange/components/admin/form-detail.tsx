'use client';

import { Input } from '@/components/ui/input';
import { FormGroup } from '@/components/umum/form/form-group';
import { useAdminRewardExchange } from '../../hooks/useAdminRewardExchange';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface FormDetailRewardExchangeProps {
  rewardExchangeId: string;
}

export const FormDetailRewardExchange = ({
  rewardExchangeId,
}: FormDetailRewardExchangeProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAdminRewardExchange(rewardExchangeId, shouldFetch);

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data penukaran hadiah.{' '}
          {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormGroup label="Nama Penukar" htmlFor="nama_penukar">
        <Input
          id="nama_penukar"
          value={data.Umum?.nama || '-'}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Email Pengguna" htmlFor="email_pengguna">
        <Input
          id="email_pengguna"
          value={data.Umum?.Pengguna?.email || '-'}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Total Poin" htmlFor="total_poin">
        <Input
          id="total_poin"
          value={data.total_poin}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Keterangan" htmlFor="keterangan">
        <Input
          id="keterangan"
          value={data.keterangan || '-'}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Dibuat Pada" htmlFor="created_at">
        <Input
          id="created_at"
          value={new Date(data.created_at).toLocaleString('id-ID')}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Diperbarui Pada" htmlFor="updated_at">
        <Input
          id="updated_at"
          value={new Date(data.updated_at).toLocaleString('id-ID')}
          readOnly
          disabled
        />
      </FormGroup>
    </div>
  );
};
