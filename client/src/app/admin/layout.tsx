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
        <div className="flex-grow min-w-0 bg-background">
          <AdminHeader />
          <Toaster />
          <main className="flex flex-grow bg-foreground flex-col p-3 min-h-[calc(100%-64px)]">
            <div className="bg-background fixed inset-0 -z-10 pointer-events-none w-full" />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </RequireAuth>
  )
}
