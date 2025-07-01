"use client";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calculator,
  Gift,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
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
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { create } from "zustand";

interface SidebarState {
  openMenus: Record<string, boolean>;
  toggleMenu: (id: string) => void;
  setMenuState: (id: string, state: boolean) => void;
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
}));

export function AdminSidebar() {
  const isUserOpen = useSidebarStore((s) => s.openMenus["user"]);
  const isSurveyOpen = useSidebarStore((s) => s.openMenus["survey"]);
  const isRewardOpen = useSidebarStore((s) => s.openMenus["reward"]);
  const toggleMenu = useSidebarStore((s) => s.toggleMenu);

  return (
    <Sidebar className="border border-y-0 border-l-0 border-glass-border font-medium" collapsible="icon">
      <SidebarContent className="bg-background text-foreground">
        <SidebarGroup className="justify-center items-center py-0">
          <div className="flex justify-center items-center h-16 w-full">
            <Image
              src="/images/surva.png"
              width={0}
              height={0}
              sizes="25vw"
              alt="Logo"
              className="h-8 w-full object-contain"
            />
          </div>

          <SidebarMenu className="gap-3 pt-0">

            <SidebarMenuItem className="rounded-sm justify-center">
              <SidebarMenuButton asChild tooltip="Dashboard" className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Separator className="border border-foreground/10" />
            <SidebarGroupLabel className="grid content-center h-4 text-foreground/75">
              Data
            </SidebarGroupLabel>

            <Collapsible open={isUserOpen} onOpenChange={() => toggleMenu("user")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="User Data" className="cursor-pointer group text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                    <Users />
                    Users
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0 border-muted-foreground/20">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-admin">
                          Admin
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-user">
                          Public
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible open={isSurveyOpen} onOpenChange={() => toggleMenu("survey")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Survey Data" className="cursor-pointer group text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                    <ClipboardList />
                    Surveys
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0 border-muted-foreground/20">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-survey">
                          Survey List
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-verification">
                          Verifications
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-payment">
                          Payments
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible open={isRewardOpen} onOpenChange={() => toggleMenu("reward")} asChild>
              <SidebarMenuItem className="rounded-sm">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Reward Data" className="cursor-pointer group text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                    <Gift />
                    Rewards
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pr-0 mr-0 border-muted-foreground/20">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-reward">
                          Reward List
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="text-foreground hover:text-background hover:bg-muted-foreground h-10 transition">
                        <Link href="/admin/manage-exchange">
                          Redemptions
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Separator className="border border-foreground/10" />
            <SidebarGroupLabel className="grid content-center border-t-foreground h-4 text-foreground/75">
              Configuration
            </SidebarGroupLabel>

            <SidebarMenuItem className="rounded-sm">
              <SidebarMenuButton asChild tooltip="Survey Pricing" className="text-foreground bg-background hover:text-background hover:bg-muted-foreground h-10 transition">
                <Link href="/admin/configuration/survey-price" className="flex items-center gap-2">
                  <Calculator />
                  Survey Price
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
