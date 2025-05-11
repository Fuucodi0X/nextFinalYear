"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, MessageSquare, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DormitoryComplaintFormProps {
  user: {
    id: string
    name: string
    dormitory: string
    photo: string
  }
  onSubmit: (complaint: any) => void
  complaints: any[]
}

export function DormitoryComplaintForm({ user, onSubmit, complaints }: DormitoryComplaintFormProps) {
  const [complaintType, setComplaintType] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState("medium")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!complaintType || !description) return

    onSubmit({
      type: complaintType,
      description,
      severity,
    })

    // Reset form
    setComplaintType("")
    setDescription("")
    setSeverity("medium")
  }

  const userComplaints = complaints.filter((complaint) => complaint.userId === user.id)

  const filteredComplaints = userComplaints.filter((complaint) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return complaint.type.toLowerCase().includes(query) || complaint.description.toLowerCase().includes(query)
  })

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>File a Complaint</CardTitle>
          <CardDescription>Submit a new complaint for {user.name}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.dormitory}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="complaint-type">Complaint Type</Label>
              <Select value={complaintType} onValueChange={setComplaintType} required>
                <SelectTrigger id="complaint-type">
                  <SelectValue placeholder="Select complaint type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noise">Noise Disturbance</SelectItem>
                  <SelectItem value="cleanliness">Cleanliness Issue</SelectItem>
                  <SelectItem value="property">Property Damage</SelectItem>
                  <SelectItem value="behavior">Behavioral Issue</SelectItem>
                  <SelectItem value="guest">Unauthorized Guest</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select value={severity} onValueChange={setSeverity} required>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the complaint..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Complaint
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complaint History</CardTitle>
          <CardDescription>Previous complaints for {user.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search complaints..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredComplaints.length > 0 ? (
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <div key={complaint.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={
                          complaint.severity === "urgent"
                            ? "destructive"
                            : complaint.severity === "high"
                              ? "destructive"
                              : complaint.severity === "medium"
                                ? "default"
                                : "outline"
                        }
                      >
                        {complaint.severity.charAt(0).toUpperCase() + complaint.severity.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(complaint.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <h4 className="font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      {complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)} Complaint
                    </h4>

                    <p className="mt-2 text-sm">{complaint.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">No Complaints Found</h3>
              <p className="text-sm text-muted-foreground">
                {userComplaints.length === 0
                  ? "This resident has no complaints on record"
                  : "No complaints match your search criteria"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
