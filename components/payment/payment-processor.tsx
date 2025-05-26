"use client"

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PaymentProcessorProps {
  status: "complete" | "failed"
  studentInfo: {
    id: number
    name: string
    balance: number
    photo: string
  } | null
  total: number
  items: Array<{ id: string; name: string; price: number; quantity: number }>
  onNewOrder: () => void
}

export function PaymentProcessor({ status, studentInfo, total, items, onNewOrder }: PaymentProcessorProps) {
  const timestamp = new Date().toLocaleString()
  const transactionId = `TRX-${Math.floor(Math.random() * 10000)}`

  if (!studentInfo) {
    return (
      <Card>
        <CardHeader className="bg-amber-50 dark:bg-amber-950/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>Student Not Found</CardTitle>
          </div>
          <CardDescription>Unable to process payment</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="mb-4">The student card could not be found in the system.</p>
            <p className="text-muted-foreground">Please try again or contact support.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onNewOrder}>New Order</Button>
        </CardFooter>
      </Card>
    )
  }

  if (status === "complete") {
    return (
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-950/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle>Payment Successful</CardTitle>
          </div>
          <CardDescription>Transaction completed successfully</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={studentInfo.photo || "/placeholder.svg"} alt={studentInfo.name} />
              <AvatarFallback>{studentInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{studentInfo.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {studentInfo.id}</p>
              <p className="text-sm text-muted-foreground">New Balance: ${(studentInfo.balance - total).toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="text-muted-foreground">Transaction ID:</div>
              <div className="font-mono">{transactionId}</div>
              <div className="text-muted-foreground">Date & Time:</div>
              <div>{timestamp}</div>
              <div className="text-muted-foreground">Amount:</div>
              <div className="font-medium">${total.toFixed(2)}</div>
            </div>

            <div className="rounded-md border p-3">
              <h4 className="mb-2 font-medium">Items</h4>
              <div className="space-y-1 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Print Receipt</Button>
          <Button onClick={onNewOrder}>New Order</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="bg-red-50 dark:bg-red-950/50">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <CardTitle>Payment Failed</CardTitle>
        </div>
        <CardDescription>Unable to process payment</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={studentInfo.photo || "/placeholder.svg"} alt={studentInfo.name} />
            <AvatarFallback>{studentInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{studentInfo.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {studentInfo.id}</p>
            <p className="text-sm text-muted-foreground">Current Balance: ${studentInfo.balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/50">
          <h4 className="mb-2 font-medium text-red-700 dark:text-red-400">Insufficient Funds</h4>
          <p className="text-sm text-red-700 dark:text-red-400">
            The student does not have enough funds to complete this transaction.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
            <div className="text-red-700 dark:text-red-400">Required Amount:</div>
            <div className="font-medium text-red-700 dark:text-red-400">${total.toFixed(2)}</div>
            <div className="text-red-700 dark:text-red-400">Available Balance:</div>
            <div className="font-medium text-red-700 dark:text-red-400">${studentInfo.balance.toFixed(2)}</div>
            <div className="text-red-700 dark:text-red-400">Shortage:</div>
            <div className="font-medium text-red-700 dark:text-red-400">
              ${(total - studentInfo.balance).toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Add Funds</Button>
        <Button onClick={onNewOrder}>New Order</Button>
      </CardFooter>
    </Card>
  )
}
