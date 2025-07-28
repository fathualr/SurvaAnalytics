import { Metadata } from 'next';
import { GenerateSurveyPage } from '@/components/pages/main/generate-survey';

export const metadata: Metadata = {
  title: 'Surva. - Generate',
  description: 'Page to generate survey using AI.',
};

export default function GenerateSurvey() {
  return <GenerateSurveyPage />;
}
