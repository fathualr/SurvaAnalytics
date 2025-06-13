'use client'

import { NavSurvey } from "@/components/umum/nav-survey";
import { NavUmum } from "@/components/umum/nav-umum";
import { AnalysisList } from "@/features/surveyResponseResult/components/analysis-list";

interface AnalysisSurveyPageProps {
  surveyId: string;
}

export function AnalysisSurveyPage({ surveyId }: AnalysisSurveyPageProps) {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Analisis Survei
          <span className="block text-sm text-muted-foreground">Id: {surveyId}</span>
          <NavSurvey surveyId={surveyId} />
        </h1>

        <AnalysisList surveyId={surveyId} />

      </section>
    </main>
  );
}
