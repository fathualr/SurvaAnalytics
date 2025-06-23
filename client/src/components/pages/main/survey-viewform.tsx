import { SurveyViewForm } from '@/features/surveyResponseSubmission/components/survey-viewform';

interface SurveyViewFormPageProps {
  surveyId: string;
}

export default function SurveyViewFormPage({ surveyId }: SurveyViewFormPageProps) {
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-20 pb-5 md:px-10 px-5">
      <div className="flex flex-col flex-grow w-full p-5 bg-white border rounded-lg border-[#232323]">
        <SurveyViewForm surveiId={surveyId} />
      </div>
    </main>
  );
}
