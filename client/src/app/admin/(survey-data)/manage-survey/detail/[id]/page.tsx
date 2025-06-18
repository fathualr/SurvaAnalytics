import { ManageSurveyDetailPage } from '@/components/pages/admin/manage-survey-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageSurveyDetailPage surveyId={id} />;
}
