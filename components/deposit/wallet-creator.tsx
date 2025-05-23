"use client"

import { useState } from "react"
import { Wallet, CreditCard, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface User {
  id: string
  name: string
  studentId: string
  balance: number
  cardId: string
  status: "active" | "suspended" | "expired"
  hasWallet: boolean
  walletId?: string
}

interface WalletCreatorProps {
  user: User
  onWalletCreated: (walletId: string) => void
  isCreating: boolean
  setIsCreating: (creating: boolean) => void
}

export function WalletCreator({ user, onWalletCreated, isCreating, setIsCreating }: WalletCreatorProps) {
  const [step, setStep] = useState(1)
  const [walletType, setWalletType] = useState("")
  const [securityPin, setSecurityPin] = useState("")
  const [confirmPin, setPinConfirm] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState("")

  const handleCreateWallet = () => {
    if (!walletType) {
      setError("Please select a wallet type")
      return
    }

    if (securityPin.length !== 4 || !/^\d{4}$/.test(securityPin)) {
      setError("PIN must be exactly 4 digits")
      return
    }

    if (securityPin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setError("")
    setIsCreating(true)

    // Simulate wallet creation process
    setTimeout(() => {
      const walletId = `WALLET-${Date.now()}`
      onWalletCreated(walletId)
      setStep(3) // Success step
    }, 3000)
  }

  const resetForm = () => {
    setStep(1)
    setWalletType("")
    setSecurityPin("")
    setPinConfirm("")
    setAgreedToTerms(false)
    setError("")
  }

  if (step === 3) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-green-600">Wallet Created Successfully!</h3>
          <p className="text-sm text-muted-foreground">Wallet ID: {user.walletId}</p>
        </div>
        <p className="text-sm text-muted-foreground">You can now proceed with deposits and transactions.</p>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Create Digital Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <Label htmlFor="wallet-type">Wallet Type</Label>
              <Select value={walletType} onValueChange={setWalletType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student Wallet</SelectItem>
                  <SelectItem value="premium">Premium Wallet</SelectItem>
                  <SelectItem value="basic">Basic Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="security-pin">Security PIN</Label>
                <Input
                  id="security-pin"
                  type="password"
                  placeholder="4-digit PIN"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  maxLength={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirm-pin">Confirm PIN</Label>
                <Input
                  id="confirm-pin"
                  type="password"
                  placeholder="Confirm PIN"
                  value={confirmPin}
                  onChange={(e) => setPinConfirm(e.target.value)}
                  maxLength={4}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the wallet terms and conditions
              </Label>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <Button onClick={() => setStep(2)} className="flex-1">
                Review Details
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium">Wallet Details</h4>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Student Name:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Student ID:</span>
                  <span className="font-medium">{user.studentId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wallet Type:</span>
                  <span className="font-medium capitalize">{walletType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security:</span>
                  <span className="font-medium">4-digit PIN</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Security Notice</p>
                  <p className="text-blue-700">
                    Your wallet will be secured with your PIN. Keep it confidential and don't share it with anyone.
                  </p>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleCreateWallet} disabled={isCreating} className="flex-1">
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Create Wallet
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
