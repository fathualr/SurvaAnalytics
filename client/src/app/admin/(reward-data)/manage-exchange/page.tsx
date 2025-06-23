import { Metadata } from 'next';
import { ManageRewardExchangePage } from '@/components/pages/admin/manage-exchange';

export const metadata: Metadata = {
  title: 'Data Penukaran Hadiah',
  description: 'Mengelola data penukaran hadiah aplikasi.',
};

export default function ManageRewardExchange() {
  return <ManageRewardExchangePage />;
}
