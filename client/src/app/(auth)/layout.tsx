import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className=" top-5 relative md:px-[50] px-[20] w-full">
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
      <main >{children}</main>
    </>
  );
}
