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
import { MoreHorizontal, Edit, Trash, UserPlus, Ban } from "lucide-react"

export type Card = {
  id: string
  cardNumber: string
  status: "Assigned" | "Unassigned" | "Inactive"
  assignedTo?: string
  role?: string
  lastUsed?: string
  issueDate: string
}

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "cardNumber",
    header: "Card Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      return (
        <Badge variant={status === "Assigned" ? "default" : status === "Unassigned" ? "outline" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as string | undefined

      return assignedTo || "—"
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string | undefined

      return role || "—"
    },
  },
  {
    accessorKey: "lastUsed",
    header: "Last Used",
    cell: ({ row }) => {
      const lastUsed = row.getValue("lastUsed") as string | undefined

      return lastUsed || "Never"
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const card = row.original

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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Card
            </DropdownMenuItem>
            {card.status === "Unassigned" && (
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign to User
              </DropdownMenuItem>
            )}
            {card.status === "Assigned" && (
              <DropdownMenuItem>
                <Ban className="mr-2 h-4 w-4" />
                Unassign Card
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Card
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
