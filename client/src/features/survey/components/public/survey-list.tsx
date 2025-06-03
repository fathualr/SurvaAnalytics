'use client';

import { usePublishedSurveys } from '@/features/survey/hooks/usePublishedSurveys';
import { SurveyCard } from './survey-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/umum/pagination';

interface SurveyListProps {
  page: number;
  limit?: number;
  filters?: Record<string, any>;
  onPageChange: (newPage: number) => void;
}

export function SurveyList({
  page,
  limit = 12,
  filters = {},
  onPageChange,
}: SurveyListProps) {
  const {
    surveys,
    isLoading,
    isError,
    errorMessage,
    refetch,
    meta,
  } = usePublishedSurveys({ page, limit, filters });

  const totalPages = meta?.total_pages ?? 1;

  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-2 xl:gap-5 md:gap-3 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg w-full h-[250px]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded">
        <p>{errorMessage || 'Gagal memuat survei.'}</p>
        <Button variant="destructive" onClick={() => refetch()}>
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (surveys.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Tidak ada survei tersedia saat ini.
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow">
        <div className="grid xl:grid-cols-5 grid-cols-2 md:gap-5 gap-3">
          {surveys.map((survey, index) => {
            const imageIndex = index % 6 + 1;
            const imagePath = `/images/explore-page/survei-${imageIndex}.png`;

            return (
              <SurveyCard
                key={survey.id}
                judul={survey.judul}
                deskripsi={survey.deskripsi}
                hadiah_poin={survey.hadiah_poin}
                Umum={survey.Umum || { nama: 'Anonim' }}
                kriteria={survey.kriteria}
                tanggal_mulai={survey.tanggal_mulai}
                tanggal_berakhir={survey.tanggal_berakhir}
                image={imagePath}
              />
            );
          })}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
