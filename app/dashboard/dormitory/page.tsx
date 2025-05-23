"use client"

import { useEffect, useState } from "react"
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
import { io } from "socket.io-client"
import { gql, useQuery } from "@apollo/client"
import { UserType } from "@/lib/types"
const dormAdmin = "9708049c-171a-4a11-8c90-974226156595"

const navItems = [
  { href: "/dashboard/dormitory", label: "Dashboard", icon: Home },
  { href: "/dashboard/dormitory/residents", label: "Residents", icon: Users },
  { href: "/dashboard/dormitory/buildings", label: "Buildings", icon: Building },
  { href: "/dashboard/dormitory/settings", label: "Settings", icon: Settings },
]

export default function DormitoryDashboardPage() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<UserType | null>(null)
  const [keyStatus, setKeyStatus] = useState<"issued" | "not_issued" | "returned">("not_issued")
  const [complaints, setComplaints] = useState<any[]>([])
  const [scannedCardId, setScannedCardId] = useState<string | null>(null)
  const [cardError, setCardError] = useState<string | null>()
  const getUserQuery = gql`query GetUserQuery($nfcId: Text!) {
      nfcCardsByNfcId(nfcId: $nfcId) {
        assignedCards {
          user {
            email
            avatar
            id
            name
            phoneNumber
            role
            complaines {
              description
              severity
              type:complaintType
            }
            assignedDormitories {
              dormId
              status
              dormitoryRoom {
                roomNumber
                buildingNumber
                floorNumber
              }
          }
         }
       }
    }
  }`
  const getAggrigate = gql`
        query agerigate {
              totalComplines:complainesAggregate {
                  _count
                }
               totalAssignedDorms:assignedDormitoryAggregate {
                _count
               }
               totalDorms:dormitoryRoomsAggregate {
                _count
               }
               totalIssuedDorm:assignedDormitoryAggregate(filter_input: {where:{status:{_eq:"issued" }}}) {
                  _count
               }
        }`
  // const 

  const { data, loading, error, refetch } = useQuery(getUserQuery, { variables: { nfcId: scannedCardId }, skip: !scannedCardId })
  const { data: aggrigate, loading: aggrigateLoading, error: aggrigateError } = useQuery(getAggrigate)

  const handleScan = (user: UserType) => {
    setActiveUser(user)
    // setKeyStatus(user.keyStatus)

    toast({
      title: "ID Card Scanned",
      description: `${user.name} (${user.id}) scanned successfully`,
    })
  }

  const handleKeyStatusChange = (status: "issued" | "not_issued" | "returned") => {
    if (!activeUser) return
    setKeyStatus(status)
    toast({
      title: "Key Status Updated",
      description: `${activeUser.name}'s key status updated to ${status.replace("_", " ")}`,
    })
  }

  const handleAddComplaint = (complaint: any) => {
    if (!activeUser) return
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
  useEffect(() => {
    // Connecting to the websocket
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001";
    console.log("Attempting to connect to WebSocket URL:", wsUrl); // <-- Add this log

    if (!wsUrl) {
      console.error("WebSocket URL is not defined!");
      return;
    }
    const socket = io(wsUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      toast({
        title: "Web socket connected",
        description: `Connected`,
      })
      console.log("Connected to websocket");
    });

    socket.on("disconnect", () => {
      toast({
        title: "Web socket disconnected",
        description: `Disconnected`,
      })
      console.log("Disconnected from websocket");
    });

    socket.on("admin_card_registration", async (nfcId: string) => {
      setScannedCardId(nfcId)
      setCardError(null)
      console.log(nfcId)

      const { data } = await refetch({ nfcId })
      if (!data.nfcCardsByNfcId) {
        return (
          toast({
            title: "Nfc id not registored ",
            description: `This nfc Id:${nfcId} is not registered`,
          })
        )
      }
      if (!data.nfcCardsByNfcId.assignedCards[0]) {
        return (
          toast({
            title: "NfcId not assigned to user",
            description: `This nfc Id:${nfcId} is not assigned to user`,
          })
        )
      }
      const userData = data.nfcCardsByNfcId.assignedCards[0].user
      if (userData.assignedDormitories && userData.assignedDormitories.length > 0) {
        console.log(userData.assignedDormitories[0].status)
        setKeyStatus(userData.assignedDormitories[0].status ? "issued" : "not_issued")
      }
      if (userData.complaines) {
        setComplaints(prev => [...prev, userData.complaines[0]])
      }

      console.log(userData)
      handleScan(userData)
      toast({
        title: "Id scanned",
        description: `registed id:${nfcId} user:${userData.name}`,
      })
      console.log(`Nfc card ID: ${nfcId}`)
    });

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <DashboardLayout navItems={navItems} title="Dormitory Management" icon={Bed}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5">
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
          {
            aggrigate ? (
              <CardContent>
                <div className="text-2xl font-bold">{aggrigate.totalAssignedDorms._count}</div>
                <p className="text-xs text-muted-foreground">{aggrigate.totalAssignedDorms._count / aggrigate.totalDorms._count} occupancy rate</p>
              </CardContent>
            ) : null
          }
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
            {
              aggrigate ? (
                <div>
                  <div className="text-2xl font-bold">{aggrigate.totalIssuedDorm._count}</div>
                  <p className="text-xs text-muted-foreground">{`${aggrigate.totalAssignedDorms._count - aggrigate.totalIssuedDorm._count} keys not issued`}</p>
                </div>
              ) : null
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {
              aggrigate ? (
                <div>
                  <div className="text-2xl font-bold">{aggrigate.totalComplines._count}</div>
                  <p className="text-xs text-muted-foreground">{`total active complines ${aggrigate.totalComplines._count}`}</p>
                </div>
              ) : null
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Dorms</CardTitle>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 7H7M6 10H7M11 10H12M11 13H12M6 13H7M11 7H12M7 21V18C7 16.8954 7.89543 16 9 16C10.1046 16 11 16.8954 11 18V21H7ZM7 21H3V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H13.4C13.9601 3 14.2401 3 14.454 3.10899C14.6422 3.20487 14.7951 3.35785 14.891 3.54601C15 3.75992 15 4.03995 15 4.6V9M19.7 13.5C19.7 14.3284 19.0284 15 18.2 15C17.3716 15 16.7 14.3284 16.7 13.5C16.7 12.6716 17.3716 12 18.2 12C19.0284 12 19.7 12.6716 19.7 13.5ZM21.5 21V20.5C21.5 19.1193 20.3807 18 19 18H17.5C16.1193 18 15 19.1193 15 20.5V21H21.5Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            {
              aggrigate ? (
                <div>
                  <div className="text-2xl font-bold">{aggrigate.totalDorms._count}</div>
                  <p className="text-xs text-muted-foreground"> {`${aggrigate.totalDorms._count - aggrigate.totalIssuedDorm._count} not issued dorms`} </p>
                </div>
              ) : null
            }
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
