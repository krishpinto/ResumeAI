import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import ResumeBuilderSidebar from "@/components/resume-builder-sidebar"

export default function ResumeBuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 pt-16">
        {" "}
        {/* Added pt-16 to account for navbar height */}
        <SidebarProvider>
          <ResumeBuilderSidebar />
          <SidebarInset>
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

