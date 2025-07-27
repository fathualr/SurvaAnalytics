import { Metadata } from 'next';
import HomePage from '@/components/pages/main/home';

export const metadata: Metadata = {
  title: 'Surva.',
  description: 'An intelligent analytics app for survey results.'
};

export default function Home() {
  return <HomePage />;
}
