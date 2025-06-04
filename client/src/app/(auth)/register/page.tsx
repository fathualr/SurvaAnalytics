import { Metadata } from 'next';
import { RegisterPage } from '@/components/pages/auth/register';

export const metadata: Metadata = {
  title: 'Daftar Akun',
  description: 'Mendaftar akun dan dapatkan hak fitur aplikasi.',
};

export default function Register() {
  return <RegisterPage />;
}
