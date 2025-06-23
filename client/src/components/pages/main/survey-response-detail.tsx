'use client'

import { NavSurvey } from "@/components/umum/nav-survey";
import { NavUmum } from "@/components/umum/nav-umum";
import { ResponseDetail } from "@/features/surveyResponseResult/components/response-detail";

interface SurveyResponsePageProps {
  surveyId: string;
  responSurveyId: string;
}

export function SurveyResponseDetailPage({ surveyId, responSurveyId }: SurveyResponsePageProps) {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Respon Survei
          <span className="block text-sm text-muted-foreground">Id: {responSurveyId}</span>
          <NavSurvey surveyId={surveyId} />
        </h1>

        <ResponseDetail surveyId={surveyId} responSurveyId={responSurveyId} />

      </section>
    </main>
  );
}
