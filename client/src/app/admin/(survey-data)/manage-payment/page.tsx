import { Metadata } from 'next';
import { ManagePaymentPage } from '@/components/pages/admin/manage-payment';

export const metadata: Metadata = {
  title: 'Data Pembayaran Survei',
  description: 'Mengelola data pembayaran survei aplikasi.',
};

export default function ManagePayment() {
  return <ManagePaymentPage />;
}
