import { Coffee, Mail, Phone, User, Utensils } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CafeUserDetailsProps {
  user: {
    id: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    mealPlan: string
    lastMeal: string
    photo: string
  }
  className?: string
}

export function CafeUserDetails({ user, className }: CafeUserDetailsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
        <CardDescription>Information about the scanned student</CardDescription>
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
              <Badge variant="outline">{user.department}</Badge>
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
            <span className="font-medium">Phone:</span> {user.phone}
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <h4 className="font-medium">Meal Plan Information</h4>
          <div className="flex items-center gap-2 text-sm">
            <Coffee className="h-4 w-4 text-primary" />
            <span className="font-medium">Meal Plan:</span> {user.mealPlan}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Utensils className="h-4 w-4 text-primary" />
            <span className="font-medium">Last Meal:</span> {user.lastMeal}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
