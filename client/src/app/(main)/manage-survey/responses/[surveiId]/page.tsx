import { SurveyResponsesPage } from '@/components/pages/main/survey-responses';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ surveiId: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surveiId } = await params;
  return {
    title: `Surva. - Responses Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { surveiId } = await params;
  return <SurveyResponsesPage surveyId={surveiId} />;
}
