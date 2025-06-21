import { Metadata } from 'next';
import { ManageRewardPage } from '@/components/pages/admin/manage-reward';

export const metadata: Metadata = {
  title: 'Data Hadiah',
  description: 'Mengelola data hadiah aplikasi.',
};

export default function ManageReward() {
  return <ManageRewardPage />;
}
