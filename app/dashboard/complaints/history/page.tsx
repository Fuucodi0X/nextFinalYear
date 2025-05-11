"use client"

import { useState } from "react"
import { Calendar, FileWarning, Home, MessageSquare, Search, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/dashboard/complaints", label: "Dashboard", icon: Home },
  { href: "/dashboard/complaints/users", label: "Users", icon: Users },
  { href: "/dashboard/complaints/history", label: "History", icon: MessageSquare },
  { href: "/dashboard/complaints/settings", label: "Settings", icon: Settings },
]

// Mock complaints data with resolutions
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
    status: "processed",
    timestamp: "2023-05-10T14:30:00Z",
    resolution: "warning",
    resolutionNotes: "First offense. Formal warning issued with reminder of cafeteria conduct policy.",
    resolutionDate: "2023-05-11T10:15:00Z",
    officerName: "Officer Johnson",
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
    status: "processed",
    timestamp: "2023-05-11T02:15:00Z",
    resolution: "warning",
    resolutionNotes: "Student apologized and agreed to respect quiet hours. Warning issued.",
    resolutionDate: "2023-05-12T09:30:00Z",
    officerName: "Officer Martinez",
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
    status: "processed",
    timestamp: "2023-05-09T16:45:00Z",
    resolution: "warning",
    resolutionNotes: "Student agreed to pay for book replacement. Warning issued regarding proper book care.",
    resolutionDate: "2023-05-10T14:20:00Z",
    officerName: "Officer Thompson",
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
    status: "processed",
    timestamp: "2023-05-08T19:20:00Z",
    resolution: "warning",
    resolutionNotes: "Second offense. Student required to pay for damages and issued final warning.",
    resolutionDate: "2023-05-09T11:45:00Z",
    officerName: "Officer Johnson",
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
    status: "dismissed",
    timestamp: "2023-05-12T12:10:00Z",
    resolution: "dismiss",
    resolutionNotes: "Issue was due to temporary staff shortage. Complaint dismissed after investigation.",
    resolutionDate: "2023-05-13T10:30:00Z",
    officerName: "Officer Wilson",
  },
  {
    id: "COMP-1006",
    userId: "STU-1004",
    userName: "James Wilson",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "security",
    type: "unauthorized-access",
    description: "Attempted to access restricted laboratory area without proper authorization.",
    severity: "high",
    status: "processed",
    timestamp: "2023-05-05T09:45:00Z",
    resolution: "suspension",
    resolutionNotes: "Serious security violation. 30-day suspension of lab access privileges.",
    resolutionDate: "2023-05-06T14:15:00Z",
    officerName: "Officer Davis",
    suspensionDuration: "30 days",
  },
  {
    id: "COMP-1007",
    userId: "STU-1005",
    userName: "Olivia Martinez",
    userPhoto: "/placeholder.svg?height=128&width=128",
    source: "library",
    type: "behavior",
    description: "Disruptive behavior in quiet study area. Loud conversation and refusal to lower voice when asked.",
    severity: "medium",
    status: "processed",
    timestamp: "2023-04-28T15:20:00Z",
    resolution: "warning",
    resolutionNotes: "Warning issued. Student apologized and agreed to respect library rules.",
    resolutionDate: "2023-04-29T10:10:00Z",
    officerName: "Officer Thompson",
  },
]

