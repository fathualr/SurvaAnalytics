import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Toaster } from "sonner"
import { RequireAuth } from "@/guards/RequireAuth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={['admin']}>
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex-grow min-w-0">
          <AdminHeader />
          <Toaster />
          <main className="flex flex-grow flex-col p-3 bg-accent-1 min-h-[calc(100%-64px)]">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </RequireAuth>
  )
}
