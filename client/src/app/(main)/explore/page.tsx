import { Metadata } from 'next';
import { ExplorePage } from '@/components/pages/main/explore';

export const metadata: Metadata = {
  title: 'Menu Survei',
  description: 'Lihat daftar survei yang tersedia dan mulai berpartisipasi.',
};

export default function Explore() {
  return <ExplorePage />;
}
