'use client'

import { NavSurvey } from "@/components/umum/nav-survey";
import { NavUmum } from "@/components/umum/nav-umum";
import ResponseList from "@/features/surveyResponseResult/components/response-list";
import { useState } from "react";

interface SurveyResponsePageProps {
  surveyId: string;
}

export function SurveyResponsesPage({ surveyId }: SurveyResponsePageProps) {
  const [page, setPage] = useState(1);
  const limit = 10;

  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Respons Survei
          <span className="block text-sm text-muted-foreground">Id: {surveyId}</span>
          <NavSurvey surveyId={surveyId} />
        </h1>

        <ResponseList 
          surveiId={surveyId}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />

      </section>
    </main>
  );
}
