'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAdminSurvey } from '../../hooks/useAdminSurveys';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';

const today = new Date();
const minStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const formSchema = z.object({
  id_umum: z.string().uuid({ message: 'ID umum tidak valid' }),
  judul: z.string().min(1, 'Judul wajib diisi').max(255),
  deskripsi: z.string().optional(),
  jumlah_responden: z.string().refine(val => {
    const num = Number(val);
    return !isNaN(num) && num >= 1 && num <= 1000;
  }, { message: 'Jumlah responden harus 1-1000' }),
  tanggal_mulai: z.coerce.date().refine(date => date >= minStartDate, {
    message: 'Tanggal mulai minimal hari ini',
  }),
  tanggal_berakhir: z.coerce.date(),
  usia_min: z.string().optional(),
  usia_max: z.string().optional(),
  jenis_kelamin: z.string().optional(),
  region: z.string().optional(),
  status: z.string().optional(),
})
.refine((data) => {
  const min = data.usia_min ? parseInt(data.usia_min) : undefined;
  const max = data.usia_max ? parseInt(data.usia_max) : undefined;

  if (min !== undefined && max !== undefined) {
    return min <= max;
  }
  return true;
}, {
  message: 'Usia minimum tidak boleh lebih besar dari maksimum',
  path: ['usia_max'],
})
.refine((data) => data.tanggal_berakhir > data.tanggal_mulai, {
  message: 'Tanggal berakhir harus setelah tanggal mulai',
  path: ['tanggal_berakhir'],
});

type FormValues = z.infer<typeof formSchema>;

const parseUsiaArray = (minStr?: string, maxStr?: string): number[] | undefined => {
  const min = minStr ? parseInt(minStr) : undefined;
  const max = maxStr ? parseInt(maxStr) : undefined;

  if (!min && !max) return undefined;
  if (min && !max) return Array.from({ length: 100 - min + 1 }, (_, i) => i + min);
  if (!min && max) return Array.from({ length: max }, (_, i) => i + 1);
  if (min && max && min <= max) return Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return undefined;
};

const parseCommaSeparated = (input?: string): string[] | undefined => {
  if (!input) return undefined;
  const parsed = input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : undefined;
};

export const FormAddSurvey = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createSurvey } = useCreateAdminSurvey();

  const onSubmit = async (values: FormValues) => {
    try {
      await createSurvey({
        id_umum: values.id_umum,
        judul: values.judul,
        deskripsi: values.deskripsi || '',
        jumlah_responden: values.jumlah_responden,
        tanggal_mulai: values.tanggal_mulai.toISOString(),
        tanggal_berakhir: values.tanggal_berakhir.toISOString(),
        kriteria: {
          usia: parseUsiaArray(values.usia_min, values.usia_max),
          jenis_kelamin: values.jenis_kelamin || undefined,
          region: parseCommaSeparated(values.region),
          status: parseCommaSeparated(values.status),
        },
      });

      toast.success('Survei berhasil dibuat');
      reset();
      router.push('/admin/manage-survey');
    } catch (err: any) {
      toast.error(err?.message || 'Gagal membuat survei');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormGroup label="ID Pengguna Umum" htmlFor="id_umum">
        <Input id="id_umum" type="text" {...register('id_umum')} />
        {errors.id_umum && <p className="text-sm text-red-500">{errors.id_umum.message}</p>}
      </FormGroup>

      <FormGroup label="Judul Survei" htmlFor="judul">
        <Input id="judul" type="text" {...register('judul')} />
        {errors.judul && <p className="text-sm text-red-500">{errors.judul.message}</p>}
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <textarea id="deskripsi" {...register('deskripsi')} className="w-full border rounded p-2" />
      </FormGroup>

      <FormGroup label="Jumlah Responden" htmlFor="jumlah_responden">
        <Input id="jumlah_responden" type="number" {...register('jumlah_responden')} />
        {errors.jumlah_responden && <p className="text-sm text-red-500">{errors.jumlah_responden.message}</p>}
      </FormGroup>

      <FormGroup label="Tanggal Mulai" htmlFor="tanggal_mulai">
        <Input id="tanggal_mulai" type="date" {...register('tanggal_mulai')} />
        {errors.tanggal_mulai && <p className="text-sm text-red-500">{errors.tanggal_mulai.message}</p>}
      </FormGroup>

      <FormGroup label="Tanggal Berakhir" htmlFor="tanggal_berakhir">
        <Input id="tanggal_berakhir" type="date" {...register('tanggal_berakhir')} />
        {errors.tanggal_berakhir && <p className="text-sm text-red-500">{errors.tanggal_berakhir.message}</p>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-5 pt-6 border-t">
        <h3 className="font-semibold text-lg">Kriteria Responden</h3>

        <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
          <select
            id="jenis_kelamin"
            {...register('jenis_kelamin')}
            className="border w-full p-2 rounded-md"
          >
            <option value="">Semua</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </FormGroup>

        <FormGroup label="Usia Minimum" htmlFor="usia_min">
          <Input id="usia_min" type="number" min="1" max="100" {...register('usia_min')} />
          {errors.usia_min && <p className="text-sm text-red-500">{errors.usia_min.message}</p>}
        </FormGroup>

        <FormGroup label="Usia Maksimum" htmlFor="usia_max">
          <Input id="usia_max" type="number" min="1" max="100" {...register('usia_max')} />
          {errors.usia_max && <p className="text-sm text-red-500">{errors.usia_max.message}</p>}
        </FormGroup>

        <FormGroup label="Region / Domisili (pisahkan dengan koma)" htmlFor="region">
          <Input id="region" type="text" {...register('region')} />
        </FormGroup>

        <FormGroup label="Status Pekerjaan / Pendidikan (pisahkan dengan koma)" htmlFor="status">
          <Input id="status" type="text" {...register('status')} />
        </FormGroup>
      </div>

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
