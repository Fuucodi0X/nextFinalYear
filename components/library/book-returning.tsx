"use client"

import { useState } from "react"
import { Book, BookOpen, Calendar, Check, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface BookReturningProps {
  user: {
    id: string
    name: string
    photo: string
  }
  borrowedBooks: any[]
  onReturnBook: (bookId: string) => void
}

export function BookReturning({ user, borrowedBooks, onReturnBook }: BookReturningProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [condition, setCondition] = useState<"good" | "damaged" | "lost">("good")
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Filter books based on search query
  const filteredBooks = borrowedBooks.filter((book) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return book.title.toLowerCase().includes(query) || book.id.toLowerCase().includes(query)
  })

  const handleReturnBook = () => {
    if (!selectedBook) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      if (condition === "damaged") {
        toast({
          title: "Book Returned with Damage",
          description: `${selectedBook.title} has been returned with damage noted`,
          variant: "destructive",
        })
      } else if (condition === "lost") {
        toast({
          title: "Book Marked as Lost",
          description: `${selectedBook.title} has been marked as lost`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Book Returned",
          description: `${selectedBook.title} has been successfully returned`,
        })
      }

      onReturnBook(selectedBook.id)
      setSelectedBook(null)
      setCondition("good")
      setNotes("")
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Return a Book</CardTitle>
          <CardDescription>Process book returns for {user.name}</CardDescription>
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

          {borrowedBooks.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book-search">Search Borrowed Books</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="book-search"
                    type="search"
                    placeholder="Search by title or book ID..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSelectedBook(null)
                    }}
                  />
                </div>
              </div>

              <div className="border rounded-md">
                {filteredBooks.length > 0 ? (
                  <div className="divide-y">
                    {filteredBooks.map((book) => (
                      <div
                        key={book.id}
                        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 ${
                          selectedBook?.id === book.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedBook(book)}
                      >
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{book.title}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {selectedBook?.id === book.id && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No books found matching your search</p>
                  </div>
                )}
              </div>

              {selectedBook && (
                <div className="space-y-4 border rounded-md p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Selected Book</h3>
                    <Badge variant={new Date(selectedBook.dueDate) < new Date() ? "destructive" : "outline"}>
                      {new Date(selectedBook.dueDate) < new Date() ? "Overdue" : "On time"}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">{selectedBook.title}</p>
                    <p className="text-sm text-muted-foreground">ID: {selectedBook.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Borrowed: {new Date(selectedBook.borrowDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(selectedBook.dueDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Book Condition</Label>
                    <RadioGroup value={condition} onValueChange={(value: any) => setCondition(value)}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="good" id="good" />
                          <Label htmlFor="good" className="font-normal">
                            Good condition
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="damaged" id="damaged" />
                          <Label htmlFor="damaged" className="font-normal">
                            Damaged
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lost" id="lost" />
                          <Label htmlFor="lost" className="font-normal">
                            Lost
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about the book condition..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">No Borrowed Books</h3>
              <p className="text-sm text-muted-foreground">This user has no books to return</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleReturnBook}
            disabled={!selectedBook || isProcessing || borrowedBooks.length === 0}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Return Book"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Return History</CardTitle>
          <CardDescription>Recent book returns for {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
            <Book className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">No Recent Returns</h3>
            <p className="text-sm text-muted-foreground">This user has no recent book returns</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
