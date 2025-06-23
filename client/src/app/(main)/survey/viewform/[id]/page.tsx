import SurveyViewFormPage from '@/components/pages/main/survey-viewform';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <SurveyViewFormPage surveyId={id} />;
}
