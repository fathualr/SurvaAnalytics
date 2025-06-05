import { Metadata } from 'next';
import { ManageSurveyPage } from '@/components/pages/main/manage-survey';

export const metadata: Metadata = {
  title: 'Kelola Survei',
  description: 'Halaman mengelola survei yang dimiliki oleh pengguna.',
};

export default function ManageSurvey() {
  return <ManageSurveyPage />;
}
