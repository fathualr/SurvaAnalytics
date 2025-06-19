'use client';

import { SurveyVerificationContainer } from "@/features/surveyVerification/components/admin/survey-verification-container";

interface ManageVerificationReviewPageProps {
  surveyId: string;
}

export function ManageVerificationReviewPage({ surveyId }: ManageVerificationReviewPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Verifikasi Survei</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {surveyId}</span>

      <SurveyVerificationContainer surveyId={surveyId} />
    </section>
  );
}
