'use client'

import { NavSurvey } from "@/components/umum/nav-survey";
import { NavUmum } from "@/components/umum/nav-umum";
import { SurveyOverview } from "@/features/survey/components/user/overview";

interface SurveyOverviewPageProps {
  surveyId: string;
}

export function SurveyOverviewPage({ surveyId }: SurveyOverviewPageProps) {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Overview Survei
          <span className="block text-sm text-muted-foreground">Id: {surveyId}</span>
          <NavSurvey surveyId={surveyId} />
        </h1>

        <SurveyOverview surveiId={surveyId} />

      </section>
    </main>
  );
}
