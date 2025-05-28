'use client'

import { useState } from "react";
import { SurveyCard } from "./survey-card";
import { SurveyPagination } from "./survey-pagination";

type Survey = {
  id: number;
  judul: string;
  deskripsi: string;
  poin: number;
};

type SurveyListProps = {
  surveys: Survey[];
  itemsPerPage?: number;
};

export function SurveyList({ surveys, itemsPerPage = 12 }: SurveyListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(surveys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurveys = surveys.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-grow h-full w-full justify-between">
      {currentSurveys.length > 0 ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-10 md:gap-8 gap-5">
          {currentSurveys.map((survey, index) => {
            const imageIndex = (startIndex + index) % 6 + 1;
            const imagePath = `/images/explore-page/survei-${imageIndex}.png`;

            return (
              <SurveyCard
                key={survey.id}
                judul={survey.judul}
                deskripsi={survey.deskripsi}
                poin={survey.poin}
                image={imagePath}
              />
            );
          })}
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
