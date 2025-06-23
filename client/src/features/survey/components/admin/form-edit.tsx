'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';
import { useAdminSurvey, useUpdateAdminSurvey } from '../../hooks/useAdminSurveys';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface FormUpdateSurveiProps {
  surveyId: string;
}

const surveySchema = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  status_survei: z.enum([
    'draft',
    'under_review',
    'payment_pending',
    'published',
    'closed',
    'archived',
    'rejected',
  ]),
  deskripsi: z.string().optional(),
  jumlah_responden: z
    .string()
    .min(1, 'Jumlah responden wajib diisi')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Jumlah responden harus berupa angka positif',
    }),
  tanggal_mulai: z.string().min(1, 'Tanggal mulai wajib diisi'),
  tanggal_berakhir: z.string().min(1, 'Tanggal berakhir wajib diisi'),
  usia_min: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().optional()),
  usia_max: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().optional()),
  jenis_kelamin: z.string().optional(),
  region: z.string().default(''),
  status: z.string().default(''),
  hadiah_poin: z
    .string()
    .refine((val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: 'Poin harus angka positif atau kosong',
    }),
})
.refine((data) => {
  if (data.usia_min !== undefined && data.usia_max !== undefined) {
    return data.usia_min <= data.usia_max;
  }
  return true;
}, {
  message: 'Usia minimum tidak boleh lebih besar dari maksimum',
  path: ['usia_max'],
})
.refine((data) => new Date(data.tanggal_mulai) <= new Date(data.tanggal_berakhir), {
  path: ['tanggal_berakhir'],
  message: 'Tanggal mulai tidak boleh setelah tanggal berakhir',
})
.refine((data) => new Date(data.tanggal_mulai) <= new Date(data.tanggal_berakhir), {
  path: ['tanggal_berakhir'],
  message: 'Tanggal mulai tidak boleh setelah tanggal berakhir',
});

export const FormEditSurvey = ({ surveyId }: FormUpdateSurveiProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const { data, isLoading, isFetching, isError, error, refetch } = useAdminSurvey(surveyId, shouldFetch);
  const { mutateAsync: updateSurvey, isPending } = useUpdateAdminSurvey();

  const [formData, setFormData] = useState({
    judul: '',
    status_survei: '',
    deskripsi: '',
    jumlah_responden: '',
    tanggal_mulai: '',
    tanggal_berakhir: '',
    usia_min: '',
    usia_max: '',
    jenis_kelamin: '',
    region: '',
    status: '',
    hadiah_poin: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        judul: data.judul || '',
        status_survei: data.status || '',
        deskripsi: data.deskripsi || '',
        jumlah_responden: data.jumlah_responden?.toString() || '',
        tanggal_mulai: data.tanggal_mulai?.split('T')[0] || '',
        tanggal_berakhir: data.tanggal_berakhir?.split('T')[0] || '',
        usia_min: data.kriteria.usia?.length ? Math.min(...data.kriteria.usia).toString() : '',
        usia_max: data.kriteria.usia?.length ? Math.max(...data.kriteria.usia).toString() : '',
        jenis_kelamin: data.kriteria.jenis_kelamin || '',
        region: (data.kriteria.region || []).join(', '),
        status: (data.kriteria.status || []).join(', '),
        hadiah_poin: data.hadiah_poin?.toString() || '',
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const generateUsiaRangeFlexible = (min?: number, max?: number): number[] | undefined => {
    const isMinValid = typeof min === 'number' && !isNaN(min);
    const isMaxValid = typeof max === 'number' && !isNaN(max);

    if (!isMinValid && !isMaxValid) return undefined;

    const usiaMin = isMinValid ? min! : 1;
    const usiaMax = isMaxValid ? max! : 100;

    if (usiaMin > usiaMax) return undefined;

    return Array.from({ length: usiaMax - usiaMin + 1 }, (_, i) => usiaMin + i);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = surveySchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    const values = parsed.data;
    const usiaRange = generateUsiaRangeFlexible(values.usia_min, values.usia_max);

    const kriteria: Record<string, any> = {
      ...(usiaRange && { usia: usiaRange }),
      ...(values.jenis_kelamin && { jenis_kelamin: values.jenis_kelamin }),
      ...(values.region &&
        values.region
          .split(',')
          .map((r) => r.trim())
          .filter(Boolean).length > 0 && {
          region: values.region
            .split(',')
            .map((r) => r.trim())
            .filter(Boolean),
        }),
      ...(values.status &&
        values.status
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean).length > 0 && {
          status: values.status
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
    };

    try {
      await updateSurvey({
        id: surveyId,
        data: {
          judul: values.judul,
          status: values.status_survei,
          deskripsi: values.deskripsi,
          jumlah_responden: values.jumlah_responden,
          tanggal_mulai: values.tanggal_mulai,
          tanggal_berakhir: values.tanggal_berakhir,
          hadiah_poin: values.hadiah_poin,
          kriteria,
        },
      });
      toast.success('Survei berhasil diperbarui');
    } catch (err: any) {
      toast.error('Gagal memperbarui survei');
    }
  };

  if (isLoading || isFetching) {
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

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormGroup label="Judul Survei" htmlFor="judul">
        <Input id="judul" value={formData.judul} onChange={handleChange} />
      </FormGroup>

      <FormGroup label="Status Survei" htmlFor="status_survei">
        <select
          id="status_survei"
          value={formData.status_survei}
          onChange={handleChange}
          className="border w-full p-2 rounded-md"
        >
          <option value="draft">Draft</option>
          <option value="under_review">Under Review</option>
          <option value="payment_pending">Payment Pending</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
          <option value="archived">Archived</option>
          <option value="rejected">Rejected</option>
        </select>
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <textarea
          id="deskripsi"
          className="border w-full p-2 rounded-md"
          value={formData.deskripsi}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Tanggal Mulai" htmlFor="tanggal_mulai">
        <Input
          id="tanggal_mulai"
          type="date"
          value={formData.tanggal_mulai}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Tanggal Berakhir" htmlFor="tanggal_berakhir">
        <Input
          id="tanggal_berakhir"
          type="date"
          value={formData.tanggal_berakhir}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Jumlah Responden" htmlFor="jumlah_responden">
        <Input
          id="jumlah_responden"
          type="number"
          value={formData.jumlah_responden}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Poin per Responden" htmlFor="hadiah_poin">
        <Input
          id="hadiah_poin"
          type="number"
          min="0"
          value={formData.hadiah_poin}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
        <select
          id="jenis_kelamin"
          value={formData.jenis_kelamin}
          onChange={handleChange}
          className="border w-full p-2 rounded-md"
        >
          <option value="">Semua</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </FormGroup>

      <FormGroup label="Usia Minimum" htmlFor="usia_min">
        <Input
          id="usia_min"
          type="number"
          min="0"
          max="100"
          value={formData.usia_min}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Usia Maksimum" htmlFor="usia_max">
        <Input
          id="usia_max"
          type="number"
          min="0"
          max="100"
          value={formData.usia_max}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Region (pisahkan dengan koma)" htmlFor="region">
        <Input id="region" value={formData.region} onChange={handleChange} />
      </FormGroup>

      <FormGroup label="Status (pisahkan dengan koma)" htmlFor="status">
        <Input id="status" value={formData.status} onChange={handleChange} />
      </FormGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary-2 text-accent-1 border text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        {isPending ? 'Menyimpan...' : 'Simpan'}
      </Button>
    </form>
  );
};
