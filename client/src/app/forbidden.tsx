import { Metadata } from 'next';
import { ForbiddenPage } from '@/components/pages/errors/403';

export const metadata: Metadata = {
  title: 'Error - 403',
  description: 'Tidak memiliki akses ke halaman ini',
};

export default function NotFound() {
  return <ForbiddenPage />;
}
