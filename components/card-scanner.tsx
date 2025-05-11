"use client"

import { useState } from "react"
import { ContactIcon as ContactlessIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CardScannerProps {
  onCardScanned: (cardId: string) => void
  isLoading?: boolean
}

export function CardScanner({ onCardScanned, isLoading = false }: CardScannerProps) {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    if (isScanning || isLoading) return

    setIsScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      // Generate a random card ID from predefined list for demo
      const cardIds = ["CARD-1001", "CARD-1002", "CARD-1003", "CARD-1004", "CARD-1005"]
      const randomCardId = cardIds[Math.floor(Math.random() * cardIds.length)]

      onCardScanned(randomCardId)
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer" onClick={handleScan}>
        <div
          className={`absolute inset-0 bg-primary/10 rounded-full ${isScanning || isLoading ? "animate-ping" : ""}`}
        ></div>
        <div
          className={`absolute inset-2 bg-primary/20 rounded-full ${isScanning || isLoading ? "animate-pulse" : ""}`}
        ></div>
        <ContactlessIcon className="w-16 h-16 text-primary relative z-10" />
      </div>
      <Button variant="outline" className="mt-4" onClick={handleScan} disabled={isScanning || isLoading}>
        {isScanning ? "Scanning..." : isLoading ? "Processing..." : "Scan Card"}
      </Button>
    </div>
  )
}
