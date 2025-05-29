'use client';

import { useState } from 'react';
import { usePublishedSurveys } from '@/features/survey/hooks/usePublishedSurveys';
import { SurveyList } from '@/features/survey/components/public/survey-list';
import { Pagination } from '@/components/umum/pagination';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavUmum} from "@/components/umum/nav-umum";

export default function Explore() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { surveys, meta, isLoading, isError, errorMessage } = usePublishedSurveys({ page, limit });

  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Daftar survei
        </h1>

        <div className="flex flex-row gap-5 mb-6">
          <Input
            type="text"
            placeholder="Cari survei"
            className="md:max-w-[300px]"
          />
          <Button
            variant="outline"
            type="submit"
            className="cursor-pointer hover:bg-primary-2 hover:text-accent-1"
          >
            Cari
          </Button>
        </div>

        <div className="flex-grow">
          <SurveyList
            surveys={surveys}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
          />
        </div>

        {meta && (
          <Pagination
            currentPage={meta.current_page}
            totalPages={meta.total_pages}
            onPageChange={setPage}
          />
        )}
      </section>
    </main>
  );
}
