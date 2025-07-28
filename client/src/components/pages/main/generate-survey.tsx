'use client'

import { NavUmum } from "@/components/umum/nav-umum";
import { GenerateSurveyContainer } from "@/features/survey-generation/components/generate-survey-container";
import { GenerateSurveyForm } from "@/features/survey-generation/components/generate-survey-form";

export function GenerateSurveyPage() {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold my-4">
          Generate Survey
        </h1>

        <GenerateSurveyContainer />

      </section>
    </main>
  );
}