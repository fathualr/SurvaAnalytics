import { Metadata } from 'next';
import { ManageSurveyAddPage } from '@/components/pages/admin/manage-survey-add';

export const metadata: Metadata = {
  title: 'Data Survei - Tambah',
  description: 'Menambah data survei aplikasi.',
};

export default function ManageSurveyAdd() {
  return <ManageSurveyAddPage />;
}
