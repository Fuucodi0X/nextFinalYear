"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Ban,
  Check,
  FileWarning,
  Home,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardScanner } from "@/components/card-scanner"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ComplainType, UserType } from "@/lib/types"

const navItems = [
  { href: "/dashboard/complaints", label: "Dashboard", icon: Home },
  { href: "/dashboard/complaints/users", label: "Users", icon: Users },
  { href: "/dashboard/complaints/history", label: "History", icon: MessageSquare },
  { href: "/dashboard/complaints/settings", label: "Settings", icon: Settings },
]

// Mock complaints data
const mockComplaints = [
  {
    id: "COMP-1001",
    userId: "STU-1001",
    userName: "Alex Johnson",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "cafe",
    type: "behavior",
    description: "Disruptive behavior during lunch hour. Student was shouting and disturbing other diners.",
    severity: "medium",
    status: "pending",
    timestamp: "2023-05-10T14:30:00Z",
  },
  {
    id: "COMP-1002",
    userId: "STU-1002",
    userName: "Sarah Williams",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "dormitory",
    type: "noise",
    description: "Excessive noise after quiet hours. Multiple students complained about loud music at 1 AM.",
    severity: "high",
    status: "pending",
    timestamp: "2023-05-11T02:15:00Z",
  },
  {
    id: "COMP-1003",
    userId: "STU-1003",
    userName: "Emily Davis",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "library",
    type: "damage",
    description: "Book returned with significant damage. Pages torn and coffee stains throughout.",
    severity: "medium",
    status: "pending",
    timestamp: "2023-05-09T16:45:00Z",
  },
  {
    id: "COMP-1004",
    userId: "STU-1001",
    userName: "Alex Johnson",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "dormitory",
    type: "property-damage",
    description: "Damaged dormitory furniture. Chair in common area broken.",
    severity: "high",
    status: "pending",
    timestamp: "2023-05-08T19:20:00Z",
  },
  {
    id: "COMP-1005",
    userId: "FAC-1001",
    userName: "Michael Brown",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "cafe",
    type: "service",
    description: "Complaint about poor service quality and long wait times in faculty dining area.",
    severity: "low",
    status: "pending",
    timestamp: "2023-05-12T12:10:00Z",
  },
  {
    id: "COMP-1006",
    userId: "STU-1004",
    userName: "Jessica Lee",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "library",
    type: "behavior",
    description: "Disruptive behavior in quiet study area. Student was talking loudly on phone.",
    severity: "medium",
    status: "processed",
    resolution: "warning",
    resolutionNotes: "First offense, verbal warning issued.",
    resolutionDate: "2023-05-01T10:30:00Z",
    timestamp: "2023-05-01T09:15:00Z",
  },
  {
    id: "COMP-1007",
    userId: "STU-1005",
    userName: "David Wilson",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "dormitory",
    type: "property-damage",
    description: "Graffiti found on dormitory wall. Student caught on security camera.",
    severity: "high",
    status: "processed",
    resolution: "suspension",
    resolutionNotes: "Two-week suspension from dormitory privileges.",
    resolutionDate: "2023-04-28T14:20:00Z",
    timestamp: "2023-04-27T22:40:00Z",
  },
]

// Mock user data
const mockUsers = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    department: "Computer Science",
    position: "Student",
    accessLevel: "Medium",
    photo: "/placeholder.svg?height=128&width=128",
    warningCount: 2,
    suspensionCount: 0,
    status: "active",
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
    warningCount: 1,
    suspensionCount: 0,
    status: "active",
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
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
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
    warningCount: 0,
    suspensionCount: 0,
    status: "active",
  },
]

