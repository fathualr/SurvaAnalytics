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
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(255).optional().or(z.literal('')),
  email_confirmed: z.enum(['true', 'false']),
  nama: z.string().max(255),
  tanggal_lahir: z.string().optional(),
  jenis_kelamin: z.enum(['laki-laki', 'perempuan']).optional(),
  region: z.string().optional(),
  status: z.string().optional(),
  nama_klien: z.string().optional(),
  kontak_klien: z.string().optional(),
  alamat_klien: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FormEditUmumProps {
  userId: string;
}

export const FormEditUmum = ({ userId }: FormEditUmumProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const { data, isLoading, isFetching, isError, error, refetch } = usePengguna(userId, shouldFetch);
  const { mutateAsync: updatePengguna, isPending: isUpdating } = useUpdatePengguna();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      email_confirmed: 'false',
      nama: '',
      tanggal_lahir: '',
      jenis_kelamin: undefined,
      region: '',
      status: '',
      nama_klien: '',
      kontak_klien: '',
      alamat_klien: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      const umum = user.Umum;

      reset({
        email: user.email,
        password: '',
        email_confirmed: String(user.email_confirmed ?? 'false') as 'true' | 'false',
        nama: umum?.nama ?? '',
        tanggal_lahir: umum?.profil_responden?.tanggal_lahir ?? '',
        jenis_kelamin: umum?.profil_responden?.jenis_kelamin as 'laki-laki' | 'perempuan' | undefined,
        region: umum?.profil_responden?.region ?? '',
        status: umum?.profil_responden?.status ?? '',
        nama_klien: umum?.profil_klien?.nama_klien ?? '',
        kontak_klien: umum?.profil_klien?.kontak_klien ?? '',
        alamat_klien: umum?.profil_klien?.alamat_klien ?? '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: FormValues) => {
    try {
      await updatePengguna({
        id: userId,
        payload: {
          email: formData.email,
          password: formData.password || undefined,
          email_confirmed: formData.email_confirmed === 'true',
          role: 'umum',
          umum: {
            nama: formData.nama,
            profil_responden: {
              tanggal_lahir: formData.tanggal_lahir,
              jenis_kelamin: formData.jenis_kelamin,
              region: formData.region,
              status: formData.status,
            },
            profil_klien: {
              nama_klien: formData.nama_klien,
              kontak_klien: formData.kontak_klien,
              alamat_klien: formData.alamat_klien,
            },
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
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
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

      <FormGroup label="Status Email" htmlFor="email_confirmed">
        <select
          id="email_confirmed"
          {...register('email_confirmed')}
          className="border bg-accent-1 rounded-md w-full h-10"
        >
          <option value="true">Terverifikasi</option>
          <option value="false">Belum Terverifikasi</option>
        </select>
        {errors.email_confirmed && <p className="text-sm text-red-500">{errors.email_confirmed.message}</p>}
      </FormGroup>

      <FormGroup label="Nama" htmlFor="nama">
        <Input id="nama" {...register('nama')} />
        {errors.nama && <p className="text-sm text-red-500">{errors.nama.message}</p>}
      </FormGroup>

      <FormGroup label="Tanggal Lahir" htmlFor="tanggal_lahir">
        <Input id="tanggal_lahir" type="date" {...register('tanggal_lahir')} />
        {errors.tanggal_lahir && <p className="text-sm text-red-500">{errors.tanggal_lahir.message}</p>}
      </FormGroup>

      <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
        <select
          id="jenis_kelamin"
          {...register('jenis_kelamin')}
          className="border bg-accent-1 rounded-md w-full h-10"
        >
          <option disabled value="">Pilih Jenis Kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
        {errors.jenis_kelamin && <p className="text-sm text-red-500">{errors.jenis_kelamin.message}</p>}
      </FormGroup>

      <FormGroup label="Region" htmlFor="region">
        <Input id="region" {...register('region')} />
        {errors.region && <p className="text-sm text-red-500">{errors.region.message}</p>}
      </FormGroup>

      <FormGroup label="Status Pekerjaan / Pendidikan" htmlFor="status">
        <Input id="status" {...register('status')} />
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </FormGroup>

      <FormGroup label="Nama Klien" htmlFor="nama_klien">
        <Input id="nama_klien" {...register('nama_klien')} />
        {errors.nama_klien && <p className="text-sm text-red-500">{errors.nama_klien.message}</p>}
      </FormGroup>

      <FormGroup label="Kontak Klien" htmlFor="kontak_klien">
        <Input id="kontak_klien" {...register('kontak_klien')} />
        {errors.kontak_klien && <p className="text-sm text-red-500">{errors.kontak_klien.message}</p>}
      </FormGroup>

      <FormGroup label="Alamat Klien" htmlFor="alamat_klien">
        <Input id="alamat_klien" {...register('alamat_klien')} />
        {errors.alamat_klien && <p className="text-sm text-red-500">{errors.alamat_klien.message}</p>}
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
