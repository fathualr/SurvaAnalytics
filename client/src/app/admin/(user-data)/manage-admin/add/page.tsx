import { Metadata } from 'next';
import { ManageAdminAddPage } from '@/components/pages/admin/manage-admin-add';

export const metadata: Metadata = {
  title: 'Data Admin - Tambah',
  description: 'Menambah data admin aplikasi.',
};

export default function ManageAdminAdd() {
  return <ManageAdminAddPage />;
}
