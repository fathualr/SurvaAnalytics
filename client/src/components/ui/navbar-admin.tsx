"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
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
    <div className="flex justify-end items-center p-4 relative" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Welcome, Fathu</span>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img
            src="/user.svg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-14 right-4 w-48 bg-white rounded-lg shadow-lg z-30 p-4 text-sm">
          <div className="flex items-center gap-2 pb-2">
            <img
              src="/user.svg"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-800">Fathu</span>
            </div>
          </div>
          <hr className="pb-2" />
          <Link
            href="/profile"
            className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <Image src="/profile.svg" alt="Profile Icon" width={20} height={20} />
            <span>Profile</span>
          </Link>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-full mt-2 text-blue-500 border border-blue-400 hover:bg-blue-50"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
