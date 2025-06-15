import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex-grow">
        <AdminHeader />
        <main className="flex flex-1 flex-col p-3 bg-accent-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
