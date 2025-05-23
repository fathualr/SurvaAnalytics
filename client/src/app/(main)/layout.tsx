import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
