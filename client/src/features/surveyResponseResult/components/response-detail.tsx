'use client';

import { useEffect } from 'react';
import { useResponSurvei } from '../hooks/useUserSurveyResponseresult';
import { useInfiniteSurveyQuestions } from '@/features/surveyQuestion/hooks/useUserSurveyQuestion';
import { formatDateTime } from '@/utils/dateFormat';
import { Card } from '@/components/ui/card';
import { DetailItem } from '@/components/umum/detail-item';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Props {
  surveyId: string;
  responSurveyId: string;
}

export function ResponseDetail({ surveyId, responSurveyId }: Props) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    responSurvei,
    isLoading: isLoadingRespon,
    isError: isErrorRespon,
    error,
  } = useResponSurvei(surveyId, responSurveyId, shouldFetch);

  const {
    data,
    isLoading: isLoadingPertanyaan,
    isError: isErrorPertanyaan,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSurveyQuestions(surveyId, shouldFetch);

  const pertanyaans = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = data?.pages?.[0]?.meta?.total_items ?? 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (scrollable - scrolled < 400 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoadingPertanyaan || isLoadingRespon || !shouldFetch) {
    return <div className="h-20 bg-muted animate-pulse rounded-md" />;
  }

  if (isErrorPertanyaan || isErrorRespon || !responSurvei) {
    return (
      <div className="text-red-600 bg-red-100 border border-red-200 px-4 py-3 rounded">
        Gagal memuat detail: {error?.message || 'Terjadi kesalahan.'}
      </div>
    );
  }

  const { Umum, profil_metadata, respon, created_at } = responSurvei;

  return (
    <div className="space-y-6">
      <Card className="flex flex-col flex-grow bg-accent-1 rounded-xl sm:p-5 p-3 lg:gap-5 gap-3 border border-black sm:text-sm text-xs">
        <DetailItem label="Nama" value={Umum.nama} />
        <DetailItem label="Email" value={Umum.Pengguna.email} />
        <DetailItem label="Profil" value={`${profil_metadata.status} • ${profil_metadata.region} • ${profil_metadata.usia} th • ${profil_metadata.jenis_kelamin}`}/>
        <DetailItem label="Diisi" value={formatDateTime(created_at)} />
      </Card>

      <Card className="flex flex-col flex-grow bg-accent-1 rounded-xl sm:p-5 p-3 lg:gap-5 gap-3 border border-black sm:text-sm text-xs">
        <h3 className="font-semibold text-base">Jawaban Survei</h3>

        <ul className="space-y-3 text-sm">
          {pertanyaans
            .sort((a, b) => a.index - b.index)
            .map((pertanyaan, index) => {
              const jawaban = respon[pertanyaan.id] ?? respon[pertanyaan.teks_pertanyaan];
              return (
                <li key={pertanyaan.id} className="border-b pb-2">
                  <div className="text-muted-foreground font-medium mb-1">
                    {index + 1}. <span className="italic">{pertanyaan.teks_pertanyaan}</span>
                  </div>
                  <div>{Array.isArray(jawaban) ? jawaban.join(', ') : jawaban || '-'}</div>
                </li>
              );
            })}
            
            <div className="text-muted-foreground text-xs">
              Menampilkan {pertanyaans.length} dari {totalCount} jawaban
            </div>

          {isFetchingNextPage && <li className="text-muted-foreground">Memuat lagi...</li>}
        </ul>
      </Card>
    </div>
  );
}
