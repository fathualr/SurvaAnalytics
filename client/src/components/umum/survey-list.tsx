'use client'

import { useState } from "react";
import { SurveyCard } from "./survey-card";
import { SurveyPagination } from "./survey-pagination";

type Survey = {
  id: number;
  title: string;
  points: number;
  image?: string;
};

type SurveyListProps = {
  surveys: Survey[];
  itemsPerPage?: number;
};

export function SurveyList({ surveys, itemsPerPage = 8 }: SurveyListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(surveys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurveys = surveys.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-grow h-full w-full justify-between">
      {currentSurveys.length > 0 ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-10 md:gap-8 gap-5">
          {currentSurveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              title={survey.title}
              points={survey.points}
              image={survey.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          Tidak ada survei tersedia saat ini.
        </div>
      )}

      {totalPages > 1 && (
        <SurveyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
