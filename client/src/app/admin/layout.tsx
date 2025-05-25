import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import {Navbar} from "@/components/ui/navbar-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar></Navbar>
      <SidebarProvider>
      <AppSidebar />
      <main className="flex-grow p-6">
        {children}
      </main>
    </SidebarProvider>
    </div>
  );
}
