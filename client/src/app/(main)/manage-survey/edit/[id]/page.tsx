import { ManageSurveyEditPage } from '@/components/pages/main/manage-survey-edit';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Surva. - Edit Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageSurveyEditPage surveyId={id} />;
}
