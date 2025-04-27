import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex p-4 justify-between items-center">

      <div>
        <Link href="/login" className="hover:opacity-80 flex items-center">
          <Image src="/images/surva.png" alt="Logo" width={80} height={20} />
        </Link>
      </div>

      <div>
        <p className="font-semibold text-black">Welcome Karina</p>
      </div>
      <div>
            <Image 
              src="/images/user.png" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="rounded-full object-cover" 
            />
      </div>
    </nav>
  );
};

export default Navbar;
