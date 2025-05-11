"use client"

import { useState } from "react"
import { ArrowUpDown, Bed, Building, Download, Home, MoreHorizontal, Search, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUsers } from "@/components/card-simulator"

const navItems = [
  { href: "/dashboard/dormitory", label: "Dashboard", icon: Home },
  { href: "/dashboard/dormitory/residents", label: "Residents", icon: Users },
  { href: "/dashboard/dormitory/buildings", label: "Buildings", icon: Building },
  { href: "/dashboard/dormitory/settings", label: "Settings", icon: Settings },
]

export default function DormitoryUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("all")

  // Filter users based on search query and building filter
  const filteredUsers = mockUsers.filter((user) => {
    // Apply search filter
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.dormitory && user.dormitory.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply building filter
    const matchesBuilding =
      buildingFilter === "all" ||
      (user.dormitory && user.dormitory.toLowerCase().includes(buildingFilter.toLowerCase()))

    return matchesSearch && matchesBuilding && user.dormitory // Only include users with dormitory info
  })

  return (
    <DashboardLayout navItems={navItems} title="Resident Management" icon={Bed}>
      <Card>
        <CardHeader>
          <CardTitle>Dormitory Residents</CardTitle>
          <CardDescription>View and manage all residents in dormitories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, ID, or room..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={buildingFilter} onValueChange={setBuildingFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by building" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Buildings</SelectItem>
                <SelectItem value="building a">Building A</SelectItem>
                <SelectItem value="building b">Building B</SelectItem>
                <SelectItem value="faculty housing">Faculty Housing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Room Assignment
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Key Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.dormitory}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.keyStatus === "issued"
                            ? "default"
                            : user.keyStatus === "not_issued"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {user.keyStatus === "issued"
                          ? "Issued"
                          : user.keyStatus === "not_issued"
                            ? "Not Issued"
                            : "Returned"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
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
                          <DropdownMenuItem>Manage key</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>File complaint</DropdownMenuItem>
                          <DropdownMenuItem>View history</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
