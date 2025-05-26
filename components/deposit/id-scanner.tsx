"use client"

import { useState } from "react"
import { CreditCard, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IdScannerProps {
  onIdScanned: (cardId: string) => void
  isLoading?: boolean
  disabled?: boolean
}

export function IdScanner({ onIdScanned, isLoading = false, disabled = false }: IdScannerProps) {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    if (isScanning || isLoading || disabled) return

    setIsScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      // Generate a random card ID from predefined list for demo
      const cardIds = ["CARD-1001", "CARD-1002", "CARD-1003", "CARD-1004", "CARD-1005"]
      const randomCardId = cardIds[Math.floor(Math.random() * cardIds.length)]

      onIdScanned(randomCardId)
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative w-32 h-32 flex items-center justify-center cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!disabled ? handleScan : undefined}
      >
        <div
          className={`absolute inset-0 bg-blue-500/10 rounded-full ${
            (isScanning || isLoading) && !disabled ? "animate-ping" : ""
          }`}
        ></div>
        <div
          className={`absolute inset-2 bg-blue-500/20 rounded-full ${
            (isScanning || isLoading) && !disabled ? "animate-pulse" : ""
          }`}
        ></div>
        <CreditCard className={`w-16 h-16 relative z-10 ${disabled ? "text-muted-foreground" : "text-blue-500"}`} />
      </div>
      <Button variant="outline" className="mt-4" onClick={handleScan} disabled={isScanning || isLoading || disabled}>
        <Scan className="w-4 h-4 mr-2" />
        {isScanning ? "Scanning..." : isLoading ? "Processing..." : disabled ? "Scan Complete" : "Scan ID"}
      </Button>
    </div>
  )
}
