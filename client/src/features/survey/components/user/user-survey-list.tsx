'use client';

import { UserSurveyCard } from './user-survey-card';
import { useUserSurveys } from '../../hooks/useUserSurveys';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { NewSurveyCard } from './new-survey-card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/umum/pagination';

interface UserSurveyListProps {
  page: number;
  limit?: number;
  filters?: Record<string, any>;
  onPageChange: (newPage: number) => void;
}

export function UserSurveyList({
  page,
  limit = 8,
  filters = {},
  onPageChange,
}: UserSurveyListProps) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    surveys,
    isLoading,
    isError,
    errorMessage,
    refetch,
    meta,
  } = useUserSurveys({ page, limit, filters, enabled: shouldFetch });

  const totalPages = meta?.total_pages ?? 1;

  if (authLoading || isLoading) {
    return (
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-8 md:gap-5 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg w-full h-[250px]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded">
        <p>{errorMessage || 'Gagal memuat survei kamu.'}</p>
        {refetch && (
          <Button variant="destructive" onClick={() => refetch()}>
            Coba Lagi
          </Button>
        )}
      </div>
    );
  }

  if (surveys.length === 0) {
    return (
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-3">
        <NewSurveyCard />
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow">
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-3">
          {page === 1 && <NewSurveyCard />}

          {surveys
            .slice(0, page === 1 ? limit - 1 : limit)
            .map((survey) => (
              <UserSurveyCard key={survey.id} surveys={survey} />
            ))}
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
