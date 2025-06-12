'use client';

import { DetailItem } from '@/components/umum/detail-item';
import { useUserSurvey } from '../../hooks/useUserSurveys';
import { formatDate } from '@/utils/dateFormat';
import { ExportSurveyButton } from '@/features/surveyResponseResult/components/export-survey-button';

interface SurveyOverviewProps {
  surveiId: string;
}

export const SurveyOverview = ({ surveiId }: SurveyOverviewProps) => {
  const { data: survey, isLoading, isError } = useUserSurvey(surveiId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !survey) return <div>Gagal memuat data survei.</div>;

  return (
    <div className="flex flex-col flex-grow bg-accent-1 rounded-xl sm:p-5 p-3 lg:gap-5 gap-3 border border-black sm:text-sm text-xs">
      <ExportSurveyButton surveiId={survey.id} surveiJudul={survey.judul} />
      <DetailItem label="Judul" value={survey.judul} />
      <DetailItem label="Status" value={survey.status} />
      <DetailItem label="Deskripsi" value={survey.deskripsi || '-'} />
      <DetailItem label="Jumlah Responden" value={survey.jumlah_responden} />
      <DetailItem label="Tanggal Mulai" value={formatDate(survey.tanggal_mulai)} />
      <DetailItem label="Tanggal Berakhir" value={formatDate(survey.tanggal_berakhir)} />
      <DetailItem label="Poin Hadiah" value={survey.hadiah_poin || '-'} />
      <DetailItem label="Dibuat" value={formatDate(survey.created_at)} />
      <DetailItem label="Diperbarui" value={formatDate(survey.updated_at)} />
    </div>
  );
};
