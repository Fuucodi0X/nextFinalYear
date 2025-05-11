"use client"

import { Book, Home, Settings, Users } from "lucide-react"
import SettingsClientPage from "./SettingsClientPage"
import { DashboardLayout } from "@/components/dashboard-layout"

const navItems = [
  { href: "/dashboard/library", label: "Dashboard", icon: Home },
  { href: "/dashboard/library/books", label: "Books", icon: Book },
  { href: "/dashboard/library/users", label: "Users", icon: Users },
  { href: "/dashboard/library/settings", label: "Settings", icon: Settings },
]

export default function LibrarySettingsPage() {
  return (
    <DashboardLayout navItems={navItems} title="Libray Settings" icon={Settings} showBackButton={true}>
      <SettingsClientPage />
    </DashboardLayout>
  )
}
