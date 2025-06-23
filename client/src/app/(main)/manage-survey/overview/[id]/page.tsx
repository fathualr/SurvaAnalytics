import { SurveyOverviewPage } from '@/components/pages/main/survey-overview';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <SurveyOverviewPage surveyId={id} />;
}
