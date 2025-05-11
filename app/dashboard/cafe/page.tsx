"use client"

import { useState } from "react"
import { Coffee, Home, Settings, User, Users, Utensils } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardScanner } from "@/components/card-scanner"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CafeUserDetails } from "@/components/cafe/user-details"
import { MealRecording } from "@/components/cafe/meal-recording"
import { CafeComplaintForm } from "@/components/cafe/complaint-form"

const navItems = [
  { href: "/dashboard/cafe", label: "Dashboard", icon: Home },
  { href: "/dashboard/cafe/meals", label: "Meal Plans", icon: Utensils },
  { href: "/dashboard/cafe/users", label: "Users", icon: Users },
  { href: "/dashboard/cafe/settings", label: "Settings", icon: Settings },
]

// Mock users that can be shared across all dashboards
export const mockUsers = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    department: "Computer Science",
    position: "Student",
    accessLevel: "Medium",
    photo: "/placeholder.svg?height=128&width=128",
    // Dormitory specific
    dormitory: "Building A, Room 203",
    keyStatus: "issued",
    // Cafe specific
    mealPlan: "Full Board",
    lastMeal: "Breakfast, Yesterday",
    // Library specific
    borrowedBooks: [{ id: "BK-1001", title: "Introduction to Algorithms", dueDate: "2023-05-20" }],
  },
  {
    id: "STU-1002",
    name: "Sarah Williams",
    email: "sarah.williams@university.edu",
    phone: "(555) 234-5678",
    department: "Business",
    position: "Student",
    accessLevel: "Medium",
    photo: "/placeholder.svg?height=128&width=128",
    // Dormitory specific
    dormitory: "Building B, Room 105",
    keyStatus: "not_issued",
    // Cafe specific
    mealPlan: "Lunch Only",
    lastMeal: "Lunch, Today",
    // Library specific
    borrowedBooks: [],
  },
  {
    id: "FAC-1001",
    name: "Michael Brown",
    email: "michael.brown@university.edu",
    phone: "(555) 345-6789",
    department: "Physics",
    position: "Professor",
    accessLevel: "High",
    photo: "/placeholder.svg?height=128&width=128",
    // Dormitory specific
    dormitory: "Faculty Housing, Block C",
    keyStatus: "issued",
    // Cafe specific
    mealPlan: "Faculty Plan",
    lastMeal: "Dinner, 2 days ago",
    // Library specific
    borrowedBooks: [
      { id: "BK-2001", title: "Quantum Physics", dueDate: "2023-05-15" },
      { id: "BK-2002", title: "The Universe in a Nutshell", dueDate: "2023-05-22" },
    ],
  },
  {
    id: "STU-1003",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    phone: "(555) 456-7890",
    department: "Literature",
    position: "Student",
    accessLevel: "Medium",
    photo: "/placeholder.svg?height=128&width=128",
    // Dormitory specific
    dormitory: "Building A, Room 310",
    keyStatus: "issued",
    // Cafe specific
    mealPlan: "Full Board",
    lastMeal: "Dinner, Today",
    // Library specific
    borrowedBooks: [
      { id: "BK-3001", title: "Pride and Prejudice", dueDate: "2023-05-18" },
      { id: "BK-3002", title: "To Kill a Mockingbird", dueDate: "2023-05-25" },
      { id: "BK-3003", title: "1984", dueDate: "2023-05-30" },
    ],
  },
]

