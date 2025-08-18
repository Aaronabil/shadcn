"use client"

import * as React from "react"
import {
  IconDashboard,
  IconDatabase,
  IconBooks,
  IconReport,
  IconCertificate,
} from "@tabler/icons-react"
import { FaTasks } from "react-icons/fa"
import { GiBookAura } from "react-icons/gi"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/authcontext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  const data = {
    user: {
      name: user?.user_metadata?.full_name ?? "shadcn",
      email: user?.email ?? "no-email@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Courses",
        url: "/courses",
        icon: IconBooks,
      },
      {
        title: "Assigments",
        url: "/assignments",
        icon: FaTasks,
      },
      {
        title: "Certificates",
        url: "/certificates",
        icon: IconCertificate,
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "/data-library",
        icon: IconDatabase,
      },
      {
        name: "Reports",
        url: "/reports",
        icon: IconReport,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <GiBookAura className="!size-5" />
                <span className="text-base font-semibold">LMS.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
