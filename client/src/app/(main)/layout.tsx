import Navbar from '@/components/umum/navbar';
import Footer from '@/components/umum/footer';
import { Toaster } from 'sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
        <Toaster />
        {children}
      <Footer />
    </>
  );
}
