import { ManageSurveyEditPage } from '@/components/pages/admin/manage-survey-edit';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageSurveyEditPage surveyId={id} />;
}
