import { Metadata } from 'next';
import { ProfilePage } from '@/components/pages/main/profile';

export const metadata: Metadata = {
  title: 'Profil Pengguna',
  description: 'Lihat informasi profil akun pengguna.',
};

export default function Profile() {
  return <ProfilePage />;
}
