import { Metadata } from 'next';
import { UnauthorizedPage } from '@/components/pages/errors/401';

export const metadata: Metadata = {
  title: 'Error - 401',
  description: 'Perlu kredensial untuk meneruskan',
};

export default function Unauthorized() {
  return <UnauthorizedPage />;
}
