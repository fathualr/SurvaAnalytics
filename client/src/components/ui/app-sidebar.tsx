"use client"

import { Calendar, Home, Inbox, Search, Settings, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Pengguna",
    icon: Search,
    children: [
      {
        title: "Klien",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Admin",
        url: "#",
        icon: Settings,
      },
    ],
  },
  {
    title: "Survei",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Kalkulasi Harga",
    url: "#",
    icon: Calendar,
  },
]

export function AppSidebar() {
  const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({})

  const toggleOpen = (title: string) => {
    setOpenMap((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <Sidebar className=" text-white">
      <SidebarContent>
        <SidebarGroup>
          <Image
            src="/images/surva-white.png"
            width={100}
            height={100}
            alt="Logo"
            className="m-6"
          />
          <SidebarGroupContent className="px-2  mt-12">
            <SidebarMenu className="flex flex-col gap-3 text-base ">
              {items.map((item) => {
                if (!item.children) {
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="bg-white text-black rounded-md hover:bg-gray-100 transition-all p-0.5"
                    >
                      <SidebarMenuButton asChild >
                        <a
                          href={item.url}
                          className="flex items-center gap-3 px-5 py-2"
                        >
                          <span >{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                // Jika item punya submenu
                const isOpen = openMap[item.title] || false

                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={() => toggleOpen(item.title)}
                    className="bg-white text-black rounded-md hover:rounded-md"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuItem className="hover:bg-gray-100 hover:rounded-md transition-all">
                        <SidebarMenuButton asChild>
                          <button className="flex items-center justify-between w-full px-6 py-2">
                            <div className="flex items-center gap-3">
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown
                              className={`transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.children.map((sub) => (
                        <SidebarMenuItem
                          key={sub.title}
                          className="ml-6 hover:bg-gray-100 rounded-md transition-all"
                        >
                          <SidebarMenuButton asChild>
                            <a
                              href={sub.url}
                              className="flex items-center gap-3 px-5 py-2"
                            >
                              <span>{sub.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
