"use client"

import { useState } from "react"
import { Book, BookOpen, Home, Library, Settings, User, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LibraryUserDetails } from "@/components/library/user-details"
import { BookBorrowing } from "@/components/library/book-borrowing"
import { BookReturning } from "@/components/library/book-returning"
import { CardSimulator } from "@/components/card-simulator"

const navItems = [
  { href: "/dashboard/library", label: "Dashboard", icon: Home },
  { href: "/dashboard/library/books", label: "Books", icon: Book },
  { href: "/dashboard/library/users", label: "Users", icon: Users },
  { href: "/dashboard/library/settings", label: "Settings", icon: Settings },
]

export default function LibraryDashboardPage() {
  const { toast } = useToast()
  const [activeUser, setActiveUser] = useState<any>(null)
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([])

  const handleScan = (user: any) => {
    setActiveUser(user)

    // Initialize borrowed books from the user data
    if (user.borrowedBooks && user.borrowedBooks.length > 0) {
      setBorrowedBooks(
        user.borrowedBooks.map((book: any) => ({
          ...book,
          userId: user.id,
          userName: user.name,
          borrowDate: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString(),
        })),
      )
    } else {
      setBorrowedBooks([])
    }

    toast({
      title: "ID Card Scanned",
      description: `${user.name} (${user.id}) scanned successfully`,
    })
  }

  const handleBorrowBook = (bookData: any) => {
    const newBook = {
      id: `BK-${Date.now()}`,
      userId: activeUser.id,
      userName: activeUser.name,
      ...bookData,
      borrowDate: new Date().toISOString(),
    }

    setBorrowedBooks([...borrowedBooks, newBook])

    toast({
      title: "Book Borrowed",
      description: `${bookData.title} has been borrowed by ${activeUser.name}`,
    })
  }

  const handleReturnBook = (bookId: string) => {
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId))

    toast({
      title: "Book Returned",
      description: "Book has been successfully returned",
    })
  }

  return (
    <DashboardLayout navItems={navItems} title="Library Management" icon={Library}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle className="text-xl">Library Management Dashboard</CardTitle>
              <CardDescription>Manage book borrowing and returns</CardDescription>
            </div>
            <CardSimulator onScan={handleScan} className="ml-auto" buttonText="Scan Student ID" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Borrowed Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Returned Today</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">-5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">4 due today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12% from average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrow">Borrow Books</TabsTrigger>
            <TabsTrigger value="return">Return Books</TabsTrigger>
          </TabsList>
          {activeUser && (
            <div className="ml-auto flex items-center gap-2 rounded-lg bg-muted px-3 py-1">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active user: {activeUser.name}</span>
              <Badge variant="outline" className="ml-2">
                {activeUser.id}
              </Badge>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeUser ? (
            <>
              <LibraryUserDetails user={activeUser} borrowedBooks={borrowedBooks} className="md:col-span-1" />
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Borrowed Books</CardTitle>
                  <CardDescription>Books currently borrowed by {activeUser.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {borrowedBooks.length > 0 ? (
                    <div className="space-y-4">
                      {borrowedBooks.map((book) => (
                        <div key={book.id} className="flex items-center gap-4 rounded-lg border p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Book className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{book.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(book.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={new Date(book.dueDate) < new Date() ? "destructive" : "outline"}>
                            {new Date(book.dueDate) < new Date() ? "Overdue" : "On time"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No Borrowed Books</h3>
                      <p className="text-sm text-muted-foreground">This user has no books currently borrowed</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Waiting for ID Card Scan</CardTitle>
                <CardDescription>Scan a student's ID card to view their details</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Library className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Use the "Scan Student ID" button to begin</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="borrow">
          {activeUser ? (
            <BookBorrowing user={activeUser} onBorrowBook={handleBorrowBook} borrowedBooks={borrowedBooks} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Borrow Books</CardTitle>
                <CardDescription>Scan a student's ID card to borrow books</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Scan a student's ID to borrow books</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="return">
          {activeUser ? (
            <BookReturning user={activeUser} borrowedBooks={borrowedBooks} onReturnBook={handleReturnBook} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Return Books</CardTitle>
                <CardDescription>Scan a student's ID card to return books</CardDescription>
              </CardHeader>
              <CardContent className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Scan a student's ID to return books</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
