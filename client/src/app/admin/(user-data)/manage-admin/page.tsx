import { Metadata } from 'next';
import { ManageAdminPage } from '@/components/pages/admin/manage-admin';

export const metadata: Metadata = {
  title: 'Data Admin',
  description: 'Mengelola data admin aplikasi.',
};

export default function ManageAdmin() {
  return <ManageAdminPage />;
}
