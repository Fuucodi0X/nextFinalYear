"use client"

import { useState, useEffect } from "react"
import { Bed, Building, Home, MessageSquare, Settings, User, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardScanner } from "@/components/card-scanner"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { DormitoryUserDetails } from "@/components/dormitory/user-details"
import { DormitoryKeyManagement } from "@/components/dormitory/key-management"
import { DormitoryComplaintForm } from "@/components/dormitory/complaint-form"
import { CardSimulator } from "@/components/card-simulator"
import {gql, useQuery} from "@apollo/client"
import {io} from "socket.io-client"

const navItems = [
  { href: "/dashboard/dormitory", label: "Dashboard", icon: Home },
  { href: "/dashboard/dormitory/residents", label: "Residents", icon: Users },
  { href: "/dashboard/dormitory/buildings", label: "Buildings", icon: Building },
  { href: "/dashboard/dormitory/settings", label: "Settings", icon: Settings },
]

const USERS_NFCID = gql`query UsersByNfc($nfcId: Text!) {
  nfcCardsByNfcId(nfcId: $nfcId) {
    assignedCards {
      user {
        avatar
        email
        id
        name
        role
        phoneNumber
      }
    }
  }
}`



export default function DormitoryDashboardPage() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<any>(null)
  const [keyStatus, setKeyStatus] = useState<"issued" | "not_issued" | "returned">("not_issued")
  const [complaints, setComplaints] = useState<any[]>([])
  const [scannedCardId, setScannedCardId] = useState("")

  const {loading, error, data, refetch} = useQuery(USERS_NFCID, {variables: { nfcId: scannedCardId}})
  
  useEffect(() => {
    const wsurl = process.env.NEXT_PUBLIC_WEBSOCKET_URL 

    if (!wsurl) {
      console.error("WebSocket URL is not defined!")
      return;
    }

    const socket = io(wsurl, {
      transports: ["websocket"]
    })

    socket.on("connect", () => {
      console.log("Connected to websocket!")
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from websocket!")
    })

    socket.on("admin_card_registration", (nfcId: string) => {
      setScannedCardId(nfcId)
      refetch({variables: { nfcId: scannedCardId}}).then(({data: userData}) => {
        handleScan(userData)
      })
      console.log(`Nfc_id: ${nfcId}`)
    })

    return () => {
      socket.disconnect()
    }
  }, [])


  const handleScan = (userData: any) => {

    console.log("data: ", userData)
    const userr = {
      id: userData.nfcCardsByNfcId?.assignedCards[0]?.user.id ? userData.nfcCardsByNfcId.assignedCards[0]?.user.id : "-",
      name: userData.nfcCardsByNfcId?.assignedCards[0]?.user.name ? userData.nfcCardsByNfcId.assignedCards[0]?.user.name : "-",
      email: userData.nfcCardsByNfcId?.assignedCards[0]?.user.email ? userData.nfcCardsByNfcId.assignedCards[0]?.user.email : "-",
      phone: userData.nfcCardsByNfcId?.assignedCards[0]?.user.phoneNumber ? userData.nfcCardsByNfcId.assignedCards[0]?.user.phoneNumber : "-",
      position: userData.nfcCardsByNfcId?.assignedCards[0]?.user.role ? userData.nfcCardsByNfcId.assignedCards[0]?.user.role : "-",
      photo: userData.nfcCardsByNfcId?.assignedCards[0]?.user.avatar ? userData.nfcCardsByNfcId.assignedCards[0]?.user.avatar : "-",
    }
    setActiveUser(userr)
    // setKeyStatus(user.keyStatus)

    toast({
      title: "ID Card Scanned",
      description: `${user.name} (${user.id}) scanned successfully`,
    })
  }

  const handleKeyStatusChange = (status: "issued" | "not_issued" | "returned") => {
    setKeyStatus(status)

    toast({
      title: "Key Status Updated",
      description: `${activeUser.name}'s key status updated to ${status.replace("_", " ")}`,
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
    <DashboardLayout navItems={navItems} title="Dormitory Management" icon={Bed}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle className="text-xl">Dormitory Management Dashboard</CardTitle>
              <CardDescription>Manage dormitory residents, keys, and complaints</CardDescription>
            </div>
            <CardSimulator onScan={handleScan} className="ml-auto" buttonText="Scan Resident ID" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">98% occupancy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keys Issued</CardTitle>
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
              <path d="M15 7.5V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-.5" />
              <path d="M19 15V6.5a3.5 3.5 0 0 0-7 0V15" />
              <path d="M22 15H12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328</div>
            <p className="text-xs text-muted-foreground">14 keys not issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">5 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
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
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 pending resolution</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="key-management">Key Management</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
          </TabsList>
          {activeUser && (
            <div className="ml-auto flex items-center gap-2 rounded-lg bg-muted px-3 py-1">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active resident: {activeUser.name}</span>
              <Badge variant="outline" className="ml-2">
                {activeUser.id}
              </Badge>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeUser ? (
            <>
              <DormitoryUserDetails user={activeUser} keyStatus={keyStatus} className="md:col-span-1" />
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent dormitory activity for {activeUser.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M15 7.5V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-.5" />
                          <path d="M19 15V6.5a3.5 3.5 0 0 0-7 0V15" />
                          <path d="M22 15H12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Key {keyStatus === "issued" ? "Issued" : "Returned"}</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 8:45 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-5 w-5 text-primary"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Room Inspection</p>
                        <p className="text-sm text-muted-foreground">3 days ago at 2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Noise Complaint Filed</p>
                        <p className="text-sm text-muted-foreground">Last week at 11:20 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Waiting for ID Card Scan</CardTitle>
                <CardDescription>Scan a resident's ID card to view their details</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Bed className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Use the "Scan Resident ID" button to begin</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="key-management">
          {activeUser ? (
            <DormitoryKeyManagement user={activeUser} keyStatus={keyStatus} onKeyStatusChange={handleKeyStatusChange} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Key Management</CardTitle>
                <CardDescription>Scan a resident's ID card to manage their dormitory key</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mx-auto h-12 w-12 text-muted-foreground"
                  >
                    <path d="M15 7.5V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-.5" />
                    <path d="M19 15V6.5a3.5 3.5 0 0 0-7 0V15" />
                    <path d="M22 15H12" />
                  </svg>
                  <p className="mt-2 text-sm text-muted-foreground">Scan a resident's ID to manage their key</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="complaints">
          {activeUser ? (
            <DormitoryComplaintForm user={activeUser} onSubmit={handleAddComplaint} complaints={complaints} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Complaints Management</CardTitle>
                <CardDescription>Scan a resident's ID card to file or view complaints</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Scan a resident's ID to manage complaints</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
