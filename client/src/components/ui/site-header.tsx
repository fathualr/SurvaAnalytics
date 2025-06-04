"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b py-1 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <div className="relative flex flex-col justify-center" ref={dropdownRef}>
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
              <div className="absolute right-0 top-10 mt-2 w-[90vw] max-w-[220px] bg-white rounded-lg shadow-lg z-20 p-4 text-sm">
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
                <hr className="pb-2" />
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
      </div>
    </header>
  )
}
