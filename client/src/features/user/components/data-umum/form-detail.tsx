'use client';

import { Input } from '@/components/ui/input';
import { FormGroup } from '@/components/umum/form/form-group';
import { usePengguna } from '../../hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface FormDetailUmumProps {
  userId: string;
}

export const FormDetailUmum = ({ userId }: FormDetailUmumProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePengguna(userId, shouldFetch);

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data pengguna. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  const user = data.data;
  const umum = user.Umum;
  const responden = umum?.profil_responden;
  const klien = umum?.profil_klien;

  return (
    <div className="space-y-4">
      <FormGroup label="Email" htmlFor="email">
        <Input id="email" value={user.email} readOnly disabled />
      </FormGroup>

      <FormGroup label="Status Email" htmlFor="email_confirmed">
        <Input id="email_confirmed" value={user.email_confirmed ? 'Sudah Terverifikasi' : 'Belum Terverifikasi'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Role" htmlFor="role">
        <Input id="role" value={user.role} readOnly disabled />
      </FormGroup>

      <FormGroup label="Nama" htmlFor="nama">
        <Input id="nama" value={umum?.nama || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Tanggal Lahir" htmlFor="tanggal_lahir">
        <Input id="tanggal_lahir" value={responden?.tanggal_lahir || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
        <Input id="jenis_kelamin" value={responden?.jenis_kelamin || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Region" htmlFor="region">
        <Input id="region" value={responden?.region || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Status Pekerjaan / Pendidikan" htmlFor="status">
        <Input id="status" value={responden?.status || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Nama Klien" htmlFor="nama_klien">
        <Input id="nama_klien" value={klien?.nama_klien || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Kontak Klien" htmlFor="kontak_klien">
        <Input id="kontak_klien" value={klien?.kontak_klien || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Alamat Klien" htmlFor="alamat_klien">
        <Input id="alamat_klien" value={klien?.alamat_klien || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Poin" htmlFor="poin">
        <Input id="poin" value={umum?.poin || '0'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Tanggal Dibuat" htmlFor="created_at">
        <Input
          id="created_at"
          value={new Date(user.created_at).toLocaleString()}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Terakhir Diperbarui" htmlFor="updated_at">
        <Input
          id="updated_at"
          value={new Date(user.updated_at).toLocaleString()}
          readOnly
          disabled
        />
      </FormGroup>
    </div>
  );
};
