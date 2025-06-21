import { Metadata } from 'next';
import { ManageRewardAddPage } from '@/components/pages/admin/manage-reward-add';

export const metadata: Metadata = {
  title: 'Data Hadiah - Tambah',
  description: 'Menambah data hadiah aplikasi.',
};

export default function ManageSurveyAdd() {
  return <ManageRewardAddPage />;
}