export default function CafeDashboardPage() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<any>(null)
  const [mealHistory, setMealHistory] = useState<any[]>([])
  const [complaints, setComplaints] = useState<any[]>([])

  const handleScan = (cardId: string) => {
    // Simulate finding a user based on card ID
    // In a real app, this would query a database
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)]

    setActiveUser(user)

    toast({
      title: "ID Card Scanned",
      description: `${user.name} (${user.id}) scanned successfully`,
    })
  }

  const handleRecordMeal = (mealData: any) => {
    const newMeal = {
      id: `MEAL-${Date.now()}`,
      userId: activeUser.id,
      userName: activeUser.name,
      ...mealData,
      timestamp: new Date().toISOString(),
    }

    setMealHistory([newMeal, ...mealHistory])

    toast({
      title: "Meal Recorded",
      description: `${mealData.mealType} recorded for ${activeUser.name}`,
    })
  }

  const handleAddComplaint = (complaint: any) => {
    const newComplaint = {
      id: `COMP-${Date.now()}`,
      userId: activeUser.id,
      userName: activeUser.name,
      ...complaint,
      timestamp: new Date().toISOString(),
    }

    setComplaints([newComplaint, ...complaints])

    toast({
      title: "Complaint Filed",
      description: `Complaint filed against ${activeUser.name}`,
    })
  }

  return (
    <DashboardLayout navItems={navItems} title="Cafe Management" icon={Coffee}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle className="text-xl">Cafe Management Dashboard</CardTitle>
              <CardDescription>Record meals and manage student dining</CardDescription>
            </div>
            <div className="ml-auto">
              <CardScanner onCardScanned={handleScan} />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Today</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Breakfast Count</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15c0 2.8-2.2 5-5 5h-4" />
              <path d="M16 10a4 4 0 0 0-4 4v6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">29% of daily meals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lunch Count</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M15 11h.01" />
              <path d="M11 15h.01" />
              <path d="M16 16h.01" />
              <path d="M2 16l20 6-6-20A20 20 0 0 0 2 16" />
              <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
            <p className="text-xs text-muted-foreground">44% of daily meals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dinner Count</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M8.21 13.89 7 23l9-9-8.99-9L7 13.89" />
              <path d="M14.53 9.47 16 8l1.47 1.47" />
              <path d="M19.47 4.53 21 3l1.47 1.47" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">130</div>
            <p className="text-xs text-muted-foreground">27% of daily meals</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meal-recording">Meal Recording</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
          </TabsList>
          {activeUser && (
            <div className="ml-auto flex items-center gap-2 rounded-lg bg-muted px-3 py-1">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active user: {activeUser.name}</span>
              <Badge variant="outline" className="ml-2">
                {activeUser.id}
              </Badge>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeUser ? (
            <>
              <CafeUserDetails user={activeUser} className="md:col-span-1" />
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Meal History</CardTitle>
                  <CardDescription>Recent meal history for {activeUser.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {mealHistory.filter((meal) => meal.userId === activeUser.id).length > 0 ? (
                    <div className="space-y-4">
                      {mealHistory
                        .filter((meal) => meal.userId === activeUser.id)
                        .slice(0, 5)
                        .map((meal) => (
                          <div key={meal.id} className="flex items-center gap-4 rounded-lg border p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Utensils className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{meal.mealType}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(meal.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {meal.mealPlan}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No Meal History</h3>
                      <p className="text-sm text-muted-foreground">This user has no recorded meals yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Waiting for ID Card Scan</CardTitle>
                <CardDescription>Scan a student's ID card to view their details</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Coffee className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Use the card scanner to begin</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="meal-recording">
          {activeUser ? (
            <MealRecording
              user={activeUser}
              onRecordMeal={handleRecordMeal}
              mealHistory={mealHistory.filter((meal) => meal.userId === activeUser.id)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Meal Recording</CardTitle>
                <CardDescription>Scan a student's ID card to record a meal</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Utensils className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Scan a student's ID to record their meal</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="complaints">
          {activeUser ? (
            <CafeComplaintForm
              user={activeUser}
              onSubmit={handleAddComplaint}
              complaints={complaints.filter((complaint) => complaint.userId === activeUser.id)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Complaints Management</CardTitle>
                <CardDescription>Scan a student's ID card to file or view complaints</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Coffee className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Scan a student's ID to manage complaints</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
