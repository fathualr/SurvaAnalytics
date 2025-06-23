'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';
import { useAdminSurvey } from '../../hooks/useAdminSurveys';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface FormDetailSurveyProps {
  surveyId: string;
}

export const FormDetailSurvey = ({ surveyId }: FormDetailSurveyProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminSurvey(surveyId, shouldFetch);

  const loading = isLoading || isFetching;

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data survei. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  const survei = data;

  const formatDate = (date: string | null | undefined) =>
    date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';

  return (
    <div className="space-y-4">
      <FormGroup label="Judul Survei" htmlFor="judul">
        <Input id="judul" value={survei.judul || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Status Survei" htmlFor="status">
        <Input id="status" value={survei.status || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <Input id="deskripsi" value={survei.deskripsi || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Jumlah Responden Dibutuhkan" htmlFor="jumlah_responden">
        <Input id="jumlah_responden" value={survei.jumlah_responden?.toString() || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Tanggal Mulai" htmlFor="tanggal_mulai">
        <Input id="tanggal_mulai" value={formatDate(survei.tanggal_mulai)} readOnly disabled />
      </FormGroup>

      <FormGroup label="Tanggal Berakhir" htmlFor="tanggal_berakhir">
        <Input id="tanggal_berakhir" value={formatDate(survei.tanggal_berakhir)} readOnly disabled />
      </FormGroup>

      <FormGroup label="Poin per Responden" htmlFor="poin">
        <Input id="poin" value={survei.hadiah_poin.toString() || '-'} readOnly disabled />
      </FormGroup>

      <div className="grid grid-cols-1 gap-5 pt-6 border-t">
        <h3 className="font-semibold text-lg">Kriteria Responden</h3>

        <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
          <Input id="jenis_kelamin" value={survei.kriteria.jenis_kelamin || 'Semua'} readOnly disabled />
        </FormGroup>

        <FormGroup label="Usia Minimum" htmlFor="usia_min">
          <Input
            id="usia_min"
            value={Array.isArray(survei.kriteria.usia) && survei.kriteria.usia.length > 0
              ? Math.min(...survei.kriteria.usia).toString()
              : '-'}
            readOnly
            disabled
          />
        </FormGroup>

        <FormGroup label="Usia Maksimum" htmlFor="usia_max">
          <Input
            id="usia_max"
            value={Array.isArray(survei.kriteria.usia) && survei.kriteria.usia.length > 0
              ? Math.max(...survei.kriteria.usia).toString()
              : '-'}
            readOnly
            disabled
          />
        </FormGroup>

        <FormGroup label="Region / Domisili" htmlFor="region">
          <Input id="region" value={survei.kriteria.region?.join(', ') || '-'} readOnly disabled />
        </FormGroup>

        <FormGroup label="Status Pekerjaan / Pendidikan" htmlFor="status">
          <Input id="status" value={survei.kriteria.status?.join(', ') || '-'} readOnly disabled />
        </FormGroup>

        <FormGroup label="Tanggal Dibuat" htmlFor="created_at">
          <Input
            id="created_at"
            value={new Date(survei.created_at).toLocaleString('id-ID')}
            readOnly
            disabled
          />
        </FormGroup>
      </div>

      <FormGroup label="Terakhir Diperbarui" htmlFor="updated_at">
        <Input
          id="updated_at"
          value={new Date(survei.updated_at).toLocaleString('id-ID')}
          readOnly
          disabled
        />
      </FormGroup>
    </div>
  );
};
