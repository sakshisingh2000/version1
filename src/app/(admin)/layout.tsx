import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
