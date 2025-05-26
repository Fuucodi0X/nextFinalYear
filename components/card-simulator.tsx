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
    // dormitory: "Faculty Housing, Block C",
    // keyStatus: "issued",
    // Cafe specific
    // mealPlan: "Faculty Plan",
    // lastMeal: "Dinner, 2 days ago",
    // Library specific
    // borrowedBooks: [
    //   { id: "BK-2001", title: "Quantum Physics", dueDate: "2023-05-15" },
    //   { id: "BK-2002", title: "The Universe in a Nutshell", dueDate: "2023-05-22" },
    // ],
  },
  {
    id: "STU-1003",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    phone: "(555) 456-7890",
    position: "Student",
    accessLevel: "Medium",
    photo: "/placeholder.svg?height=128&width=128",
    // Dormitory specific
    // dormitory: "Building A, Room 310",
    // keyStatus: "issued",
    // Cafe specific
    // mealPlan: "Full Board",
    // lastMeal: "Dinner, Today",
    // Library specific
    // borrowedBooks: [
    //   { id: "BK-3001", title: "Pride and Prejudice", dueDate: "2023-05-18" },
    //   { id: "BK-3002", title: "To Kill a Mockingbird", dueDate: "2023-05-25" },
    //   { id: "BK-3003", title: "1984", dueDate: "2023-05-30" },
    // ],
  },
]

interface CardScannerProps {
  onScan: (user: any) => void
  className?: string
  buttonText?: string
}

export function CardSimulator({ onScan, className, buttonText = "Scan ID Card" }: CardScannerProps) {
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
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simulate ID Card Scan</DialogTitle>
          <DialogDescription>Select a user to simulate an ID card scan.</DialogDescription>
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
