"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { FileText, Briefcase, GraduationCap, Lightbulb, FolderKanban, Palette, ChevronRight } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function ResumeBuilderSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const routes = [
    {
      title: "Basic Info",
      path: "/resume-builder/basic-info",
      icon: FileText,
    },
    {
      title: "Experience",
      path: "/resume-builder/experience",
      icon: Briefcase,
    },
    {
      title: "Education",
      path: "/resume-builder/education",
      icon: GraduationCap,
    },
    {
      title: "Skills",
      path: "/resume-builder/skills",
      icon: Lightbulb,
    },
    {
      title: "Projects",
      path: "/resume-builder/projects",
      icon: FolderKanban,
    },
    {
      title: "Theme",
      path: "/resume-builder/theme",
      icon: Palette,
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Resume Builder</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton asChild isActive={pathname === route.path} tooltip={route.title}>
                    <Link href={route.path}>
                      <route.icon className="h-4 w-4" />
                      <span>{route.title}</span>
                      {pathname === route.path && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarTrigger className="absolute top-4 right-0 translate-x-1/2" />
    </Sidebar>
  )
}

