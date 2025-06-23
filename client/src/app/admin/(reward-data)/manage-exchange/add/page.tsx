import { Metadata } from 'next';
import { ManageRewardExchangeAddPage } from '@/components/pages/admin/manage-exchange-add';

export const metadata: Metadata = {
  title: 'Data Penukaran Hadiah - Tambah',
  description: 'Menambah data penukaran hadiah aplikasi.',
};

export default function ManageSurveyAdd() {
  return <ManageRewardExchangeAddPage />;
}
