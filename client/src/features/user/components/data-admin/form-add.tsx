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
    nama_admin: z.string().min(1, { message: 'Nama wajib diisi' }).max(255),
    kontak_darurat: z.string().min(1, { message: 'Kontak darurat wajib diisi' }).max(255),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Konfirmasi password tidak cocok',
  });

type FormValues = z.infer<typeof formSchema>;

export const FormAddAdmin = () => {
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
        role: 'admin',
        admin: {
          nama_admin: values.nama_admin,
          kontak_darurat: values.kontak_darurat,
        },
      });

      toast.success('Admin berhasil dibuat');
      reset();
      router.push('/admin/manage-admin');
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

      <FormGroup label="Nama Admin" htmlFor="nama_admin">
        <Input id="nama_admin" type="text" {...register('nama_admin')} />
        {errors.nama_admin && <p className="text-sm text-red-500">{errors.nama_admin.message}</p>}
      </FormGroup>

      <FormGroup label="Kontak Darurat" htmlFor="kontak_darurat">
        <Input id="kontak_darurat" type="text" {...register('kontak_darurat')} />
        {errors.kontak_darurat && <p className="text-sm text-red-500">{errors.kontak_darurat.message}</p>}
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
