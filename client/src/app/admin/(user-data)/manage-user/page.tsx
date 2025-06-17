import { Metadata } from 'next';
import { ManageUserPage } from '@/components/pages/admin/manage-user';

export const metadata: Metadata = {
  title: 'Data Pengguna',
  description: 'Mengelola data pengguna aplikasi.',
};

export default function ManageUser() {
  return <ManageUserPage />;
}
