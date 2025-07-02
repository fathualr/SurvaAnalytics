'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/umum/form/form-group';
import { useAdminSurvey, useUpdateAdminSurvey } from '../../hooks/useAdminSurveys';
import { toast } from 'sonner';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';

interface FormUpdateSurveyProps {
  surveyId: string;
}

const surveySchema = z
  .object({
    judul: z.string().min(1, 'Survey title is required'),
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
    jumlah_responden: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Target respondents must be a positive number',
    }),
    tanggal_mulai: z.string().min(1, 'Start date is required'),
    tanggal_berakhir: z.string().min(1, 'End date is required'),
    usia_min: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().optional()),
    usia_max: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().optional()),
    jenis_kelamin: z.string().optional(),
    region: z.string().default(''),
    status: z.string().default(''),
    hadiah_poin: z.string().refine((val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: 'Reward point must be a positive number or empty',
    }),
  })
  .refine((data) => {
    if (data.usia_min !== undefined && data.usia_max !== undefined) {
      return data.usia_min <= data.usia_max;
    }
    return true;
  }, {
    message: 'Minimum age must not exceed maximum age',
    path: ['usia_max'],
  })
  .refine((data) => new Date(data.tanggal_mulai) <= new Date(data.tanggal_berakhir), {
    path: ['tanggal_berakhir'],
    message: 'Start date cannot be after end date',
  });

export const FormEditSurvey = ({ surveyId }: FormUpdateSurveyProps) => {
  const { data, isLoading, isFetching, isError, error, refetch } = useAdminSurvey(surveyId);
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
      ...(values.region && {
        region: values.region.split(',').map((r) => r.trim()).filter(Boolean),
      }),
      ...(values.status && {
        status: values.status.split(',').map((s) => s.trim()).filter(Boolean),
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
      toast.success('Survey updated successfully');
    } catch {
      toast.error('Failed to update survey');
    }
  };

  const inputStyle =
    'bg-transparent backdrop-blur-md border border-glass-border text-foreground placeholder:text-muted-foreground/50';

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-grow justify-center items-center text-muted-foreground text-sm">
        Loading Data...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive font-medium">
          Failed to load data. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-grow space-y-4 p-4 rounded-lg border border-glass-border bg-glass-bg bg-background/80 backdrop-blur-md"
    >
      <FormGroup label="Survey Title" htmlFor="judul">
        <Input
          id="judul"
          placeholder="Enter the survey title"
          value={formData.judul}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Survey Status" htmlFor="status_survei">
        <select
          id="status_survei"
          value={formData.status_survei}
          onChange={handleChange}
          className={`${inputStyle} w-full h-10 rounded-md px-2 text-sm`}
        >
          <option value="draft" className="bg-background text-foreground">Draft</option>
          <option value="under_review" className="bg-background text-foreground">Under Review</option>
          <option value="payment_pending" className="bg-background text-foreground">Payment Pending</option>
          <option value="published" className="bg-background text-foreground">Published</option>
          <option value="closed" className="bg-background text-foreground">Closed</option>
          <option value="archived" className="bg-background text-foreground">Archived</option>
          <option value="rejected" className="bg-background text-foreground">Rejected</option>
        </select>
      </FormGroup>

      <FormGroup label="Description" htmlFor="deskripsi">
        <textarea
          id="deskripsi"
          placeholder="Describe your survey..."
          value={formData.deskripsi}
          onChange={handleChange}
          className={`${inputStyle} w-full h-24 text-sm rounded-md px-2 py-1`}
        />
      </FormGroup>

      <FormGroup label="Start Date" htmlFor="tanggal_mulai">
        <Input
          id="tanggal_mulai"
          type="date"
          value={formData.tanggal_mulai}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="End Date" htmlFor="tanggal_berakhir">
        <Input
          id="tanggal_berakhir"
          type="date"
          value={formData.tanggal_berakhir}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Target Respondents" htmlFor="jumlah_responden">
        <Input
          id="jumlah_responden"
          type="number"
          placeholder="e.g. 100"
          value={formData.jumlah_responden}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Reward Points" htmlFor="hadiah_poin">
        <Input
          id="hadiah_poin"
          type="number"
          placeholder="e.g. 50"
          value={formData.hadiah_poin}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <Separator className="border border-foreground/10" />
      <h3 className="font-semibold text-lg">Respondent Criteria (Optional)</h3>
      
      <FormGroup label="Gender" htmlFor="jenis_kelamin">
        <select
          id="jenis_kelamin"
          value={formData.jenis_kelamin}
          onChange={handleChange}
          className={`${inputStyle} w-full h-10 rounded-md px-2 text-sm`}
        >
          <option value="" className="bg-background text-foreground">All</option>
          <option value="laki laki" className="bg-background text-foreground">Male</option>
          <option value="perempuan" className="bg-background text-foreground">Female</option>
        </select>
      </FormGroup>

      <FormGroup label="Minimum Age" htmlFor="usia_min">
        <Input
          id="usia_min"
          type="number"
          placeholder="e.g. 18"
          value={formData.usia_min}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Maximum Age" htmlFor="usia_max">
        <Input
          id="usia_max"
          type="number"
          placeholder="e.g. 35"
          value={formData.usia_max}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Region(s) (comma-separated)" htmlFor="region">
        <Input
          id="region"
          placeholder="e.g. Jakarta, Bandung"
          value={formData.region}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <FormGroup label="Occupation / Education Status (comma-separated)" htmlFor="status">
        <Input
          id="status"
          placeholder="e.g. Student, Employee"
          value={formData.status}
          onChange={handleChange}
          className={inputStyle}
        />
      </FormGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-auto w-full text-background border border-glass-border transition backdrop-blur-md hover:opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--color-primary-2) 0%, var(--color-primary-1) 50%, var(--color-primary-3) 100%)`,
          backgroundSize: 'cover',
        }}
      >
        {isPending ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};
