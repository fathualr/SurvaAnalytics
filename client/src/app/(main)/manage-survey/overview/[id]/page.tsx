import { SurveyOverviewPage } from '@/components/pages/main/survey-overview';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Surva. - Overview Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <SurveyOverviewPage surveyId={id} />;
}
