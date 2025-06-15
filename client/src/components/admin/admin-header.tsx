"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import { useAuth } from '@/features/auth/hooks/useAuth';
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CircleUserRound, IdCard, LogOut } from "lucide-react"

export function AdminHeader() {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, user, logout, hydrated } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

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

  if (!hydrated) return (
    <header className="sticky top-0 w-full flex justify-between items-center gap-2 bg-primary-1 border border-y-0 border-r-0 border-l-accent-1/10 py-1 h-16 md:px-6 px-3 z-10">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <div className="flex flex-col justify-center relative" ref={dropdownRef}>
          <button className="cursor-pointer flex justify-center items-center text-accent-1 hover:text-primary-1 hover:bg-accent-1 h-10 w-10 rounded-md transition">
            <CircleUserRound className="h-8 w-8" />
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <header className="sticky top-0 w-full flex justify-between items-center gap-2 bg-primary-1 border border-y-0 border-r-0 border-l-accent-1/10 py-1 h-16 md:px-6 px-3 z-10">
      <SidebarTrigger />

      {isLoggedIn ? (
        <div className="flex flex-col justify-center relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="cursor-pointer flex justify-center items-center text-accent-1 hover:text-primary-1 hover:bg-accent-1 h-10 w-10 rounded-md transition">
            <CircleUserRound className="h-8 w-8" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-10 mt-4 max-w-[220px] bg-primary-1 text-accent-1 rounded-lg shadow-md z-20 p-4">
              <div>
                <span className="block text-md font-semibold truncate whitespace-nowrap overflow-hidden">
                  {user?.Admin?.nama_admin || 'Anonim'}
                </span>
                <span className="block text-xs truncate whitespace-nowrap overflow-hidden">
                  {user?.email || '@email'}
                </span>
              </div>
              <ul className='gap-1 py-3 border-b font-medium'>
                <li>
                  <Link
                    href="/admin/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent-1 hover:text-primary-1 transition-all"
                  >
                    <IdCard />
                    <span>Profile</span>
                  </Link>
                </li>
              </ul>
              <Button
                variant="ghost"
                className="font-medium text-base w-48 mt-2 py-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
                onClick={logout}
              >
                <LogOut />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" passHref>
          <Button className="cursor-pointer text-lg font-semibold bg-accent-1 text-primary-1 hover:bg-primary-3 hover:text-accent-1">
            Masuk
          </Button>
        </Link>
      )}

    </header>
  )
}
