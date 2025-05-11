import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Filter } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { meals } from "./data"

export const metadata: Metadata = {
  title: "Meals Management | Cafe Dashboard",
  description: "Manage meal plans and records for the cafe system",
}

export default function MealsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Meals Management</h2>
        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker /> */}
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All Meals</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Meal Plan
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Meals Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+12.5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breakfast Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">+4.3% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lunch Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">486</div>
                <p className="text-xs text-muted-foreground">+10.1% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dinner Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">366</div>
                <p className="text-xs text-muted-foreground">+7.4% from last week</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Meal Records</CardTitle>
              <CardDescription>View and manage all meal records in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={meals} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="breakfast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Breakfast Records</CardTitle>
              <CardDescription>View and manage breakfast records</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={meals.filter((meal) => meal.type === "Breakfast")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lunch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lunch Records</CardTitle>
              <CardDescription>View and manage lunch records</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={meals.filter((meal) => meal.type === "Lunch")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dinner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dinner Records</CardTitle>
              <CardDescription>View and manage dinner records</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={meals.filter((meal) => meal.type === "Dinner")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
