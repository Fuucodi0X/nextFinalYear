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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type User = {
  id: string
  name: string
  email: string
  mealPlan: string
  balance: number
  status: "Active" | "Inactive" | "Suspended"
  lastMeal?: string
  dietaryRestrictions?: string[]
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const email = row.getValue("email") as string
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "mealPlan",
    header: "Meal Plan",
    cell: ({ row }) => {
      const mealPlan = row.getValue("mealPlan") as string
      return <Badge variant="outline">{mealPlan}</Badge>
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.getValue("balance") as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance)
      return <div className={balance < 50 ? "text-red-500 font-medium" : ""}>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Inactive" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastMeal",
    header: "Last Meal",
    cell: ({ row }) => {
      const lastMeal = row.getValue("lastMeal") as string | undefined
      return lastMeal || "—"
    },
  },
  {
    accessorKey: "dietaryRestrictions",
    header: "Dietary Restrictions",
    cell: ({ row }) => {
      const restrictions = row.getValue("dietaryRestrictions") as string[] | undefined
      return restrictions && restrictions.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {restrictions.map((restriction, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {restriction}
            </Badge>
          ))}
        </div>
      ) : (
        "None"
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
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
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>Meal History</DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.status === "Active" ? (
              <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>Activate User</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
