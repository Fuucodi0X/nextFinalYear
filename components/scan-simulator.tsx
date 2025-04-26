"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const mockUsers = [
  {
    id: "EMP-1001",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    phone: "(555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    accessLevel: "Medium",
    location: "Building A",
    lastScan: "2 hours ago",
    photo: "/placeholder.svg?height=128&width=128",
    gate: "Gate 1",
  },
  {
    id: "EMP-1002",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    phone: "(555) 234-5678",
    department: "Marketing",
    position: "Marketing Director",
    accessLevel: "High",
    location: "Building B",
    lastScan: "Yesterday",
    photo: "/placeholder.svg?height=128&width=128",
    gate: "Gate 2",
  },
  {
    id: "EMP-1003",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    phone: "(555) 345-6789",
    department: "IT",
    position: "System Administrator",
    accessLevel: "Medium",
    location: "Building A",
    lastScan: "3 days ago",
    photo: "/placeholder.svg?height=128&width=128",
    gate: "Gate 1",
  },
  {
    id: "EMP-1004",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "(555) 456-7890",
    department: "HR",
    position: "HR Manager",
    accessLevel: "High",
    location: "Building C",
    lastScan: "1 week ago",
    photo: "/placeholder.svg?height=128&width=128",
    gate: "Gate 3",
  },
]

interface ScanSimulatorProps {
  onScan: (user: any) => void
  className?: string
}

export function ScanSimulator({ onScan, className }: ScanSimulatorProps) {
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>(mockUsers[0].id)

  const handleScan = () => {
    const user = mockUsers.find((user) => user.id === selectedUser)
    if (user) {
      onScan(user)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <CreditCard className="mr-2 h-4 w-4" />
          Simulate Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simulate NFC Card Scan</DialogTitle>
          <DialogDescription>Select a user to simulate an NFC card scan at the security gate.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={selectedUser} onValueChange={setSelectedUser}>
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={user.id} id={user.id} />
                <Label htmlFor={user.id} className="flex flex-1 items-center gap-2 font-normal">
                  <span>{user.name}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{user.department}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleScan}>Scan Card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
