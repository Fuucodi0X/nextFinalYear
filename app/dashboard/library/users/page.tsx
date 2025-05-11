"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, UserPlusIcon, FilterIcon, DownloadIcon, Home, Book, Users, Settings } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const navItems = [
  { href: "/dashboard/library", label: "Dashboard", icon: Home },
  { href: "/dashboard/library/books", label: "Books", icon: Book },
  { href: "/dashboard/library/users", label: "Users", icon: Users },
  { href: "/dashboard/library/settings", label: "Settings", icon: Settings },
]

// Sample data for users
const users = [
  {
    id: "U001",
    name: "John Doe",
    studentId: "S12345",
    email: "john.doe@example.com",
    membershipType: "Student",
    borrowedBooks: 2,
    status: "Active",
  },
  {
    id: "U002",
    name: "Jane Smith",
    studentId: "S12346",
    email: "jane.smith@example.com",
    membershipType: "Student",
    borrowedBooks: 1,
    status: "Active",
  },
  {
    id: "U003",
    name: "Michael Johnson",
    studentId: "S12347",
    email: "michael.johnson@example.com",
    membershipType: "Student",
    borrowedBooks: 3,
    status: "Active",
  },
  {
    id: "U004",
    name: "Emily Williams",
    studentId: "S12348",
    email: "emily.williams@example.com",
    membershipType: "Student",
    borrowedBooks: 0,
    status: "Inactive",
  },
  {
    id: "U005",
    name: "David Brown",
    studentId: "F12349",
    email: "david.brown@example.com",
    membershipType: "Faculty",
    borrowedBooks: 5,
    status: "Active",
  },
  {
    id: "U006",
    name: "Sarah Miller",
    studentId: "S12350",
    email: "sarah.miller@example.com",
    membershipType: "Student",
    borrowedBooks: 1,
    status: "Active",
  },
  {
    id: "U007",
    name: "James Wilson",
    studentId: "F12351",
    email: "james.wilson@example.com",
    membershipType: "Faculty",
    borrowedBooks: 2,
    status: "Active",
  },
  {
    id: "U008",
    name: "Jessica Taylor",
    studentId: "S12352",
    email: "jessica.taylor@example.com",
    membershipType: "Student",
    borrowedBooks: 0,
    status: "Inactive",
  },
]

// Column definitions for users
const userColumns: ColumnDef<(typeof users)[0]>[] = [
  {
    accessorKey: "studentId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "membershipType",
    header: "Membership Type",
    cell: ({ row }) => {
      const membershipType = row.getValue("membershipType") as string
      return (
        <Badge variant="outline" className="font-normal">
          {membershipType}
        </Badge>
      )
    },
  },
  {
    accessorKey: "borrowedBooks",
    header: "Borrowed Books",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
]

export default function UsersPage() {
  return (
    <DashboardLayout navItems={navItems} title="Users" icon={Users} showBackButton={true}>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <Button>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,854</div>
              <p className="text-xs text-muted-foreground">+156 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">82% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Members</CardTitle>
              <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,154</div>
              <p className="text-xs text-muted-foreground">75% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
              <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">700</div>
              <p className="text-xs text-muted-foreground">25% of total</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all users registered in the library system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users by name, ID, or email..." className="pl-8" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <DataTable columns={userColumns} data={users} />
              </TabsContent>
              <TabsContent value="active" className="space-y-4">
                <DataTable columns={userColumns} data={users.filter((user) => user.status === "Active")} />
              </TabsContent>
              <TabsContent value="students" className="space-y-4">
                <DataTable columns={userColumns} data={users.filter((user) => user.membershipType === "Student")} />
              </TabsContent>
              <TabsContent value="faculty" className="space-y-4">
                <DataTable columns={userColumns} data={users.filter((user) => user.membershipType === "Faculty")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
