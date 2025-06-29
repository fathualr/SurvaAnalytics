import { SurveyResponseDetailPage } from '@/components/pages/main/survey-response-detail';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ surveiId: string; id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surveiId, id } = await params;
  return {
    title: `Surva. - Response Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { surveiId, id } = await params;
  return <SurveyResponseDetailPage surveyId={surveiId} responSurveyId={id} />;
}
