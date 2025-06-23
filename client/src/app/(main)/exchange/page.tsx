import { Metadata } from 'next';
import { ExchangePage } from '@/components/pages/main/exchange';

export const metadata: Metadata = {
  title: 'Penukaran Poin',
  description: 'Menukar poin dengan hadih yang dimiliki dari partisipasi.',
};

export default function Exchange() {
  return <ExchangePage />;
}
