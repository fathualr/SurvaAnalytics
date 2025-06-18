'use client';

import { Input } from '@/components/ui/input';
import { FormGroup } from '@/components/umum/form/form-group';
import { usePengguna } from '../../hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface FormDetailAdminProps {
  userId: string;
}

export const FormDetailAdmin = ({ userId }: FormDetailAdminProps) => {
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
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data pengguna. {error?.message && `(${error.message})`}
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="text-sm"
        >
          Coba Lagi
        </Button>
      </div>
    );
  }

  const user = data.data;
  const admin = user.Admin;

  return (
    <div className="space-y-4">
      <FormGroup label="Email" htmlFor="email">
        <Input
          id="email"
          value={user.email}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Role" htmlFor="role">
        <Input
          id="role"
          value={user.role}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Nama Admin" htmlFor="nama_admin">
        <Input
          id="nama_admin"
          value={admin?.nama_admin || '-'}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Kontak Darurat" htmlFor="kontak_darurat">
        <Input
          id="kontak_darurat"
          value={admin?.kontak_darurat || '-'}
          readOnly
          disabled
        />
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
