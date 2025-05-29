'use client';

import { Survei } from '../../types';
import { SurveyCard } from './survey-card';

interface SurveyListProps {
  surveys: Survei[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export const SurveyList = ({ surveys, isLoading, isError, errorMessage }: SurveyListProps) => {
  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-2 xl:gap-5 md:gap-3 gap-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-[250px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {errorMessage || 'Failed to load surveys'}
      </div>
    );
  }

  if (surveys.length === 0) {
    return <div className="text-center text-muted-foreground py-10">Tidak ada survei tersedia saat ini.</div>;
  }

  return (
    <div className="grid xl:grid-cols-5 grid-cols-2 md:gap-5 gap-3">
      {surveys.map((survey, index) => {
        const imageIndex = index % 6 + 1;
        const imagePath = `/images/explore-page/survei-${imageIndex}.png`;

        return (
          <SurveyCard
            key={survey.id}
            judul={survey.judul}
            deskripsi={survey.deskripsi}
            poin={survey.hadiah_poin}
            image={imagePath}
          />
        );
      })}
    </div>
  );
};
