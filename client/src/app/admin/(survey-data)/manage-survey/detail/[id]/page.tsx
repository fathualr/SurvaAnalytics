import { ManageSurveyDetailPage } from '@/components/pages/admin/manage-survey-detail';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Detail Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageSurveyDetailPage surveyId={id} />;
}
