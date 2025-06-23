import { Metadata } from 'next';
import { ManageUserAddPage } from '@/components/pages/admin/manage-user-add';

export const metadata: Metadata = {
  title: 'Data Pengguna - Tambah',
  description: 'Menambah data admin aplikasi.',
};

export default function ManageAdminAdd() {
  return <ManageUserAddPage />;
}
