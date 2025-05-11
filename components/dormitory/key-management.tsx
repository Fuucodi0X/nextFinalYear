"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Clock, Key } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface DormitoryKeyManagementProps {
  user: {
    id: string
    name: string
    dormitory: string
    photo: string
  }
  keyStatus: "issued" | "not_issued" | "returned"
  onKeyStatusChange: (status: "issued" | "not_issued" | "returned") => void
}

export function DormitoryKeyManagement({ user, keyStatus, onKeyStatusChange }: DormitoryKeyManagementProps) {
  const { toast } = useToast()
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleIssueKey = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      onKeyStatusChange("issued")
      setIsProcessing(false)

      toast({
        title: "Key Issued",
        description: `Room key has been issued to ${user.name}`,
      })
    }, 1500)
  }

  const handleReturnKey = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      onKeyStatusChange("returned")
      setIsProcessing(false)

      toast({
        title: "Key Returned",
        description: `Room key has been returned by ${user.name}`,
      })
    }, 1500)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Key Management</CardTitle>
          <CardDescription>Issue or return dormitory keys for {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.dormitory}</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              {user.id}
            </Badge>
          </div>

          <div className="rounded-lg border p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Current Key Status</h3>
            </div>

            <div className="flex items-center gap-2 mt-4">
              {keyStatus === "issued" ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Key is currently issued</span>
                </div>
              ) : keyStatus === "not_issued" ? (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Key has not been issued</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Key has been returned</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Add any notes about the key issuance or return..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {keyStatus === "issued" ? (
            <Button variant="outline" onClick={handleReturnKey} disabled={isProcessing} className="w-full">
              {isProcessing ? "Processing..." : "Record Key Return"}
            </Button>
          ) : (
            <Button onClick={handleIssueKey} disabled={isProcessing || keyStatus === "issued"} className="w-full">
              {isProcessing ? "Processing..." : "Issue Key"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key History</CardTitle>
          <CardDescription>Recent key activity for this resident</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Key Issued</p>
                <p className="text-sm text-muted-foreground">2023-04-15 at 9:30 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Key Returned</p>
                <p className="text-sm text-muted-foreground">2023-12-20 at 4:15 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Key Issued</p>
                <p className="text-sm text-muted-foreground">2024-01-10 at 10:45 AM</p>
              </div>
            </div>

            {keyStatus === "returned" && (
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Key Returned</p>
                  <p className="text-sm text-muted-foreground">Today at {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
