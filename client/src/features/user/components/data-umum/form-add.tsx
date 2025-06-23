'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePengguna } from '../../hooks/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Email tidak valid' }).max(255),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }).max(255),
    password_confirmation: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    nama: z.string().min(1, { message: 'Nama wajib diisi' }).max(255),
    tanggal_lahir: z.string().min(1, { message: 'Tanggal lahir wajib diisi' }),
    jenis_kelamin: z.enum(['laki-laki', 'perempuan'], {
      errorMap: () => ({ message: 'Pilih jenis kelamin' }),
    }),
    region: z.string().min(1, { message: 'Region wajib diisi' }),
    status: z.string().min(1, { message: 'Status wajib diisi' }),
    nama_klien: z.string().optional(),
    kontak_klien: z.string().optional(),
    alamat_klien: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Konfirmasi password tidak cocok',
  });

type FormValues = z.infer<typeof formSchema>;

export const FormAddUmum = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createPengguna } = useCreatePengguna();

  const onSubmit = async (values: FormValues) => {
    try {
      await createPengguna({
        email: values.email,
        password: values.password,
        role: 'umum',
        umum: {
          nama: values.nama,
          profil_responden: {
            tanggal_lahir: values.tanggal_lahir,
            jenis_kelamin: values.jenis_kelamin,
            region: values.region,
            status: values.status,
          },
          profil_klien: {
            nama_klien: values.nama_klien,
            kontak_klien: values.kontak_klien,
            alamat_klien: values.alamat_klien,
          },
        },
      });

      toast.success('Pengguna umum berhasil dibuat');
      reset();
      router.push('/admin/manage-user');
    } catch (err: any) {
      toast.error(err?.message || 'Gagal membuat pengguna');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup label="Email" htmlFor="email">
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </FormGroup>

      <FormGroup label="Password" htmlFor="password">
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </FormGroup>

      <FormGroup label="Konfirmasi Password" htmlFor="password_confirmation">
        <Input id="password_confirmation" type="password" {...register('password_confirmation')} />
        {errors.password_confirmation && (
          <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
        )}
      </FormGroup>

      <FormGroup label="Nama" htmlFor="nama">
        <Input id="nama" type="text" {...register('nama')} />
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
          defaultValue=""
        >
          <option disabled value="">Pilih Jenis Kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
        {errors.jenis_kelamin && <p className="text-sm text-red-500">{errors.jenis_kelamin.message}</p>}
      </FormGroup>

      <FormGroup label="Region" htmlFor="region">
        <Input id="region" type="text" {...register('region')} />
        {errors.region && <p className="text-sm text-red-500">{errors.region.message}</p>}
      </FormGroup>

      <FormGroup label="Status Pekerjaan / Pendidikan" htmlFor="status">
        <Input id="status" type="text" {...register('status')} />
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </FormGroup>

      <FormGroup label="Nama Klien" htmlFor="nama_klien">
        <Input id="nama_klien" type="text" {...register('nama_klien')} />
        {errors.nama_klien && <p className="text-sm text-red-500">{errors.nama_klien.message}</p>}
      </FormGroup>

      <FormGroup label="Kontak Klien" htmlFor="kontak_klien">
        <Input id="kontak_klien" type="text" {...register('kontak_klien')} />
        {errors.kontak_klien && <p className="text-sm text-red-500">{errors.kontak_klien.message}</p>}
      </FormGroup>

      <FormGroup label="Alamat Klien" htmlFor="alamat_klien">
        <Input id="alamat_klien" type="text" {...register('alamat_klien')} />
        {errors.alamat_klien && <p className="text-sm text-red-500">{errors.alamat_klien.message}</p>}
      </FormGroup>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary-2 text-accent-1 border text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan'}
      </Button>
    </form>
  );
};
