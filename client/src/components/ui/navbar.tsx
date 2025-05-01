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
    <nav className="w-full h-16 flex  justify-between bg-white shadow-md  z-10">
      <div className="size-full mx-auto px-4 flex items-center justify-between">
   
        <Link href="/" className="hover:opacity-80 flex items-center">
          <Image src="/images/surva.png" alt="Logo" width={80} height={20} />
        </Link>

        <div className="hidden md:block">
          <p className="font-semibold text-black">Welcome Karina</p>
        </div>


        <div className="flex flex-col justify-center relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="focus:outline-none cursor-pointer hover:bg-gray-100 rounded-full">
            <Image 
              src="/user.svg" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="rounded-full object-cover" 
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-10 mt-2 w-[90vw] max-w-[220px] bg-white rounded-lg shadow-lg z-20 p-4 text-sm md: ">
              <div className="flex items-center gap-2 pb-2">
                <Image 
                  src="/user.svg" 
                  alt="profile" 
                  width={50} 
                  height={50} 
                  className="rounded-full p-1"
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-800">Karina</span>
                </div>
              </div>
              <hr className='pb-2' />
              <Link href="/profile" className="flex items-center gap-3 px-1 py-2 text-gray-800 hover:bg-gray-100">
                <Image 
                  src="/profile.svg" 
                  alt="Profile Icon" 
                  width={20} 
                  height={20} 
                  className="object-contain" 
                />
                <span>Profile</span>
              </Link>
              <div className="flex justify-center">
                <Button variant="outline" className="w-48 mt-2 text-blue-500 border border-blue-400 hover:bg-blue-50">
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;