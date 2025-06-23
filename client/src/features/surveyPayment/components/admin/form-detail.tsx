'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAdminSurveyPayment } from '../../hooks/useAdminSurveyPayment';

interface FormDetailSurveyPaymentProps {
  paymentId: string;
}

export const FormDetailSurveyPayment = ({ paymentId }: FormDetailSurveyPaymentProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    data: payment,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminSurveyPayment(paymentId, shouldFetch);

  const loading = isLoading || isFetching;

  const formatDate = (date: string | null | undefined) =>
    date
      ? new Date(date).toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-';

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data pembayaran. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormGroup label="Judul Survei" htmlFor="judul">
        <Input id="judul" value={payment.Survei?.judul || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Nama Pembayar" htmlFor="nama_pembayar">
        <Input id="nama_pembayar" value={payment.Umum?.nama || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Email Pembayar" htmlFor="email">
        <Input id="email" value={payment.Umum?.Pengguna?.email || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Jumlah Tagihan" htmlFor="jumlah_tagihan">
        <Input
          id="jumlah_tagihan"
          value={`Rp ${Number(payment.jumlah_tagihan).toLocaleString('id-ID')}`}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Jumlah Dibayar" htmlFor="jumlah_dibayar">
        <Input
          id="jumlah_dibayar"
          value={`Rp ${Number(payment.jumlah_dibayar).toLocaleString('id-ID')}`}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Metode Pembayaran" htmlFor="metode">
        <Input id="metode" value={payment.metode_pembayaran || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Status" htmlFor="status">
        <Input
          id="status"
          value={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Tanggal Dibuat" htmlFor="created_at">
        <Input id="created_at" value={formatDate(payment.created_at)} readOnly disabled />
      </FormGroup>

      <FormGroup label="Terakhir Diperbarui" htmlFor="updated_at">
        <Input id="updated_at" value={formatDate(payment.updated_at)} readOnly disabled />
      </FormGroup>
    </div>
  );
};
