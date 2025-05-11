"use client"

import { useState } from "react"
import { Book, BookOpen, Calendar, Check, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface BookBorrowingProps {
  user: {
    id: string
    name: string
    photo: string
  }
  onBorrowBook: (bookData: any) => void
  borrowedBooks: any[]
}

// Mock book database
const BOOKS_DATABASE = [
  {
    id: "BK-1001",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    category: "Computer Science",
  },
  {
    id: "BK-1002",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    category: "Computer Science",
  },
  {
    id: "BK-1003",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    category: "Fiction",
  },
  { id: "BK-1004", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", category: "Fiction" },
  { id: "BK-1005", title: "1984", author: "George Orwell", isbn: "9780451524935", category: "Fiction" },
  { id: "BK-1006", title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", category: "Fiction" },
  { id: "BK-1007", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", category: "Fantasy" },
  {
    id: "BK-1008",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    isbn: "9780747532743",
    category: "Fantasy",
  },
  {
    id: "BK-1009",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    category: "Fiction",
  },
  {
    id: "BK-1010",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "9780618640157",
    category: "Fantasy",
  },
]

export function BookBorrowing({ user, onBorrowBook, borrowedBooks }: BookBorrowingProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [dueDate, setDueDate] = useState<string>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 14) // Default due date is 2 weeks from now
    return date.toISOString().split("T")[0]
  })

  // Filter books based on search query
  const filteredBooks = BOOKS_DATABASE.filter((book) => {
    if (!searchQuery) return false

    const query = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query) ||
      book.id.toLowerCase().includes(query)
    )
  })

  // Check if a book is already borrowed
  const isBookBorrowed = (bookId: string) => {
    return borrowedBooks.some((book) => book.id === bookId)
  }

  const handleBorrowBook = () => {
    if (!selectedBook) return

    // Check if user has reached the maximum number of books (e.g., 5)
    if (borrowedBooks.length >= 5) {
      toast({
        title: "Borrowing Limit Reached",
        description: `${user.name} has reached the maximum number of books allowed (5)`,
        variant: "destructive",
      })
      return
    }

    onBorrowBook({
      ...selectedBook,
      dueDate,
    })

    // Reset selection
    setSelectedBook(null)
    setSearchQuery("")
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Borrow a Book</CardTitle>
          <CardDescription>Search and borrow books for {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">
                Currently borrowed: {borrowedBooks.length} {borrowedBooks.length === 1 ? "book" : "books"}
              </p>
            </div>
            <Badge variant="outline" className="ml-auto">
              {user.id}
            </Badge>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="book-search">Search for a Book</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="book-search"
                  type="search"
                  placeholder="Search by title, author, or ISBN..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSelectedBook(null)
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Enter at least 3 characters to search</p>
            </div>

            {searchQuery.length >= 3 && (
              <div className="border rounded-md">
                {filteredBooks.length > 0 ? (
                  <div className="divide-y">
                    {filteredBooks.map((book) => {
                      const borrowed = isBookBorrowed(book.id)

                      return (
                        <div
                          key={book.id}
                          className={`p-3 flex items-center gap-3 ${
                            selectedBook?.id === book.id ? "bg-muted" : ""
                          } ${borrowed ? "opacity-50" : "cursor-pointer hover:bg-muted/50"}`}
                          onClick={() => {
                            if (!borrowed) setSelectedBook(book)
                          }}
                        >
                          <Book className="h-5 w-5 text-primary flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{book.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                          </div>
                          {selectedBook?.id === book.id ? (
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : borrowed ? (
                            <Badge variant="outline">Already Borrowed</Badge>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No books found matching your search</p>
                  </div>
                )}
              </div>
            )}

            {selectedBook && (
              <div className="space-y-4 border rounded-md p-4 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Selected Book</h3>
                  <Badge variant="outline">{selectedBook.id}</Badge>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">{selectedBook.title}</p>
                  <p className="text-sm text-muted-foreground">By {selectedBook.author}</p>
                  <p className="text-sm text-muted-foreground">ISBN: {selectedBook.isbn}</p>
                  <p className="text-sm text-muted-foreground">Category: {selectedBook.category}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBorrowBook} disabled={!selectedBook} className="w-full">
            Borrow Book
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currently Borrowed</CardTitle>
          <CardDescription>Books currently borrowed by {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {borrowedBooks.length > 0 ? (
            <div className="space-y-4">
              {borrowedBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{book.title}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={new Date(book.dueDate) < new Date() ? "destructive" : "outline"}>
                    {new Date(book.dueDate) < new Date() ? "Overdue" : "On time"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">No Borrowed Books</h3>
              <p className="text-sm text-muted-foreground">This user has no books currently borrowed</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