export default function ComplaintsHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [timeFilter, setTimeFilter] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)

  // Filter complaints based on search query, selected tab, and time filter
  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch =
      searchQuery === "" ||
      complaint.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "warnings" && complaint.resolution === "warning") ||
      (selectedTab === "suspensions" && complaint.resolution === "suspension") ||
      (selectedTab === "dismissed" && complaint.resolution === "dismiss")

    // Time filter
    let matchesTime = true
    if (timeFilter !== "all") {
      const complaintDate = new Date(complaint.timestamp)
      const now = new Date()

      if (timeFilter === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(now.getDate() - 7)
        matchesTime = complaintDate >= weekAgo
      } else if (timeFilter === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(now.getMonth() - 1)
        matchesTime = complaintDate >= monthAgo
      } else if (timeFilter === "semester") {
        // Assuming a semester is roughly 4 months
        const semesterAgo = new Date()
        semesterAgo.setMonth(now.getMonth() - 4)
        matchesTime = complaintDate >= semesterAgo
      }
    }

    return matchesSearch && matchesTab && matchesTime
  })

  // Sort complaints based on selected sort option
  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "severity":
        const severityOrder = { high: 3, medium: 2, low: 1 }
        return (
          severityOrder[b.severity as keyof typeof severityOrder] -
          severityOrder[a.severity as keyof typeof severityOrder]
        )
      case "resolution":
        return new Date(b.resolutionDate).getTime() - new Date(a.resolutionDate).getTime()
      default:
        return 0
    }
  })

  return (
    <DashboardLayout navItems={navItems} title="Complaint History" icon={MessageSquare} showBackButton={true}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Complaint Resolution History</CardTitle>
          <CardDescription>View and search past complaint resolutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center w-full md:w-1/2">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                placeholder="Search complaints..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="severity">Severity</SelectItem>
                  <SelectItem value="resolution">Resolution Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="semester">Current Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Resolutions</TabsTrigger>
              <TabsTrigger value="warnings">Warnings</TabsTrigger>
              <TabsTrigger value="suspensions">Suspensions</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {sortedComplaints.length > 0 ? (
                    sortedComplaints.map((complaint) => (
                      <Card
                        key={complaint.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedComplaint?.id === complaint.id ? "border-primary" : ""}`}
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
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
                              <Badge variant="outline" className="capitalize">
                                {complaint.source}
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                complaint.resolution === "warning"
                                  ? "default"
                                  : complaint.resolution === "suspension"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {complaint.resolution === "dismiss"
                                ? "Dismissed"
                                : complaint.resolution.charAt(0).toUpperCase() + complaint.resolution.slice(1)}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.userPhoto || "/placeholder.svg"} alt={complaint.userName} />
                              <AvatarFallback>{complaint.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-sm">{complaint.userName}</h3>
                              <p className="text-xs text-muted-foreground">{complaint.userId}</p>
                            </div>
                          </div>

                          <h4 className="font-medium text-sm capitalize mb-1">
                            {complaint.type.replace(/-/g, " ")} Issue
                          </h4>

                          <p className="text-sm line-clamp-2">{complaint.description}</p>

                          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {new Date(complaint.timestamp).toLocaleDateString()}
                            </span>
                            <span>Resolved: {new Date(complaint.resolutionDate).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center h-[200px] text-center p-6">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">No Resolutions Found</h3>
                        <p className="text-sm text-muted-foreground">
                          {searchQuery
                            ? "No resolutions match your search criteria"
                            : "There are no resolutions in this category"}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div>
                  {selectedComplaint ? (
                    <Card className="sticky top-20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Resolution Details</CardTitle>
                          <Badge
                            variant={
                              selectedComplaint.resolution === "warning"
                                ? "default"
                                : selectedComplaint.resolution === "suspension"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {selectedComplaint.resolution === "dismiss"
                              ? "Dismissed"
                              : selectedComplaint.resolution.charAt(0).toUpperCase() +
                                selectedComplaint.resolution.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription>
                          Complaint #{selectedComplaint.id} -{" "}
                          {new Date(selectedComplaint.timestamp).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={selectedComplaint.userPhoto || "/placeholder.svg"}
                              alt={selectedComplaint.userName}
                            />
                            <AvatarFallback>{selectedComplaint.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{selectedComplaint.userName}</h3>
                            <p className="text-sm text-muted-foreground">{selectedComplaint.userId}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Complaint Details</h4>
                          <div className="rounded-lg border p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="capitalize">
                                {selectedComplaint.source}
                              </Badge>
                              <Badge
                                variant={
                                  selectedComplaint.severity === "high"
                                    ? "destructive"
                                    : selectedComplaint.severity === "medium"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {selectedComplaint.severity.charAt(0).toUpperCase() +
                                  selectedComplaint.severity.slice(1)}{" "}
                                Severity
                              </Badge>
                            </div>
                            <h5 className="font-medium capitalize mb-1">
                              {selectedComplaint.type.replace(/-/g, " ")} Issue
                            </h5>
                            <p className="text-sm">{selectedComplaint.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Reported on {new Date(selectedComplaint.timestamp).toLocaleDateString()} at{" "}
                              {new Date(selectedComplaint.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Resolution</h4>
                          <div className="rounded-lg border p-3 bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium capitalize">
                                {selectedComplaint.resolution === "dismiss"
                                  ? "Complaint Dismissed"
                                  : `${selectedComplaint.resolution} Issued`}
                              </span>
                              {selectedComplaint.suspensionDuration && (
                                <Badge variant="outline">{selectedComplaint.suspensionDuration} Suspension</Badge>
                              )}
                            </div>
                            <p className="text-sm">{selectedComplaint.resolutionNotes}</p>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                              <span>Resolved by: {selectedComplaint.officerName}</span>
                              <span>{new Date(selectedComplaint.resolutionDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" asChild className="w-full">
                          <a href={`/dashboard/complaints/users?user=${selectedComplaint.userId}`}>View User Record</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center h-[400px] text-center p-6">
                        <FileWarning className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">No Resolution Selected</h3>
                        <p className="text-sm text-muted-foreground">
                          Select a complaint from the list to view resolution details
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
