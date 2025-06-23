import { AnalysisSurveyPage } from '@/components/pages/main/analysis-survey'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <AnalysisSurveyPage surveyId={id} />;
}
