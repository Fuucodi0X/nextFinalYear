"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Search, Filter, Home, Book, Settings, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { books } from "./data"
import { DashboardLayout } from "@/components/dashboard-layout"

const navItems = [
  { href: "/dashboard/library", label: "Dashboard", icon: Home },
  { href: "/dashboard/library/books", label: "Books", icon: Book },
  { href: "/dashboard/library/users", label: "Users", icon: Users },
  { href: "/dashboard/library/settings", label: "Settings", icon: Settings },
]

export default function BooksPage() {
  return (
    <DashboardLayout navItems={navItems} title="Book Management" icon={Book} showBackButton={true}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Books Management</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search books..." className="w-[200px] pl-8 md:w-[300px]" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,385</div>
                  <p className="text-xs text-muted-foreground">+120 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,245</div>
                  <p className="text-xs text-muted-foreground">74% of total inventory</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Borrowed Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,140</div>
                  <p className="text-xs text-muted-foreground">26% of total inventory</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">7.6% of borrowed books</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Books</CardTitle>
                <CardDescription>Manage all books in the library inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={books} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Books</CardTitle>
                <CardDescription>Books currently available for borrowing</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={books.filter((book) => book.status === "Available")} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="borrowed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Borrowed Books</CardTitle>
                <CardDescription>Books currently borrowed by users</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={books.filter((book) => book.status === "Borrowed")} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overdue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overdue Books</CardTitle>
                <CardDescription>Books that are past their due date</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={books.filter((book) => book.status === "Overdue")} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
