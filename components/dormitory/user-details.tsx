import { Bed, Building, Mail, MapPin, Phone, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserType } from "@/lib/types"
interface DormitoryUserDetailsProps {
  user: UserType,
  keyStatus: "issued" | "not_issued" | "returned"
  className?: string
}

export function DormitoryUserDetails({ user, keyStatus, className }: DormitoryUserDetailsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Resident Details</CardTitle>
        <CardDescription>Information about the scanned resident</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.role}</p>
            <div className="mt-1 flex items-center">
              <Badge
                variant={keyStatus === "issued" ? "default" : keyStatus === "not_issued" ? "destructive" : "outline"}
                className="ml-2"
              >
                Key {keyStatus === "issued" ? "Issued" : keyStatus === "not_issued" ? "Not Issued" : "Returned"}
              </Badge>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">ID:</span> {user.id}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span className="font-medium">Phone:</span> {user.phoneNumber}
          </div>
        </div>
        <Separator />
        {/* dormitory info */}
        {
          user.assignedDormitories.length > 0 ? (
            < div className="grid gap-2">
              <h4 className="font-medium">Dormitory Information</h4>
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-primary" />
                <span className="font-medium">Block:</span> {user.assignedDormitories[0].dormitoryRoom.buildingNumber}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Bed className="h-4 w-4 text-primary" />
                <span className="font-medium">Floor:</span>{user.assignedDormitories[0].dormitoryRoom.floorNumber}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Room number:</span>{user.assignedDormitories[0].dormitoryRoom.roomNumber}
              </div>
            </div>
          ) : null
        }
      </CardContent>
    </Card >
  )
}
