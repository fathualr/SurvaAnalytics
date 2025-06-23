import { Metadata } from 'next';
import { LoginPage } from '@/components/pages/auth/login';

export const metadata: Metadata = {
  title: 'Masuk Akun',
  description: 'Masuk dengan akun yang telah terdaftar pada aplikasi.',
};

export default function Register() {
  return <LoginPage />;
}
