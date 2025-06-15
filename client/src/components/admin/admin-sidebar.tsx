"use client"

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calculator,
  Gift,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { create } from 'zustand'

interface SidebarState {
  openMenus: Record<string, boolean>
  toggleMenu: (id: string) => void
  setMenuState: (id: string, state: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  openMenus: {},
  toggleMenu: (id) =>
    set((state) => ({
      openMenus: {
        ...state.openMenus,
        [id]: !state.openMenus[id],
      },
    })),
  setMenuState: (id, stateVal) =>
    set((state) => ({
      openMenus: {
        ...state.openMenus,
        [id]: stateVal,
      },
    })),
}))

export function AdminSidebar() {
  const isUserOpen = useSidebarStore((s) => s.openMenus["user"])
  const isSurveyOpen = useSidebarStore((s) => s.openMenus["survey"])
  const isRewardOpen = useSidebarStore((s) => s.openMenus["reward"])
  const toggleMenu = useSidebarStore((s) => s.toggleMenu)

  return (
    <Sidebar className="border-none font-medium" collapsible="icon">
      <SidebarContent className="bg-primary-1">
        <SidebarGroup className="justify-center items-center py-0">
          <div className="flex justify-center items-center h-16 w-full">
            <Image
              src="/images/surva-white.png"
              width={0}
              height={0}
              sizes="25vw"
              alt="Logo"
              className="h-8 w-full object-contain"
            />
          </div>
          <SidebarMenu className="gap-3 pt-0">

            <SidebarMenuItem className="rounded-sm justify-center">
              <SidebarMenuButton asChild tooltip="Dashboard" className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Separator className="border border-accent-1/10" />
            <SidebarGroupLabel className="grid contens-center h-4 text-accent-1/75">
              Data
            </SidebarGroupLabel>

            <Collapsible open={isUserOpen} onOpenChange={() => toggleMenu("user")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild className="cursor-pointer h-10 transition">
                  <SidebarMenuButton tooltip="Data Pengguna" className="group text-accent-1 hover:text-primary-1 active:text-primary-1 data-[state=open]:hover:text-primary-1 h-10 transition">
                    <Users />
                    Pengguna
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-admin">
                          Admin
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-user">
                          Umum
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible open={isSurveyOpen} onOpenChange={() => toggleMenu("survey")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild className="cursor-pointer h-10 transition">
                  <SidebarMenuButton tooltip="Data Survei" className="group text-accent-1 hover:text-primary-1 active:text-primary-1 data-[state=open]:hover:text-primary-1 h-10 transition">
                    <ClipboardList />
                    Survei
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-survey">
                          Daftar Survei
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-verification">
                          Verifikasi
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-payment">
                          Pembayaran
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible open={isRewardOpen} onOpenChange={() => toggleMenu("reward")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild className="cursor-pointer h-10 transition">
                  <SidebarMenuButton tooltip="Data Hadiah" className="group text-accent-1 hover:text-primary-1 active:text-primary-1 data-[state=open]:hover:text-primary-1 h-10 transition">
                    <Gift />
                    Hadiah
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-reward">
                          Daftar Hadiah
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                        <Link href="/admin/manage-exchange">
                          Penukaran
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Separator className="border border-accent-1/10" />
            <SidebarGroupLabel className="grid contens-center border-t-accent-1 h-4 text-accent-1/75">
              Konfigurasi
            </SidebarGroupLabel>

            <SidebarMenuItem className="rounded-sm">
              <SidebarMenuButton asChild tooltip="Harga Survei" className="text-accent-1 hover:text-primary-1 active:text-primary-1 h-10 transition">
                <Link href="/admin/configuration-price" className="flex items-center gap-2">
                  <Calculator />
                  Harga Survei
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
