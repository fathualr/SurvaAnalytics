'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <nav className="top-5 relative md:px-[50px] px-[20px] w-full">
        <Link
          href="/"
          className="absolute hover:opacity-80 flex items-center"
        >
          <Image
            src="/images/surva.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="25vw"
            className="w-[120px] h-auto object-contain"
          />
        </Link>
      </nav>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
        <h1 className="text-5xl font-bold text-destructive mb-2">Error - 404</h1>
        <p className="text-lg text-muted-foreground mb-6">Halaman yang Anda cari tidak ditemukan.</p>
        <div className="flex">
          <Button onClick={() => router.back()} variant="outline" className="cursor-pointer">
            Kembali
          </Button>
        </div>
      </main>
    </>
  );
}
