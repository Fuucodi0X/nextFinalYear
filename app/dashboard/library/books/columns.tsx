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

export type Book = {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  status: "Available" | "Borrowed" | "Overdue" | "Reserved" | "Processing"
  borrowedBy?: string
  borrowDate?: string
  dueDate?: string
  location: string
  copies: number
}

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return <div className="font-medium">{title}</div>
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return <Badge variant="outline">{category}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "Available"
              ? "default"
              : status === "Borrowed"
                ? "secondary"
                : status === "Overdue"
                  ? "destructive"
                  : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "borrowedBy",
    header: "Borrowed By",
    cell: ({ row }) => {
      const borrowedBy = row.getValue("borrowedBy") as string | undefined
      return borrowedBy || "—"
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | undefined
      return dueDate || "—"
    },
  },
  {
    accessorKey: "copies",
    header: "Copies",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original
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
            <DropdownMenuItem>Edit Book</DropdownMenuItem>
            {book.status === "Available" && <DropdownMenuItem>Mark as Borrowed</DropdownMenuItem>}
            {book.status === "Borrowed" && <DropdownMenuItem>Mark as Returned</DropdownMenuItem>}
            {book.status === "Overdue" && <DropdownMenuItem>Send Reminder</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Remove Book</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
