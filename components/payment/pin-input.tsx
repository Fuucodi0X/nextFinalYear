"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface PinInputProps {
  onPinComplete: (pin: string) => void
  error?: string
  length?: number
}

export function PinInput({ onPinComplete, error, length = 4 }: PinInputProps) {
  const [pin, setPin] = useState(Array(length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    // Clear PIN when error occurs
    if (error) {
      setPin(Array(length).fill(""))
      setIsSubmitting(false)
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }
  }, [error, length])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value.slice(-1) // Only take the last character

    setPin(newPin)

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all digits are entered
    if (newPin.every((digit) => digit !== "") && !isSubmitting) {
      setIsSubmitting(true)
      onPinComplete(newPin.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "Enter" && pin.every((digit) => digit !== "")) {
      // Submit on Enter if all digits are filled
      if (!isSubmitting) {
        setIsSubmitting(true)
        onPinComplete(pin.join(""))
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)

    if (pastedData.length === length) {
      const newPin = pastedData.split("")
      setPin(newPin)
      setIsSubmitting(true)
      onPinComplete(newPin.join(""))
    }
  }

  const clearPin = () => {
    setPin(Array(length).fill(""))
    setIsSubmitting(false)
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {pin.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-lg font-mono ${error ? "border-red-500 focus:border-red-500" : ""}`}
            disabled={isSubmitting}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={clearPin} disabled={isSubmitting}>
          Clear
        </Button>
        <Button
          size="sm"
          onClick={() => {
            if (pin.every((digit) => digit !== "") && !isSubmitting) {
              setIsSubmitting(true)
              onPinComplete(pin.join(""))
            }
          }}
          disabled={!pin.every((digit) => digit !== "") || isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Confirm"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">Enter your 4-digit PIN to confirm the payment</p>
    </div>
  )
}