export default function ComplaintsDashboardPage() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<any>(null)
  const [complaints, setComplaints] = useState<ComplainType[] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("pending")
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [actionType, setActionType] = useState<"warning" | "suspension" | "dismiss">("warning")
  const [actionNotes, setActionNotes] = useState("")
  const [actionDuration, setActionDuration] = useState("7")
  const [userData, setUserData] = useState<UserType | null>(null)

  const handleScan = (cardId: string) => {
    // Simulate finding a user based on card ID
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    setActiveUser(user)
    toast({
      title: "ID Card Scanned",
      description: `${user.name} (${user.id}) scanned successfully`,
    })
  }
  const handleSetUser = (user: UserType) => {
    setUserData(user)
  }

  const handleComplaintAction = (complaint: any, action: "warning" | "suspension" | "dismiss") => {
    setSelectedComplaint(complaint)
    setActionType(action)
    setActionNotes("")
    setActionDuration("7")
    setShowActionDialog(true)
  }

  const submitAction = () => {
    // Update the complaint status
    const updatedComplaints = complaints?.map((comp) => {
      if (comp.id === selectedComplaint.id) {
        return {
          ...comp,
          status: actionType === "dismiss" ? "dismissed" : "processed",
          resolution: actionType,
          resolutionNotes: actionNotes,
          resolutionDate: new Date().toISOString(),
        }
      }
      return comp
    })
    if (updatedComplaints)
      setComplaints(updatedComplaints)

    // Update user warning/suspension count if needed
    if (activeUser && selectedComplaint.userId === activeUser.id) {
      if (actionType === "warning") {
        setActiveUser({
          ...activeUser,
          warningCount: activeUser.warningCount + 1,
        })
      } else if (actionType === "suspension") {
        setActiveUser({
          ...activeUser,
          suspensionCount: activeUser.suspensionCount + 1,
          status: "suspended",
        })
      }
    }

    // Show toast notification
    toast({
      title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Issued`,
      description:
        actionType === "dismiss"
          ? `Complaint dismissed for ${selectedComplaint.userName}`
          : `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} issued to ${selectedComplaint.userName}`,
    })

    setShowActionDialog(false)
  }

  // Filter complaints based on search query and selected tab
  const filteredComplaints = complaints?.filter((complaint) => {
    const matchesSearch =
      searchQuery === "" ||
      // complaint.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "pending" && complaint.status === "pending") ||
      (selectedTab === "processed" && complaint.status === "processed") ||
      (selectedTab === "dismissed" && complaint.status === "dismissed")

    return matchesSearch && matchesTab
  })

  // Get user-specific complaints
  const userComplaints = activeUser ? complaints.filter((complaint) => complaint.userId === activeUser.id) : []

  // Get pending complaints for the main dashboard
  const pendingComplaints = complaints.filter((complaint) => complaint.status === "pending" || !complaint.status)

  return (
    <DashboardLayout navItems={navItems} title="Complaints Management" icon={FileWarning}>
      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints?.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">+3 new today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {complaints?.filter((c) => c.status === "pending" || !c.status).length ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings Issued</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/*
              <div className="text-2xl font-bold">{complaints?.filter((c) => c.resolution === "warning").length}</div>
              */}
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspensions</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/*
              <div className="text-2xl font-bold">{complaints.filter((c) => c.resolution === "suspension").length}</div>
              */}
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card Scanner Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>ID Card Scanner</CardTitle>
              <CardDescription>Scan a user's ID card to view their details and complaints</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <CardScanner scannedCardId={handleScan} setUserData={setUserData} />

              {activeUser && (
                <div className="mt-4 w-full rounded-lg bg-muted p-3 text-center">
                  <p className="font-medium">{activeUser.name}</p>
                  <p className="text-sm text-muted-foreground">{activeUser.id}</p>
                  <Badge variant={activeUser.status === "active" ? "outline" : "destructive"} className="mt-2">
                    {activeUser.status.charAt(0).toUpperCase() + activeUser.status.slice(1)}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Complaints Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pending Complaints</CardTitle>
              <CardDescription>
                {pendingComplaints.length} complaint{pendingComplaints.length !== 1 ? "s" : ""} requiring attention
              </CardDescription>
              <div className="mt-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {pendingComplaints
                    .filter(
                      (complaint) =>
                        searchQuery === "" ||
                        // complaint.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        complaint.type.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((complaint) => (
                      <div key={complaint.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {/*
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.userPhoto || "/placeholder.svg"} alt={complaint.userName} />
                              <AvatarFallback>{complaint.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{complaint.userName}</p>
                              <p className="text-xs text-muted-foreground">{complaint.userId}</p>
                            </div>
                            */}
                          </div>
                          <Badge
                            variant={
                              complaint.severity === "high"
                                ? "destructive"
                                : complaint.severity === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {complaint.severity.charAt(0).toUpperCase() + complaint.severity.slice(1)}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {complaint.source}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {complaint.type.replace(/-/g, " ")}
                          </Badge>
                        </div>

                        <p className="text-sm">{complaint.description}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(complaint.timestamp).toLocaleDateString()} at{" "}
                            {new Date(complaint.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleComplaintAction(complaint, "dismiss")}
                            >
                              Dismiss
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleComplaintAction(complaint, "warning")}
                            >
                              Warning
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleComplaintAction(complaint, "suspension")}
                            >
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {pendingComplaints.filter(
                    (complaint) =>
                      searchQuery === "" ||
                      complaint.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      complaint.type.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Check className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">No Pending Complaints</h3>
                        <p className="text-sm text-muted-foreground">
                          {searchQuery
                            ? "No complaints match your search criteria"
                            : "All complaints have been processed"}
                        </p>
                      </div>
                    )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* User Details Section - Only shown when a user is active */}
        {activeUser && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Details for {activeUser.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={activeUser.photo || "/placeholder.svg"} alt={activeUser.name} />
                    <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeUser.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {activeUser.department} - {activeUser.position}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={activeUser.status === "active" ? "outline" : "destructive"}>
                        {activeUser.status.charAt(0).toUpperCase() + activeUser.status.slice(1)}
                      </Badge>
                      {activeUser.warningCount > 0 && (
                        <Badge variant="secondary">
                          {activeUser.warningCount} Warning{activeUser.warningCount > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{activeUser.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p>{activeUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ID</p>
                      <p>{activeUser.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Access Level</p>
                      <p>{activeUser.accessLevel}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Disciplinary Record</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold">{activeUser.warningCount}</p>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold">{activeUser.suspensionCount}</p>
                      <p className="text-sm text-muted-foreground">Suspensions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complaint History</CardTitle>
                <CardDescription>
                  {userComplaints.length > 0
                    ? `${userComplaints.length} complaint(s) on record`
                    : "No complaints on record"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userComplaints.length > 0 ? (
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {userComplaints.map((complaint) => (
                        <div key={complaint.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant={
                                complaint.severity === "high"
                                  ? "destructive"
                                  : complaint.severity === "medium"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {complaint.severity.charAt(0).toUpperCase() + complaint.severity.slice(1)} Severity
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {complaint.source}
                            </Badge>
                          </div>

                          <h4 className="font-medium capitalize">{complaint.type.replace(/-/g, " ")} Issue</h4>

                          <p className="mt-2 text-sm">{complaint.description}</p>

                          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {new Date(complaint.timestamp).toLocaleDateString()} at{" "}
                              {new Date(complaint.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <Badge
                              variant={
                                complaint.status === "processed"
                                  ? "default"
                                  : complaint.status === "dismissed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {complaint.status || "Pending"}
                            </Badge>
                          </div>

                          {complaint.status === "pending" && (
                            <div className="mt-4 flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleComplaintAction(complaint, "dismiss")}
                              >
                                Dismiss
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleComplaintAction(complaint, "warning")}
                              >
                                Issue Warning
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleComplaintAction(complaint, "suspension")}
                              >
                                Suspend
                              </Button>
                            </div>
                          )}

                          {complaint.resolution && (
                            <div className="mt-3 rounded-lg bg-muted p-3">
                              <p className="text-sm font-medium capitalize">{complaint.resolution} Issued</p>
                              {complaint.resolutionNotes && <p className="mt-1 text-sm">{complaint.resolutionNotes}</p>}
                              {complaint.resolutionDate && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {new Date(complaint.resolutionDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <Check className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No Complaints Found</h3>
                    <p className="text-sm text-muted-foreground">This user has a clean record with no complaints</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "warning"
                ? "Issue Warning"
                : actionType === "suspension"
                  ? "Issue Suspension"
                  : "Dismiss Complaint"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "warning"
                ? "Issue a formal warning to the student"
                : actionType === "suspension"
                  ? "Suspend the student's privileges"
                  : "Dismiss this complaint without action"}
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium mb-1">Complaint Details</p>
                <p className="text-sm">{selectedComplaint.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">From: {selectedComplaint.source}</span>
                  <Badge variant="outline" className="capitalize">
                    {selectedComplaint.type.replace(/-/g, " ")}
                  </Badge>
                </div>
              </div>

              {actionType !== "dismiss" && (
                <div className="space-y-2">
                  {actionType === "suspension" && (
                    <div className="space-y-2">
                      <Label htmlFor="duration">Suspension Duration (days)</Label>
                      <Select value={actionDuration} onValueChange={setActionDuration}>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder={`Enter details about this ${actionType}...`}
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button variant={actionType === "suspension" ? "destructive" : "default"} onClick={submitAction}>
              {actionType === "warning"
                ? "Issue Warning"
                : actionType === "suspension"
                  ? "Issue Suspension"
                  : "Dismiss Complaint"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
