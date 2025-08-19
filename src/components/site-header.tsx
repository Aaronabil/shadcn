// import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/authcontext"

export function SiteHeader() {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState("Student Dashboard")
  const { user } = useAuth()

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
      case "/":
        setPageTitle(`Hello ${user?.user_metadata?.full_name || user?.email || "Student"}, Welcome to Student Dashboard👋`)
        break
      case "/my-classes":
        setPageTitle("My Classes")
        break
      case "/modules":
        setPageTitle("Module")
        break
      case "/assignments":
        setPageTitle("Assignments")
        break
      case "/exams":
        setPageTitle("Exams or Quizzes")
        break
      case "/grades":
        setPageTitle("Grades")
        break
      case "/discussion-forum":
        setPageTitle("Discussion Forum")
        break
      case "/data-library":
        setPageTitle("Data Library")
        break
      case "/reports":
        setPageTitle("Reports")
        break
      default:
        setPageTitle("Student Dashboard") // Default title
        break
    }
  }, [location.pathname, user])

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
