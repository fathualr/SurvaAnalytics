'use client';

import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import { KriteriaSection } from './kriteria-section';
import { UpdateUserSurveiPayload } from '@/features/survey/types';
import { DateRangeSection } from '@/components/umum/form/date-range-input';
import { FormGroup } from '@/components/umum/form/form-group';

interface SurveyFormProps {
  surveyId: string;
  initialData: UpdateUserSurveiPayload;
  onAutoSave: (data: UpdateUserSurveiPayload) => void;
}

export function SurveyForm({
  surveyId,
  initialData,
  onAutoSave,
}: SurveyFormProps) {
  const [formData, setFormData] = useState<UpdateUserSurveiPayload>(initialData);

  const debouncedAutoSave = debounce((data: UpdateUserSurveiPayload) => {
    onAutoSave(data);
  }, 3000);

  useEffect(() => {
    debouncedAutoSave(formData);
    return () => debouncedAutoSave.cancel();
  }, [formData]);

  const handleChange = <K extends keyof UpdateUserSurveiPayload>(
    field: K,
    value: UpdateUserSurveiPayload[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="flex flex-col gap-5 text-accent-1">
      {formData.status === 'rejected' && formData.umpan_balik && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
          <strong className="font-bold block">Umpan Balik</strong>
          <span>{formData.umpan_balik}</span>
        </div>
      )}
      <section className="border md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">Informasi Umum</h2>
        <FormGroup label="Judul Survei" htmlFor="judul">
          <Input
            id="judul"
            value={formData.judul}
            onChange={(e) => handleChange('judul', e.target.value)}
            placeholder="Contoh: Survei Kepuasan Pelanggan 2025"
            className="bg-none placeholder:text-accent-1/50"
          />
        </FormGroup>
        <FormGroup label="Deskripsi Survei" htmlFor="deskripsi">
          <textarea
            id="deskripsi"
            value={formData.deskripsi}
            onChange={(e) => handleChange('deskripsi', e.target.value)}
            rows={4}
            placeholder="Tuliskan tujuan dan isi singkat dari survei ini..."
            className="w-full bg-none border rounded-lg p-3 placeholder:text-accent-1/50"
          />
        </FormGroup>
      </section>

      <section className="border md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">Ketentuan Survei</h2>
        <DateRangeSection
          startDate={formData.tanggal_mulai || ''}
          endDate={formData.tanggal_berakhir || ''}
          onChange={({ startDate, endDate }) => {
            handleChange('tanggal_mulai', startDate);
            handleChange('tanggal_berakhir', endDate);
          }}
        />
        <FormGroup label="Jumlah Responden" htmlFor="jumlah_responden">
          <Input
            id="jumlah_responden"
            type="number"
            min="1"
            value={formData.jumlah_responden}
            onChange={(e) => handleChange('jumlah_responden', e.target.value)}
            placeholder="Jumlah kuota respons"
            className="bg-none placeholder:text-accent-1/50"
          />
        </FormGroup>
      </section>

      <section className="border md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">Kriteria Responden</h2>
        <KriteriaSection
          kriteria={formData.kriteria || {}}
          onChange={(updatedKriteria) => handleChange('kriteria', updatedKriteria)}
        />
      </section>
    </form>
  );
}
