"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Clock, Key } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { UserType } from "@/lib/types"
import { gql, useMutation } from "@apollo/client"
import { format } from 'date-fns'

interface DormitoryKeyManagementProps {
  user: UserType
  keyStatus: "issued" | "not_issued" | "returned"
  onKeyStatusChange: (status: "issued" | "not_issued" | "returned") => void
}
const issueQuery = gql`
mutation UpdateAssignedDormitoryByDormIdAndUserId($keyDormId: Uuid!, $keyUserId: Uuid!, $status:Varchar) {
  updateAssignedDormitoryByDormIdAndUserId(keyDormId: $keyDormId, keyUserId: $keyUserId, updateColumns: {status:{set: $status}}) {
    returning {
      status
    }
  }
}
`

export function DormitoryKeyManagement({ user, keyStatus, onKeyStatusChange }: DormitoryKeyManagementProps) {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  type KeyHistoryType = {
    status: "Key Issued" | "Key Retuned",
    date: string
  }
  const [keyHistory, setKeyHistory] = useState<KeyHistoryType[]>([])

  const [issue] = useMutation(issueQuery)

  const handleIssueKey = async () => {
    setIsProcessing(true)
    console.log("isssue key")
    console.log(user.id)
    if (!user.assignedDormitories[0] || !user.id) {
      return
    }
    console.log(user.assignedDormitories[0].dormId)
    await issue({ variables: { keyUserId: user.id, keyDormId: user.assignedDormitories[0].dormId, status: "issued" } })
    onKeyStatusChange("issued")
    setIsProcessing(false)
    const newKeyHistory: KeyHistoryType = {
      status: "Key Issued",
      date: format(Date.now(), "PPpp")
    }
    setKeyHistory(prev => [...prev, newKeyHistory])

    toast({
      title: "Key Issued",
      description: `Room key has been issued to ${user.name}`,
    })
    // }, 1500)
  }

  const handleReturnKey = async () => {
    console.log("returning key")
    setIsProcessing(true)

    await issue({ variables: { keyUserId: user.id, keyDormId: user.assignedDormitories[0].dormId, status: "returned" } })
    onKeyStatusChange("returned")
    setIsProcessing(false)

    const newKeyHistory: KeyHistoryType = {
      status: "Key Retuned",
      date: format(Date.now(), "PPpp")
    }
    setKeyHistory(prev => [...prev, newKeyHistory])

    toast({
      title: "Key Returned",
      description: `Room key has been returned by ${user.name}`,
    })
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
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.assignedDormitories[0] ? user.assignedDormitories[0].dormitoryRoom.roomNumber : ""}</p>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          {keyStatus === "issued" ? (
            <Button variant="outline" onClick={handleReturnKey} disabled={isProcessing} className="w-full">
              {isProcessing ? "Processing..." : "Record Key Return"}
            </Button>
          ) : (
            <Button onClick={handleIssueKey} className="w-full">
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
          <div className="space-y-4 overflow-y-auto scroll-m-1">
            {keyHistory.map((key, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{key.status}</p>
                  <p className="text-sm text-muted-foreground">{key.date}</p>
                </div>
              </div>

            ))}
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
