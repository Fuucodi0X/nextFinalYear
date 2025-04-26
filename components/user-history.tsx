"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, Clock, Filter, LogIn, LogOut, Package, Search, Shield } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserHistoryProps {
  user: {
    id: string
    name: string
    photo: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Generate mock history data
const generateHistoryData = (userId: string) => {
  const now = new Date()
  const history = []

  // Generate 20 history entries spanning the last 30 days
  for (let i = 0; i < 20; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    date.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60))

    const isEntry = i % 2 === 0
    const gate = `Gate ${Math.floor(Math.random() * 3) + 1}`

    // Generate random items for some entries
    const hasItems = Math.random() > 0.3
    const items = hasItems
      ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, idx) => ({
          id: `item-${date.getTime()}-${idx}`,
          name: ["Laptop", "Backpack", "ID Card", "Tablet", "Toolbox", "Documents"][Math.floor(Math.random() * 6)],
          category: ["Electronics", "Personal", "Equipment", "Documents"][Math.floor(Math.random() * 4)],
        }))
      : []

    history.push({
      id: `scan-${date.getTime()}`,
      timestamp: date.toISOString(),
      type: isEntry ? "entry" : "exit",
      gate,
      items,
      verified: true,
    })
  }

  // Sort by timestamp descending (newest first)
  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function UserHistory({ user, open, onOpenChange }: UserHistoryProps) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [historyData] = useState(() => generateHistoryData(user.id))

  const filteredHistory = historyData.filter((entry) => {
    // Apply type filter
    if (filter !== "all" && entry.type !== filter) return false

    // Apply search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const dateStr = new Date(entry.timestamp).toLocaleDateString()
      const timeStr = new Date(entry.timestamp).toLocaleTimeString()

      // Search in date, time, gate, or items
      return (
        dateStr.toLowerCase().includes(searchLower) ||
        timeStr.toLowerCase().includes(searchLower) ||
        entry.gate.toLowerCase().includes(searchLower) ||
        entry.items.some(
          (item) => item.name.toLowerCase().includes(searchLower) || item.category.toLowerCase().includes(searchLower),
        )
      )
    }

    return true
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Access History</DialogTitle>
          <DialogDescription>View entry and exit history for {user.name}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
          <Badge variant="outline" className="ml-auto">
            {user.id}
          </Badge>
        </div>

        <Tabs defaultValue="timeline" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-[180px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search history..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activity</SelectItem>
                  <SelectItem value="entry">Entry Only</SelectItem>
                  <SelectItem value="exit">Exit Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="timeline" className="mt-0">
            <ScrollArea className="h-[400px] pr-4">
              <div className="relative ml-4 pl-6 border-l-2 border-muted">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((entry) => (
                    <div key={entry.id} className="mb-6 relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[25px] p-1 rounded-full bg-background border-2 border-primary">
                        {entry.type === "entry" ? (
                          <LogIn className="h-3 w-3 text-primary" />
                        ) : (
                          <LogOut className="h-3 w-3 text-primary" />
                        )}
                      </div>

                      <div className="bg-muted/40 rounded-lg p-3 border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={entry.type === "entry" ? "default" : "secondary"}>
                              {entry.type === "entry" ? "ENTRY" : "EXIT"}
                            </Badge>
                            <span className="text-sm font-medium">{entry.gate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                            <Clock className="h-3.5 w-3.5 ml-2" />
                            <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        {entry.items.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-muted-foreground mb-1 flex items-center">
                              <Package className="h-3 w-3 mr-1" />
                              {entry.type === "entry" ? "Items Brought In:" : "Items Taken Out:"}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {entry.items.map((item) => (
                                <Badge key={item.id} variant="outline" className="text-xs">
                                  {item.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Shield className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No history records match your search</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr_120px_120px_auto] gap-2 p-3 font-medium border-b text-sm">
                <div className="flex items-center gap-1 cursor-pointer">
                  Date & Time <ArrowUpDown className="h-3 w-3" />
                </div>
                <div>Type</div>
                <div>Location</div>
                <div>Items</div>
              </div>

              <ScrollArea className="h-[370px]">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="grid grid-cols-[1fr_120px_120px_auto] gap-2 p-3 text-sm border-b last:border-0"
                    >
                      <div className="text-sm">
                        <div>{new Date(entry.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div>
                        <Badge variant={entry.type === "entry" ? "default" : "secondary"}>
                          {entry.type === "entry" ? "ENTRY" : "EXIT"}
                        </Badge>
                      </div>
                      <div>{entry.gate}</div>
                      <div>
                        {entry.items.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {entry.items.map((item) => (
                              <Badge key={item.id} variant="outline" className="text-xs">
                                {item.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No items</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Shield className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No history records match your search</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Export History</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
