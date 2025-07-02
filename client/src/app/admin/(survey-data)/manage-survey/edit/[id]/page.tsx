import { ManageSurveyEditPage } from '@/components/pages/admin/manage-survey-edit';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Edit Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageSurveyEditPage surveyId={id} />;
}
