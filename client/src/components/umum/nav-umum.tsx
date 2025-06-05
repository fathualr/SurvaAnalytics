import { useAuth } from '@/features/auth/hooks/useAuth';
import Link from "next/link";

export function NavUmum() {
  const { isLoggedIn } = useAuth();

  if(isLoggedIn) {
    return (
      <div className="py-5 flex flex-row text-accent-1 gap-5 md:text-xl sm:text-lg text-md">
        <Link
          href="/explore"
          className="w-full max-w-[200px] min-h-[50px] flex justify-center items-center text-center bg-secondary-1 hover:bg-secondary-2 hover:text-primary-1 font-semibold rounded-md"
        >
          Menu Survei
        </Link>
        <Link
          href="/manage-survey"
          className="w-full max-w-[200px] min-h-[50px] flex justify-center items-center text-center bg-secondary-1 hover:bg-secondary-2 hover:text-primary-1 font-semibold rounded-md"
        >
          Kelola Survei
        </Link>
        <Link
          href="/exchange"
          className="w-full max-w-[200px] min-h-[50px] flex justify-center items-center text-center bg-secondary-1 hover:bg-secondary-2 hover:text-primary-1 font-semibold rounded-md"
        >
          Penukaran Poin
        </Link>
      </div>
    );
  }
}
