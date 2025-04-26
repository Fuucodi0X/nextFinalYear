"use client"

import { useState } from "react"
import { BarChart3, Bell, Calendar, Clock, Home, LogOut, Menu, Settings, Shield, User, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsCards } from "@/components/analytics-cards"
import { RecentScansTable } from "@/components/recent-scans-table"
import { UserDetailsCard } from "@/components/user-details-card"
import { ScanSimulator } from "@/components/scan-simulator"
import { ItemRegistration } from "@/components/item-registration"
import { ItemChecking } from "@/components/item-checking"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<any>(null)
  const [direction, setDirection] = useState<"entry" | "exit">("entry")
  const [registeredItems, setRegisteredItems] = useState<any[]>([])

  const handleScan = (user: any) => {
    setActiveUser(user)

    // If this is an exit scan, automatically populate with any previously registered items
    if (direction === "exit" && user) {
      // In a real app, you would fetch the user's registered items from a database
      // For demo purposes, we'll create some sample items if none exist
      if (registeredItems.length === 0) {
        const sampleItems = [
          {
            id: `item-${Date.now()}-1`,
            name: "Laptop",
            category: "Electronics",
            description: 'MacBook Pro 16"',
            serialNumber: "MBP2023001",
            registeredAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            owner: user.id,
            status: "registered",
            checked: false,
          },
          {
            id: `item-${Date.now()}-2`,
            name: "Backpack",
            category: "Personal",
            description: "Black backpack with company logo",
            serialNumber: "N/A",
            registeredAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            owner: user.id,
            status: "registered",
            checked: false,
          },
        ]
        setRegisteredItems(sampleItems)
      }
    }

    toast({
      title: `NFC Card Scanned (${direction.toUpperCase()})`,
      description: `${user.name} scanned at Gate ${user.gate}`,
    })
  }

  const handleDirectionChange = (checked: boolean) => {
    setDirection(checked ? "exit" : "entry")
    setActiveUser(null)
    if (!checked) {
      // Reset registered items when switching to entry mode
      setRegisteredItems([])
    }
  }

  const handleItemRegistered = (item: any) => {
    const newItem = {
      ...item,
      id: `item-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      owner: activeUser.id,
      status: "registered",
      checked: false,
    }

    setRegisteredItems([...registeredItems, newItem])

    toast({
      title: "Item Registered",
      description: `${item.name} has been registered for ${activeUser.name}`,
    })
  }

  const handleItemChecked = (itemId: string, checked: boolean) => {
    setRegisteredItems(
      registeredItems.map((item) =>
        item.id === itemId ? { ...item, checked, status: checked ? "checked" : "registered" } : item,
      ),
    )
  }

  const handleAllItemsChecked = () => {
    setRegisteredItems(registeredItems.map((item) => ({ ...item, checked: true, status: "checked" })))

    toast({
      title: "All Items Verified",
      description: `All items have been verified for ${activeUser.name}`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="h-6 w-6" />
                <span>SecureGate</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-primary">
                <Home className="h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personnel
              </a>
              <a href="#" className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Reports
              </a>
              <a href="#" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <Shield className="h-6 w-6" />
          <span>SecureGate</span>
        </a>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>SO</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <nav className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary transition-colors"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Personnel
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Reports
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </a>
            <div className="flex-1"></div>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </a>
          </div>
        </nav>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="direction-mode" className={direction === "entry" ? "text-green-600" : "text-amber-600"}>
                  {direction === "entry" ? "Entry Mode" : "Exit Mode"}
                </Label>
                <Switch id="direction-mode" checked={direction === "exit"} onCheckedChange={handleDirectionChange} />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gate 1</span>
                <Badge variant="outline" className="ml-2">
                  Active
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-full">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-0.5">
                  <CardTitle className="text-xl">Security Gate Dashboard</CardTitle>
                  <CardDescription>
                    {direction === "entry"
                      ? "Register items as personnel enter the facility"
                      : "Verify items as personnel exit the facility"}
                  </CardDescription>
                </div>
                <ScanSimulator onScan={handleScan} className="ml-auto" />
              </CardHeader>
            </Card>
            <AnalyticsCards />
          </div>
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recent-scans">Recent Scans</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              {activeUser && (
                <div className="ml-auto flex items-center gap-2 rounded-lg bg-muted px-3 py-1">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Active scan: {activeUser.name}</span>
                  <Badge variant={direction === "entry" ? "default" : "secondary"} className="ml-2">
                    {direction.toUpperCase()}
                  </Badge>
                </div>
              )}
            </div>
            <TabsContent value="overview" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeUser ? (
                <>
                  <UserDetailsCard user={activeUser} className="md:col-span-1" />
                  <Card className="md:col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>{direction === "entry" ? "Item Registration" : "Item Verification"}</CardTitle>
                      <CardDescription>
                        {direction === "entry"
                          ? "Register items being brought into the facility"
                          : "Verify items being taken out of the facility"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {direction === "entry" ? (
                        <ItemRegistration onItemRegistered={handleItemRegistered} registeredItems={registeredItems} />
                      ) : (
                        <ItemChecking
                          items={registeredItems}
                          onItemChecked={handleItemChecked}
                          onAllItemsChecked={handleAllItemsChecked}
                        />
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Waiting for NFC Scan</CardTitle>
                    <CardDescription>
                      {direction === "entry"
                        ? "Scan an NFC card to register items for entry"
                        : "Scan an NFC card to verify items for exit"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex h-40 items-center justify-center">
                    <div className="text-center">
                      <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Use the "Simulate Scan" button to test</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="recent-scans">
              <RecentScansTable />
            </TabsContent>
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Recent security alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-amber-50 p-4 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium">Unauthorized Access Attempt</span>
                        <Badge variant="outline" className="ml-auto">
                          10:23 AM
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm">Unregistered NFC card attempted access at Gate 2</p>
                    </div>
                    <div className="rounded-lg border bg-red-50 p-4 text-red-900 dark:bg-red-950 dark:text-red-200">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium">Unverified Item Exit</span>
                        <Badge variant="outline" className="ml-auto">
                          11:45 AM
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm">Employee ID #4532 attempted to exit with unverified items</p>
                    </div>
                    <div className="rounded-lg border bg-muted p-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium">System Maintenance</span>
                        <Badge variant="outline" className="ml-auto">
                          2 days ago
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm">Scheduled system maintenance completed successfully</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Alerts
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
