import { Metadata } from 'next';
import { ManageSurveyPage } from '@/components/pages/admin/manage-survey';

export const metadata: Metadata = {
  title: 'Data Survei',
  description: 'Mengelola data survei aplikasi.',
};

export default function ManageSurvey() {
  return <ManageSurveyPage />;
}
