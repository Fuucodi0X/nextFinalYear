"use client"

import { useState } from "react"
import { DollarSign, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string
  studentId: string
  balance: number
  cardId: string
  status: "active" | "suspended" | "expired"
}

interface DepositProcessorProps {
  user: User
  onDepositComplete: (amount: number) => void
}

const QUICK_AMOUNTS = [10, 20, 50, 100]

export function DepositProcessor({ user, onDepositComplete }: DepositProcessorProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handleAmountChange = (value: string) => {
    setError("")
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
    setError("")
  }

  const handleDeposit = () => {
    const depositAmount = Number.parseFloat(amount)

    if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (depositAmount > 500) {
      setError("Maximum deposit amount is $500")
      return
    }

    if (depositAmount < 1) {
      setError("Minimum deposit amount is $1")
      return
    }

    setIsProcessing(true)
    setError("")

    // Simulate payment processing
    setTimeout(() => {
      onDepositComplete(depositAmount)
      setIsProcessing(false)
      setAmount("")
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="amount">Deposit Amount</Label>
        <div className="relative mt-1">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="pl-10"
            disabled={isProcessing}
          />
        </div>
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <Label className="text-sm">Quick Amounts</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(quickAmount)}
              disabled={isProcessing}
            >
              ${quickAmount}
            </Button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <Label htmlFor="payment-method">Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={isProcessing}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction Summary */}
      {amount && !error && (
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Balance:</span>
              <span>${user.balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Deposit Amount:</span>
              <span>${Number.parseFloat(amount || "0").toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>New Balance:</span>
                <span>${(user.balance + Number.parseFloat(amount || "0")).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Process Button */}
      <Button onClick={handleDeposit} disabled={!amount || !!error || isProcessing} className="w-full" size="lg">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Deposit...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Process Deposit
          </>
        )}
      </Button>
    </div>
  )
}
