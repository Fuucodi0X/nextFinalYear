import { Book, BookOpen, Mail, Phone, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface LibraryUserDetailsProps {
  user: {
    id: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    photo: string
  }
  borrowedBooks: any[]
  className?: string
}

export function LibraryUserDetails({ user, borrowedBooks, className }: LibraryUserDetailsProps) {
  // Check if any books are overdue
  const hasOverdueBooks = borrowedBooks.some((book) => new Date(book.dueDate) < new Date())

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
              {hasOverdueBooks && (
                <Badge variant="destructive" className="ml-2">
                  Overdue Books
                </Badge>
              )}
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
          <h4 className="font-medium">Library Information</h4>
          <div className="flex items-center gap-2 text-sm">
            <Book className="h-4 w-4 text-primary" />
            <span className="font-medium">Books Borrowed:</span> {borrowedBooks.length}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium">Borrowing Status:</span>
            {borrowedBooks.length === 0 ? (
              <span className="text-green-600 dark:text-green-500">Good Standing</span>
            ) : hasOverdueBooks ? (
              <span className="text-red-600 dark:text-red-500">Has Overdue Items</span>
            ) : (
              <span className="text-green-600 dark:text-green-500">Good Standing</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
