'use client'

import { NavUmum } from '@/components/umum/nav-umum';
import { SurveyContainer } from '@/features/survey/components/user/form/survey-container'

interface SurveyEditorMainPageProps {
  surveyId: string
}

export function ManageSurveyEditPage({ surveyId }: SurveyEditorMainPageProps) {
  return(
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Edit Survei
          <span className="block text-sm text-muted-foreground">Id: {surveyId}</span>
        </h1>
    
        <SurveyContainer surveyId={surveyId} />
  
      </section>
    </main>
  );
}
