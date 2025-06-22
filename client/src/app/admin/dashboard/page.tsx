import { Metadata } from 'next';
import { DashboardAdminPage } from '@/components/pages/admin/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Halaman dashboard pada sisi admin.',
};

export default function DashboardAdmin() {
  return <DashboardAdminPage />;
}
