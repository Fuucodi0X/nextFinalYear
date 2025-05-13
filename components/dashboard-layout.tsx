"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, Bell, LogOut, type LucideIcon } from "lucide-react"
import { type ReactNode, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface DashboardLayoutProps {
  children: ReactNode
  navItems: NavItem[]
  title: string
  icon: LucideIcon
  showBackButton?: boolean
}

export function DashboardLayout({
  children,
  navItems,
  title,
  icon: Icon,
  showBackButton = false,
}: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)

  const handleBackClick = () => {
    // Extract the parent path by removing the last segment
    const parentPath = pathname.split("/").slice(0, -1).join("/")
    router.push(parentPath)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <Icon className="h-6 w-6" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {showNotifications && (
            <div className="absolute right-4 top-14 w-80 rounded-md border bg-background p-4 shadow-md">
              <h3 className="mb-2 font-medium">Notifications</h3>
              <div className="space-y-2">
                <div className="rounded-md bg-muted p-2 text-sm">
                  <p className="font-medium">System Update</p>
                  <p className="text-muted-foreground">New features have been added to the dashboard.</p>
                </div>
                <div className="rounded-md bg-muted p-2 text-sm">
                  <p className="font-medium">New User Registered</p>
                  <p className="text-muted-foreground">A new user has been registered in the system.</p>
                </div>
              </div>
            </div>
          )}

          {/* User profile dropdown with logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.username || "User"} />
                  <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="w-64 border-r bg-muted/40 px-3 py-4">
          <div className="flex h-full flex-col">
            <div className="space-y-1">
              {navItems.map((item) => {
                const ItemIcon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <ItemIcon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </nav>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
