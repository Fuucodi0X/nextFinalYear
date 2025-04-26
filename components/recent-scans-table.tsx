import { ArrowUpDown, MoreHorizontal, Shield, ShieldAlert, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentScans = [
  {
    id: "SCAN-1234",
    name: "Alex Johnson",
    department: "Engineering",
    status: "Approved",
    time: "10:42 AM",
    gate: "Gate 1",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1235",
    name: "Sarah Williams",
    department: "Marketing",
    status: "Approved",
    time: "10:35 AM",
    gate: "Gate 2",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1236",
    name: "Michael Brown",
    department: "IT",
    status: "Approved",
    time: "10:28 AM",
    gate: "Gate 1",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1237",
    name: "Emily Davis",
    department: "HR",
    status: "Denied",
    time: "10:15 AM",
    gate: "Gate 3",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1238",
    name: "James Wilson",
    department: "Finance",
    status: "Approved",
    time: "10:02 AM",
    gate: "Gate 1",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1239",
    name: "Lisa Martinez",
    department: "Sales",
    status: "Pending",
    time: "9:55 AM",
    gate: "Gate 2",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SCAN-1240",
    name: "Robert Taylor",
    department: "Operations",
    status: "Approved",
    time: "9:48 AM",
    gate: "Gate 1",
    photo: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentScansTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>A list of recent NFC card scans across all gates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Time
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Gate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentScans.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell className="font-medium">{scan.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={scan.photo || "/placeholder.svg"} alt={scan.name} />
                      <AvatarFallback>{scan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{scan.name}</div>
                  </div>
                </TableCell>
                <TableCell>{scan.department}</TableCell>
                <TableCell>{scan.time}</TableCell>
                <TableCell>{scan.gate}</TableCell>
                <TableCell>
                  {scan.status === "Approved" && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <ShieldCheck className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  )}
                  {scan.status === "Denied" && (
                    <Badge variant="destructive">
                      <ShieldAlert className="mr-1 h-3 w-3" />
                      Denied
                    </Badge>
                  )}
                  {scan.status === "Pending" && (
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>View user profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Report issue</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
