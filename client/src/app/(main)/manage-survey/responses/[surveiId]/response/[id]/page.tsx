import { SurveyResponseDetailPage } from '@/components/pages/main/survey-response-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ surveiId: string; id: string }>
}) {
  const { surveiId, id } = await params;
  return <SurveyResponseDetailPage surveyId={surveiId} responSurveyId={id} />;
}
