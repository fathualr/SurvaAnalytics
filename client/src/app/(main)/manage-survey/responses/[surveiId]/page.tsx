import { SurveyResponsesPage } from '@/components/pages/main/survey-responses';

export default async function Page({
  params,
}: {
  params: Promise<{ surveiId: string }>
}) {
  const { surveiId } = await params
  return <SurveyResponsesPage surveyId={surveiId} />;
}
