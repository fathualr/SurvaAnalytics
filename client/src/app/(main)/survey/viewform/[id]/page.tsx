import SurveyViewFormPage from '@/components/pages/main/survey-viewform';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Surva. - Filling Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <SurveyViewFormPage surveyId={id} />;
}
