"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export type Meal = {
  id: string
  studentId: string
  studentName: string
  type: "Breakfast" | "Lunch" | "Dinner"
  mealPlan: string
  date: string
  time: string
  status: "Served" | "Cancelled" | "Pending"
  specialRequest?: string
}

export const columns: ColumnDef<Meal>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => {
      const studentName = row.getValue("studentName") as string
      const studentId = row.getValue("studentId") as string
      return (
        <div>
          <div className="font-medium">{studentName}</div>
          <div className="text-xs text-muted-foreground">{studentId}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Meal Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <Badge variant="outline">{type}</Badge>
    },
  },
  {
    accessorKey: "mealPlan",
    header: "Meal Plan",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Served" ? "default" : status === "Cancelled" ? "destructive" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "specialRequest",
    header: "Special Request",
    cell: ({ row }) => {
      const specialRequest = row.getValue("specialRequest") as string | undefined
      return specialRequest ? (
        <span className="max-w-[200px] truncate" title={specialRequest}>
          {specialRequest}
        </span>
      ) : (
        "—"
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const meal = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {meal.status === "Pending" && <DropdownMenuItem>Mark as Served</DropdownMenuItem>}
            {meal.status === "Pending" && <DropdownMenuItem>Cancel Meal</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Student Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
