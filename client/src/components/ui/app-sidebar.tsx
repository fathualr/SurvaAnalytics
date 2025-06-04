"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calculator,
  Gift,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Pengguna",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Umum",
          url: "/admin/umum",
        },
        {
          title: "Admin",
          url: "/admin/admin",
        },
      ],
    },
    {
      title: "Survei",
      url: "/admin/survei",
      icon: ClipboardList,
    },
    {
      title: "Kalkulasi Harga",
      url: "/admin/harga",
      icon: Calculator,
      
    },
    {
      title: "Hadiah",
      url: "/admin/hadiah",
      icon: Gift,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
