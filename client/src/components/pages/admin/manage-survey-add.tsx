'use client';

import { FormAddSurvey } from "@/features/survey/components/admin/form-add";

export function ManageSurveyAddPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Survey</h1>

      <FormAddSurvey />

    </section>
  );
}
