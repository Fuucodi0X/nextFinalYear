"use client"

import { useState } from "react"
import { DollarSign, Receipt, Package, Shield, Search, Download, Filter } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample transaction data
const transactions = [
  {
    id: "TRX-2305",
    studentId: 1001,
    studentName: "John Doe",
    date: new Date().toISOString(),
    amount: 24.99,
    status: "completed",
    items: [
      { name: "Coffee", quantity: 2, price: 2.5 },
      { name: "Sandwich", quantity: 1, price: 6.5 },
      { name: "Printing (Color)", quantity: 15, price: 0.5 },
    ],
    paymentMethod: "Card",
  },
  {
    id: "TRX-2304",
    studentId: 1004,
    studentName: "Maria Garcia",
    date: new Date(Date.now() - 86400000).toISOString(),
    amount: 15.5,
    status: "failed",
    items: [
      { name: "Lunch", quantity: 1, price: 8.75 },
      { name: "Snack", quantity: 2, price: 3.25 },
    ],
    paymentMethod: "Card",
  },
  {
    id: "TRX-2303",
    studentId: 1003,
    studentName: "Alex Johnson",
    date: new Date(Date.now() - 172800000).toISOString(),
    amount: 42.75,
    status: "completed",
    items: [
      { name: "Backpack", quantity: 1, price: 35.0 },
      { name: "Pen Pack", quantity: 1, price: 4.25 },
      { name: "Notebook", quantity: 1, price: 3.5 },
    ],
    paymentMethod: "Card",
  },
  {
    id: "TRX-2302",
    studentId: 1002,
    studentName: "Jane Smith",
    date: new Date(Date.now() - 259200000).toISOString(),
    amount: 10.0,
    status: "completed",
    items: [{ name: "Study Room Rental", quantity: 1, price: 10.0 }],
    paymentMethod: "Card",
  },
  {
    id: "TRX-2301",
    studentId: 1005,
    studentName: "Sam Wilson",
    date: new Date(Date.now() - 345600000).toISOString(),
    amount: 18.5,
    status: "completed",
    items: [
      { name: "T-Shirt", quantity: 1, price: 15.0 },
      { name: "Water Bottle", quantity: 1, price: 8.5 },
    ],
    paymentMethod: "Card",
  },
]

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [dateRange, setDateRange] = useState("all")

  const navItems = [
    { href: "/dashboard/payment", label: "Dashboard", icon: DollarSign },
    { href: "/dashboard/payment/history", label: "Payment History", icon: Receipt },
    { href: "/dashboard/payment/products", label: "Products", icon: Package },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.studentId.toString().includes(searchQuery)

    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(transaction.status)

    // Date filter
    let matchesDate = true
    const txDate = new Date(transaction.date)
    const now = new Date()

    if (dateRange === "today") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      matchesDate = txDate >= today
    } else if (dateRange === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      matchesDate = txDate >= weekAgo
    } else if (dateRange === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      matchesDate = txDate >= monthAgo
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <DashboardLayout navItems={navItems} title="Payment History" icon={Receipt} showBackButton>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by ID, student name..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes("completed")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, "completed"])
                    } else {
                      setStatusFilter(statusFilter.filter((s) => s !== "completed"))
                    }
                  }}
                >
                  Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes("failed")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, "failed"])
                    } else {
                      setStatusFilter(statusFilter.filter((s) => s !== "failed"))
                    }
                  }}
                >
                  Failed
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and manage payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 border-b p-3 font-medium">
                <div>Transaction ID</div>
                <div>Student</div>
                <div>Date</div>
                <div>Items</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-6 p-3">
                      <div className="font-mono text-sm">{transaction.id}</div>
                      <div>
                        <div>{transaction.studentName}</div>
                        <div className="text-xs text-muted-foreground">ID: {transaction.studentId}</div>
                      </div>
                      <div>
                        {new Date(transaction.date).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">{transaction.items.length} items</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {transaction.items.map((item) => item.name).join(", ")}
                        </div>
                      </div>
                      <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {transaction.status === "completed" ? "Completed" : "Failed"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-32 items-center justify-center text-center text-muted-foreground">
                    No transactions found matching your filters.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
