import { Metadata } from 'next';
import { NotFoundPage } from '@/components/pages/errors/404';

export const metadata: Metadata = {
  title: 'Error - 404',
  description: 'Halaman aplikasi tidak ditemukan',
};

export default function NotFound() {
  return <NotFoundPage />;
}
