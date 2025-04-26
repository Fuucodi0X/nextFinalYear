"use client"

import { BadgeCheck, Building, Calendar, Clock, Mail, MapPin, Phone, Shield } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserHistory } from "@/components/user-history"
import { IdentityVerification } from "@/components/identity-verification"
import { useState } from "react"

interface UserDetailsCardProps {
  user: {
    id: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    accessLevel: string
    location: string
    lastScan: string
    photo: string
    gate: string
  }
  className?: string
}

export function UserDetailsCard({ user, className }: UserDetailsCardProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Personnel Details</CardTitle>
          <CardDescription>Information about the scanned user</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.position}</p>
              <div className="mt-1 flex items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {user.accessLevel} Access
                </Badge>
                {user.accessLevel === "High" && <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">VIP</Badge>}
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">ID:</span> {user.id}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-primary" />
              <span className="font-medium">Department:</span> {user.department}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-medium">Phone:</span> {user.phone}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Location:</span> {user.location}
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <h4 className="font-medium">Current Scan Information</h4>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Time:</span> {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium">Gate:</span> {user.gate}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowHistory(true)}>
            View History
          </Button>
          <Button onClick={() => setShowVerification(true)}>Verify Identity</Button>
        </CardFooter>
      </Card>

      <UserHistory user={user} open={showHistory} onOpenChange={setShowHistory} />
      <IdentityVerification user={user} open={showVerification} onOpenChange={setShowVerification} />
    </>
  )
}
