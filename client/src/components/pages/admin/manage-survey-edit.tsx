'use client';

import { FormEditSurvey } from "@/features/survey/components/admin/form-edit";

interface ManageSurveyEditPageProps {
  surveyId: string;
}

export function ManageSurveyEditPage({ surveyId }: ManageSurveyEditPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Survey</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {surveyId}</span>

      <FormEditSurvey surveyId={surveyId} />
    </section>
  );
}
