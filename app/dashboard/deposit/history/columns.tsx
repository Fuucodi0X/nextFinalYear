"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Deposit = {
  id: string
  studentName: string
  studentId: string
  amount: number
  paymentMethod: "cash" | "card" | "bank"
  status: "completed" | "pending" | "failed"
  timestamp: string
  operatorId: string
}

export const columns: ColumnDef<Deposit>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "studentName",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("studentName")}</div>
        <div className="text-sm text-muted-foreground">{row.original.studentId}</div>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as string
      return (
        <Badge variant="outline" className="capitalize">
          {method}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "completed" ? "default" : status === "pending" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date & Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"))
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-muted-foreground">{date.toLocaleTimeString()}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "operatorId",
    header: "Operator",
    cell: ({ row }) => <div className="text-sm">{row.getValue("operatorId")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deposit = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(deposit.id)}>
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Print receipt</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
