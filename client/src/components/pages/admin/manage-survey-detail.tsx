'use client';

import { FormDetailSurvey } from "@/features/survey/components/admin/form-detail";

interface ManageSurveyDetailPageProps {
  surveyId: string;
}

export function ManageSurveyDetailPage({ surveyId }: ManageSurveyDetailPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Survey</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {surveyId}</span>

      <FormDetailSurvey surveyId={surveyId} />
    </section>
  );
}
