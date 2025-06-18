'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';
import { Skeleton } from '@/components/ui/skeleton';
import { usePengguna, useUpdatePengguna } from '../../hooks/useUser';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';

const formSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(255).optional().or(z.literal('')),
  nama_admin: z.string().max(255),
  kontak_darurat: z.string().max(255),
});

type FormValues = z.infer<typeof formSchema>;

interface FormEditAdminProps {
  userId: string;
}

export const FormEditAdmin = ({ userId }: FormEditAdminProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = usePengguna(userId, shouldFetch);

  const { mutateAsync: updatePengguna, isPending: isUpdating } = useUpdatePengguna();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      nama_admin: '',
      kontak_darurat: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    if (data?.data) {
      const pengguna = data.data;
      reset({
        email: pengguna.email,
        password: '',
        nama_admin: pengguna.Admin?.nama_admin ?? '',
        kontak_darurat: pengguna.Admin?.kontak_darurat ?? '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updatePengguna({
        id: userId,
        payload: {
          email: values.email,
          password: values.password || undefined,
          role: 'admin',
          admin: {
            nama_admin: values.nama_admin,
            kontak_darurat: values.kontak_darurat,
          },
        },
      });

      toast.success('Data pengguna berhasil diperbarui');
      refetch();
    } catch (err: any) {
      toast.error(err?.message || 'Gagal memperbarui data');
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup label="Email" htmlFor="email">
        <Input id="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </FormGroup>

      <FormGroup label="Password (kosongkan jika tidak ingin ubah)" htmlFor="password">
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </FormGroup>

      <FormGroup label="Nama Admin" htmlFor="nama_admin">
        <Input id="nama_admin" {...register('nama_admin')} />
        {errors.nama_admin && <p className="text-sm text-red-500">{errors.nama_admin.message}</p>}
      </FormGroup>

      <FormGroup label="Kontak Darurat" htmlFor="kontak_darurat">
        <Input id="kontak_darurat" {...register('kontak_darurat')} />
        {errors.kontak_darurat && <p className="text-sm text-red-500">{errors.kontak_darurat.message}</p>}
      </FormGroup>

      <Button
        type="submit"
        disabled={isUpdating}
        className="rounded-md bg-primary-2 text-accent-1 border text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
      </Button>
    </form>
  );
};
