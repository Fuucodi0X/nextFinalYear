"use client"

import { useState } from "react"
import { CreditCard, History, Settings, DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IdScanner } from "@/components/deposit/id-scanner"
import { DepositProcessor } from "@/components/deposit/deposit-processor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/dashboard/deposit", label: "Deposit", icon: CreditCard },
  { href: "/dashboard/deposit/history", label: "History", icon: History },
]

type User = {
  id: string
  name: string
  studentId: string
  balance: number
  cardId: string
  status: "active" | "suspended" | "expired"
}

// Mock user database
const USERS: User[] = [
  { id: "1", name: "John Doe", studentId: "STU001", balance: 150.5, cardId: "CARD-1001", status: "active" },
  { id: "2", name: "Jane Smith", studentId: "STU002", balance: 75.25, cardId: "CARD-1002", status: "active" },
  { id: "3", name: "Mike Johnson", studentId: "STU003", balance: 200.0, cardId: "CARD-1003", status: "active" },
  { id: "4", name: "Sarah Wilson", studentId: "STU004", balance: 0.0, cardId: "CARD-1004", status: "suspended" },
  { id: "5", name: "David Brown", studentId: "STU005", balance: 325.75, cardId: "CARD-1005", status: "active" },
]

export default function DepositPage() {
  const [scannedUser, setScannedUser] = useState<User | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [depositComplete, setDepositComplete] = useState(false)

  const handleIdScanned = (cardId: string) => {
    setIsScanning(true)

    // Simulate API call to find user
    setTimeout(() => {
      const user = USERS.find((u) => u.cardId === cardId)
      setScannedUser(user || null)
      setIsScanning(false)
    }, 1500)
  }

  const handleDepositComplete = (amount: number) => {
    if (scannedUser) {
      // Update user balance (in real app, this would be an API call)
      scannedUser.balance += amount
      setDepositComplete(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setScannedUser(null)
        setDepositComplete(false)
      }, 3000)
    }
  }

  const handleNewTransaction = () => {
    setScannedUser(null)
    setDepositComplete(false)
  }

  return (
    <DashboardLayout navItems={navItems} title="Deposit Dashboard" icon={CreditCard}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Money Deposit</h2>
            <p className="text-muted-foreground">Scan student ID to add money to their account</p>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Deposit Station Active</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ID Scanner Section */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Scan Student ID</CardTitle>
              <CardDescription>Place the student ID card on the scanner</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <IdScanner onIdScanned={handleIdScanned} isLoading={isScanning} disabled={!!scannedUser} />
              {isScanning && <p className="text-sm text-muted-foreground">Identifying student...</p>}
            </CardContent>
          </Card>

          {/* User Information & Deposit Section */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Process Deposit</CardTitle>
              <CardDescription>{scannedUser ? "Enter deposit amount" : "Waiting for student ID scan"}</CardDescription>
            </CardHeader>
            <CardContent>
              {!scannedUser && !isScanning && (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mb-4" />
                  <p>Please scan a student ID to continue</p>
                </div>
              )}

              {isScanning && (
                <div className="flex flex-col items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                  <p className="text-sm text-muted-foreground">Processing ID...</p>
                </div>
              )}

              {scannedUser && !depositComplete && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{scannedUser.name}</h3>
                      <Badge variant={scannedUser.status === "active" ? "default" : "destructive"}>
                        {scannedUser.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Student ID: {scannedUser.studentId}</p>
                    <p className="text-sm">
                      Current Balance: <span className="font-semibold">${scannedUser.balance.toFixed(2)}</span>
                    </p>
                  </div>

                  {scannedUser.status === "active" ? (
                    <DepositProcessor user={scannedUser} onDepositComplete={handleDepositComplete} />
                  ) : (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive font-medium">Account Suspended</p>
                      <p className="text-sm text-destructive/80">
                        This account is suspended and cannot receive deposits.
                      </p>
                      <Button variant="outline" className="mt-3" onClick={handleNewTransaction}>
                        Scan Another ID
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {depositComplete && scannedUser && (
                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-green-600">Deposit Successful!</h3>
                    <p className="text-sm text-muted-foreground">New Balance: ${scannedUser.balance.toFixed(2)}</p>
                  </div>
                  <Button onClick={handleNewTransaction}>New Transaction</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+8 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Deposit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$26.27</div>
              <p className="text-xs text-muted-foreground">+2.1% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
