"use client"

import { useEffect, useState } from "react"
import { Home, Settings, Shield, User, Users, CreditCard, Database, BookOpen } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRegistration } from "@/components/admin/user-registration"
import { CardAssignment } from "@/components/admin/card-assignment"
import { UserManagement } from "@/components/admin/user-management"
import { useToast } from "@/hooks/use-toast"
import { gql, useMutation, useQuery } from "@apollo/client"
import Loading from "@/components/ui/loading"

const navItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: Home },
  // { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  // { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
]

type FormData = {
  name: string
  email: string
  role: string
  phone: string
}

const ADD_USER = gql`mutation addUser($email: Varchar!, $name: Text!, $phoneNum: Int4!, $role: Varchar! ) {
  insertUsers(objects: {email: $email, name: $name, phoneNumber: $phoneNum, role: $role}) {
    affectedRows
  }
}`

const GET_ALL_USERS = gql`query users {
  users {
    id
    name
    avatar
    email
    role
  }
  nfcCardsCount: nfcCardsAggregate{
    num: _count
  }
  assignedCardsCount: assignedCardsAggregate{
    num: _count
  }
}`

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<any[]>([
    {
      id: "ADM-1001",
      name: "Admin User",
      email: "admin@university.edu",
      role: "admin",
      department: "IT",
      cardAssigned: true,
      cardId: "CARD-1001",
      createdAt: new Date().toISOString(),
    },
    {
      id: "SEC-1001",
      name: "Security Officer",
      email: "security@university.edu",
      role: "security",
      department: "Security",
      cardAssigned: true,
      cardId: "CARD-1002",
      createdAt: new Date().toISOString(),
    },
    {
      id: "DOR-1001",
      name: "Dormitory Manager",
      email: "dorm@university.edu",
      role: "dormitory",
      department: "Housing",
      cardAssigned: true,
      cardId: "CARD-1003",
      createdAt: new Date().toISOString(),
    },
  ])

  const [unassignedCards, setUnassignedCards] = useState<any[]>([
    { id: "CARD-2001", status: "unassigned" },
    { id: "CARD-2002", status: "unassigned" },
    { id: "CARD-2003", status: "unassigned" },
  ])
  const [formData, setFormData] = useState<FormData | null>(null)
  const {data: userData, loading: getUsersLoading, error: getUsersError, refetch: refetchUsers} = useQuery(GET_ALL_USERS)
  const [addUser, {loading: addingUser, error: addUserError}] = useMutation(ADD_USER)
  
  const registerUser = () => {
    if (formData) {
      const err = addUser({ variables: { email: formData?.email, name: formData?.name, phoneNum: formData?.phone, role: formData?.role } }).then(() => {
        return addUserError
      }).finally( () => {
        if (addUserError) {
          // setCardError(addUserError.message)
          console.log("Error: ", addUserError?.message)
        }
      }
      )
      return err
    }
  }

  useEffect(() => {
    registerUser()
  }, [formData])

  // Load users
  if(getUsersLoading) return <Loading />

  const handleUserRegistration = (formData: FormData) => {
    setFormData(formData)

    toast({
      title: "User Registered",
      description: `${userData.name} has been successfully registered`,
    })
  }

  const handleCardAssignment = (userId: string, cardId: string) => {
    // Update user with card assignment
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              cardAssigned: true,
              cardId,
            }
          : user,
      ),
    )

    // Remove card from unassigned cards
    setUnassignedCards(unassignedCards.filter((card) => card.id !== cardId))

    toast({
      title: "Card Assigned",
      description: `Card ${cardId} has been assigned successfully`,
    })
  }

  const handleUserUpdate = (updatedUser: any) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))

    toast({
      title: "User Updated",
      description: `${updatedUser.name}'s information has been updated`,
    })
  }

  const handleUserDelete = (userId: string) => {
    // If user had a card, add it back to unassigned cards
    const user = users.find((u) => u.id === userId)
    if (user && user.cardAssigned) {
      setUnassignedCards([...unassignedCards, { id: user.cardId, status: "unassigned" }])
    }

    // Remove user
    setUsers(users.filter((user) => user.id !== userId))

    toast({
      title: "User Deleted",
      description: "User has been successfully deleted",
    })
  }

  return (
    <DashboardLayout navItems={navItems} title="Admin Dashboard" icon={Shield}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle className="text-xl">System Administration</CardTitle>
              <CardDescription>Manage users, cards, and system settings</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.users?.length}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.nfcCardsCount?.num - userData.assignedCardsCount?.num}</div>
            <p className="text-xs text-muted-foreground">Available for assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Roles</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Admin, Security, Dormitory, Cafe, Library, Complaints</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="registration" className="mt-6">
        <TabsList>
          <TabsTrigger value="registration">User Registration</TabsTrigger>
          <TabsTrigger value="cards">Card Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <UserRegistration onSubmit={handleUserRegistration} />
        </TabsContent>

        <TabsContent value="cards">
          <CardAssignment
            users={userData?.users}
            unassignedCards={unassignedCards}
            onAssign={handleCardAssignment}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
