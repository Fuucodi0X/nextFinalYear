import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { users } from "./data"

export const metadata: Metadata = {
  title: "Users | Cafe Dashboard",
  description: "Manage cafe users and their meal plans",
}

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
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
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="standard">Standard Plan</TabsTrigger>
            <TabsTrigger value="vegetarian">Vegetarian Plan</TabsTrigger>
            <TabsTrigger value="special">Special Diets</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+180 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Standard Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">845</div>
                <p className="text-xs text-muted-foreground">67.7% of total users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vegetarian Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">267</div>
                <p className="text-xs text-muted-foreground">21.4% of total users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Special Diets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">136</div>
                <p className="text-xs text-muted-foreground">10.9% of total users</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage all users registered in the cafe system</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={users} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="standard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Standard Plan Users</CardTitle>
              <CardDescription>Users on the standard meal plan</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={users.filter((user) => user.mealPlan === "Standard")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vegetarian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vegetarian Plan Users</CardTitle>
              <CardDescription>Users on the vegetarian meal plan</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={users.filter((user) => user.mealPlan === "Vegetarian")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="special" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Special Diet Users</CardTitle>
              <CardDescription>Users with special dietary requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={users.filter((user) => !["Standard", "Vegetarian"].includes(user.mealPlan))}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
