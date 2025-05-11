"use client"

import { useState } from "react"
import { Bed, Building, Home, MoreHorizontal, Plus, Settings, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  { href: "/dashboard/dormitory", label: "Dashboard", icon: Home },
  { href: "/dashboard/dormitory/residents", label: "Residents", icon: Users },
  { href: "/dashboard/dormitory/buildings", label: "Buildings", icon: Building },
  { href: "/dashboard/dormitory/settings", label: "Settings", icon: Settings },
]

// Mock buildings data
const BUILDINGS = [
  {
    id: "bldg-a",
    name: "Building A",
    totalRooms: 120,
    occupiedRooms: 112,
    capacity: 240,
    currentOccupants: 215,
    type: "Undergraduate",
    floors: 4,
    amenities: ["Laundry", "Study Room", "Kitchen", "Lounge"],
    maintenanceRequests: 3,
  },
  {
    id: "bldg-b",
    name: "Building B",
    totalRooms: 80,
    occupiedRooms: 75,
    capacity: 160,
    currentOccupants: 142,
    type: "Undergraduate",
    floors: 3,
    amenities: ["Laundry", "Study Room", "Lounge"],
    maintenanceRequests: 5,
  },
  {
    id: "bldg-c",
    name: "Faculty Housing",
    totalRooms: 40,
    occupiedRooms: 32,
    capacity: 40,
    currentOccupants: 32,
    type: "Faculty",
    floors: 2,
    amenities: ["Laundry", "Parking", "Private Bathrooms"],
    maintenanceRequests: 1,
  },
]

export default function DormitoryBuildingsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [buildings, setBuildings] = useState(BUILDINGS)
  const [newBuilding, setNewBuilding] = useState({
    name: "",
    totalRooms: "",
    capacity: "",
    type: "Undergraduate",
    floors: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter buildings based on search query
  const filteredBuildings = buildings.filter((building) => {
    if (!searchQuery) return true
    return (
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleAddBuilding = () => {
    // Validate form
    if (!newBuilding.name || !newBuilding.totalRooms || !newBuilding.capacity || !newBuilding.floors) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create new building
    const building = {
      id: `bldg-${Date.now()}`,
      name: newBuilding.name,
      totalRooms: Number.parseInt(newBuilding.totalRooms),
      occupiedRooms: 0,
      capacity: Number.parseInt(newBuilding.capacity),
      currentOccupants: 0,
      type: newBuilding.type,
      floors: Number.parseInt(newBuilding.floors),
      amenities: ["Laundry"],
      maintenanceRequests: 0,
    }

    // Add to buildings
    setBuildings([...buildings, building])

    // Reset form and close dialog
    setNewBuilding({
      name: "",
      totalRooms: "",
      capacity: "",
      type: "Undergraduate",
      floors: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Building Added",
      description: `${building.name} has been added successfully`,
    })
  }

  return (
    <DashboardLayout navItems={navItems} title="Building Management" icon={Building}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Dormitory Buildings</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Building
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Building</DialogTitle>
              <DialogDescription>Enter the details for the new dormitory building</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newBuilding.name}
                  onChange={(e) => setNewBuilding({ ...newBuilding, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newBuilding.type}
                  onValueChange={(value) => setNewBuilding({ ...newBuilding, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select building type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="floors" className="text-right">
                  Floors
                </Label>
                <Input
                  id="floors"
                  type="number"
                  value={newBuilding.floors}
                  onChange={(e) => setNewBuilding({ ...newBuilding, floors: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rooms" className="text-right">
                  Total Rooms
                </Label>
                <Input
                  id="rooms"
                  type="number"
                  value={newBuilding.totalRooms}
                  onChange={(e) => setNewBuilding({ ...newBuilding, totalRooms: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newBuilding.capacity}
                  onChange={(e) => setNewBuilding({ ...newBuilding, capacity: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBuilding}>Add Building</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search buildings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBuildings.map((building) => (
          <Card key={building.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{building.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Building</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Maintenance</DropdownMenuItem>
                    <DropdownMenuItem>View Residents</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                {building.type} • {building.floors} Floors • {building.totalRooms} Rooms
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Tabs defaultValue="occupancy">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="occupancy" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Room Occupancy</span>
                      <span className="font-medium">
                        {building.occupiedRooms}/{building.totalRooms} Rooms
                      </span>
                    </div>
                    <Progress value={(building.occupiedRooms / building.totalRooms) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Resident Capacity</span>
                      <span className="font-medium">
                        {building.currentOccupants}/{building.capacity} Residents
                      </span>
                    </div>
                    <Progress value={(building.currentOccupants / building.capacity) * 100} />
                  </div>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Amenities:</span>
                      <span>{building.amenities.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Maintenance Requests:</span>
                      <Badge variant={building.maintenanceRequests > 0 ? "destructive" : "outline"}>
                        {building.maintenanceRequests}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Vacancy Rate:</span>
                      <span>
                        {Math.round(((building.capacity - building.currentOccupants) / building.capacity) * 100)}%
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                <Bed className="mr-2 h-4 w-4" />
                Manage Rooms
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
