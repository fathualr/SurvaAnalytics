import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
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
