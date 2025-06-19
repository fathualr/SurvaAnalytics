import { Metadata } from 'next';
import { ManageVerificationPage } from '@/components/pages/admin/manage-verification';

export const metadata: Metadata = {
  title: 'Data Verifikasi Survei',
  description: 'Verifikasi data survei aplikasi.',
};

export default function ManageVerification() {
  return <ManageVerificationPage />;
}
