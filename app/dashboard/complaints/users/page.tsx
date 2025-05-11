"use client"

import { useState } from "react"
import { Home, MessageSquare, Search, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navItems = [
  { href: "/dashboard/complaints", label: "Dashboard", icon: Home },
  { href: "/dashboard/complaints/users", label: "Users", icon: Users },
  { href: "/dashboard/complaints/history", label: "History", icon: MessageSquare },
  { href: "/dashboard/complaints/settings", label: "Settings", icon: Settings },
]

// Mock user data with disciplinary records
const mockUsers = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    department: "Computer Science",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 2,
    suspensionCount: 0,
    status: "active",
    lastIncident: "2023-05-10T14:30:00Z",
    complaintCount: 3,
  },
  {
    id: "STU-1002",
    name: "Sarah Williams",
    email: "sarah.williams@university.edu",
    phone: "(555) 234-5678",
    department: "Business",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 1,
    suspensionCount: 0,
    status: "active",
    lastIncident: "2023-05-11T02:15:00Z",
    complaintCount: 1,
  },
  {
    id: "STU-1003",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    phone: "(555) 456-7890",
    department: "Literature",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
    lastIncident: null,
    complaintCount: 1,
  },
  {
    id: "FAC-1001",
    name: "Michael Brown",
    email: "michael.brown@university.edu",
    phone: "(555) 345-6789",
    department: "Physics",
    position: "Professor",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
    lastIncident: "2023-05-12T12:10:00Z",
    complaintCount: 1,
  },
  {
    id: "STU-1004",
    name: "James Wilson",
    email: "james.wilson@university.edu",
    phone: "(555) 567-8901",
    department: "Engineering",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 3,
    suspensionCount: 1,
    status: "suspended",
    lastIncident: "2023-05-05T09:45:00Z",
    complaintCount: 5,
    suspensionEnd: "2023-06-05T00:00:00Z",
  },
  {
    id: "STU-1005",
    name: "Olivia Martinez",
    email: "olivia.martinez@university.edu",
    phone: "(555) 678-9012",
    department: "Psychology",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 1,
    suspensionCount: 0,
    status: "active",
    lastIncident: "2023-04-28T15:20:00Z",
    complaintCount: 2,
  },
  {
    id: "STU-1006",
    name: "Ethan Thompson",
    email: "ethan.thompson@university.edu",
    phone: "(555) 789-0123",
    department: "Mathematics",
    position: "Student",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
    lastIncident: null,
    complaintCount: 0,
  },
  {
    id: "FAC-1002",
    name: "Sophia Garcia",
    email: "sophia.garcia@university.edu",
    phone: "(555) 890-1234",
    department: "Chemistry",
    position: "Professor",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
    lastIncident: null,
    complaintCount: 0,
  },
]

export default function ComplaintsUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter users based on search query and selected tab
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "warnings" && user.warningCount > 0) ||
      (selectedTab === "suspensions" && user.suspensionCount > 0) ||
      (selectedTab === "clean" && user.complaintCount === 0)

    return matchesSearch && matchesTab
  })

  // Sort users based on selected sort option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "department":
        return a.department.localeCompare(b.department)
      case "warnings":
        return b.warningCount - a.warningCount
      case "complaints":
        return b.complaintCount - a.complaintCount
      case "recent":
        if (!a.lastIncident) return 1
        if (!b.lastIncident) return -1
        return new Date(b.lastIncident).getTime() - new Date(a.lastIncident).getTime()
      default:
        return 0
    }
  })

  return (
    <DashboardLayout navItems={navItems} title="User Management" icon={Users} showBackButton={true}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Disciplinary Records</CardTitle>
          <CardDescription>View and manage user disciplinary records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center w-full md:w-2/3">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                placeholder="Search users by name, ID, or department..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="warnings">Warning Count</SelectItem>
                  <SelectItem value="complaints">Complaint Count</SelectItem>
                  <SelectItem value="recent">Most Recent Incident</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="warnings">With Warnings</TabsTrigger>
              <TabsTrigger value="suspensions">Suspended</TabsTrigger>
              <TabsTrigger value="clean">Clean Record</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedUsers.length > 0 ? (
                  sortedUsers.map((user) => (
                    <Card key={user.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.department}</p>
                          </div>
                          <Badge variant={user.status === "suspended" ? "destructive" : "outline"} className="ml-auto">
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="border-t px-4 py-3 bg-muted/40">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">Complaints</p>
                              <p className="font-medium">{user.complaintCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Warnings</p>
                              <p className="font-medium">{user.warningCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Suspensions</p>
                              <p className="font-medium">{user.suspensionCount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Last Incident</p>
                            <p className="text-sm">
                              {user.lastIncident ? new Date(user.lastIncident).toLocaleDateString() : "No incidents"}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/complaints?user=${user.id}`}>View Record</a>
                          </Button>
                        </div>

                        {user.status === "suspended" && user.suspensionEnd && (
                          <div className="px-4 py-2 bg-destructive/10 border-t">
                            <p className="text-xs text-center">
                              Suspended until {new Date(user.suspensionEnd).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No Users Found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "No users match your search criteria" : "There are no users in this category"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
