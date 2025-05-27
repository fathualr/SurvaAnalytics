"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex justify-between bg-[#F0F0F0]/90 shadow-md z-10">

      <div className="size-full mx-auto md:px-[50] px-[20] flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 flex items-center">
          <Image
            src="/images/surva.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[120px] h-auto object-contain"
          />
        </Link>

        <div className="flex flex-col justify-center relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="cursor-pointer hover:bg-[#FFF]/80 rounded-full">
            <Image 
              src="/icons/navbar/user-circle.svg" 
              alt="Profile" 
              width={0} 
              height={0} 
              className="w-[40px] rounded-full object-cover" 
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-10 mt-4 max-w-[220px] bg-[#F0F0F0]/90 rounded-lg shadow-md z-20 p-4">
              <div>
                <span className='block text-md font-semibold'>Nama pengguna</span>
                <span className='block text-xs text-gray-500'>Nama@email.com</span>
              </div>
              <ul className='gap-1 py-3 border-b'>
                <li>
                  <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#FFFFFF]">
                    <Image 
                      src="/icons/navbar/identification-card.svg" 
                      alt="Profile Icon" 
                      width={20} 
                      height={20} 
                      className="object-contain" 
                    />
                    <span>Profile</span>
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="cursor-pointer w-48 mt-2 py-2 hover:bg-[#FFFFFF]">
                <Image src="/icons/navbar/sign-out.svg" 
                  alt="Profile Icon" 
                  width={20} 
                  height={20} 
                  className="object-contain" 
                />
                <span>Logout</span>
              </Button>
            </div>
          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;