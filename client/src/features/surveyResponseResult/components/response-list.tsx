'use client';

import { useResponSurveis } from '../hooks/useUserSurveyResponseresult';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Pagination } from '@/components/umum/pagination';
import { formatDateTime } from '@/utils/dateFormat';
import { User, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface ResponListProps {
  surveiId: string;
  page: number;
  limit?: number;
  filters?: Record<string, any>;
  onPageChange: (newPage: number) => void;
}

export default function ResponList({
  surveiId,
  page,
  limit = 10,
  filters = {},
  onPageChange,
}: ResponListProps) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;

  const {
    responSurveis,
    isLoading,
    isError,
    error,
    meta,
  } = useResponSurveis(surveiId, {
    page,
    limit,
    filters,
    enabled: shouldFetch,
  });

  const totalPages = meta?.total_pages ?? 1;

  if (isLoading) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="h-[72px] bg-muted rounded-lg animate-pulse" />
        ))}
      </ul>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 bg-red-100 border border-red-200 px-4 py-3 rounded">
        Gagal memuat data: {error?.message || 'Terjadi kesalahan.'}
      </div>
    );
  }

  if (!responSurveis.length) {
    return (
      <p className="text-muted-foreground text-sm">Belum ada respons tersedia.</p>
    );
  }

  return (
    <>
      <div className="flex flex-col flex-grow bg-accent-1 rounded-xl sm:p-5 p-3 lg:gap-5 gap-3 border border-black sm:text-sm text-xs">
        <ul className="space-y-3">

          {responSurveis.map((respon) => (
            <li key={respon.id}>
              <Link href={`/manage-survey/responses/${respon.id_survei}/response/${respon.id}`}>
                <Card className="p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex flex-col gap-1 text-sm text-[#232323]">
                    <div className="flex items-center gap-2 text-base font-medium truncate">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="line-clamp-1">{respon.Umum.nama}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="break-words w-full">
                        {respon.profil_metadata.status} • {respon.profil_metadata.region} • {respon.profil_metadata.usia} th • {respon.profil_metadata.jenis_kelamin}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDateTime(respon.created_at)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          ))}

        </ul>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
