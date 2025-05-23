"use client"

import { useEffect, useState } from "react"
import { Link, Search, User } from "lucide-react"
import { ContactIcon as ContactlessIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { io } from "socket.io-client"
import { gql, useQuery } from "@apollo/client"

interface CardAssignmentProps {
  users: any[]
  unassignedCards: any[]
  onAssign: (userId: string, cardId: string) => void
}

const CHECK_CARD = gql`query checkCard($nfcId: Text!) {
  card: nfcCardsByNfcId(nfcId: $nfcId){
    totalAssigned:assignedCardsAggregate {
      count: _count
    }
  }
}`

// Mock database of all cards in the system
const ALL_CARDS = [
  { id: "CARD-1001", status: "assigned", userId: "ADM-1001" },
  { id: "CARD-1002", status: "assigned", userId: "SEC-1001" },
  { id: "CARD-1003", status: "assigned", userId: "DOR-1001" },
  { id: "CARD-2001", status: "unassigned", userId: null },
  { id: "CARD-2002", status: "unassigned", userId: null },
  { id: "CARD-2003", status: "unassigned", userId: null },
  { id: "CARD-3001", status: "inactive", userId: null },
]

export function CardAssignment({ users, unassignedCards, onAssign }: CardAssignmentProps) {
  const { toast } = useToast()
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)
  const [isWsConnected, setIsWsConnected] = useState(false)
  const [nfcId, setNfcId] = useState<string | null>(null)
  const {data: nfcData, refetch: refetchNfcData} = useQuery(CHECK_CARD, {variables: {nfcId: nfcId, skip: !nfcId}})

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!userSearchQuery) return true
    const query = userSearchQuery.toLowerCase()
    return (
      user.name.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    )
  })

  const checkCard = async(nfcId: string) => {
    const {data, error} = await refetchNfcData({nfcId: nfcId})
    if(data.card.totalAssigned.count == 0) {
      setSelectedCard(nfcId)
      setIsScanning(false)
    } else {
        setCardError("This card is already assigned to another user.")
        toast({
          title: "Card Inactive",
          description: "This card is inactive and cannot be assigned.",
          variant: "destructive",
        })
    }
  }

  useEffect(() => {
    // Connecting to the websocket
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001";
    console.log("Attempting to connect to WebSocket URL:", wsUrl); // <-- Add this log
    
    if (!wsUrl) {
      console.error("WebSocket URL is not defined!");
      return;
    }
    
    const socket = io(wsUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setIsWsConnected(true);
      toast({
        title: "Websocket",
        description: `Connected to websocket.`,
      })
    });

    socket.on("disconnect", () => {
      setIsWsConnected(false);
      toast({
        title: "Websocket",
        description: "Disconnected from websocket.",
        variant: "destructive",
      })
    });

    socket.on("admin_card_registration", (nfc_id: string) => {
      setIsScanning(true)
      setCardError(null)
      checkCard(nfc_id)
      toast({
        title: "Websocket",
        description: `Nfc card with ID: ${nfc_id}!!`,
      })
    });

    return () => {
      socket.disconnect();
    }
  }, [])

  const handleScanCard = () => {
    setIsScanning(true)
    setCardError(null)

    // Simulate scanning process
    setTimeout(() => {
      // Randomly select a card from ALL_CARDS to simulate scanning
      const randomIndex = Math.floor(Math.random() * ALL_CARDS.length)
      const scannedCard = ALL_CARDS[randomIndex]
      setSelectedCard(scannedCard.id)
      setIsScanning(false)

      // Check if card is registered
      if (scannedCard.status === "inactive") {
        setCardError("This card is inactive and cannot be assigned.")
        toast({
          title: "Card Inactive",
          description: "This card is inactive and cannot be assigned.",
          variant: "destructive",
        })
        return
      }

      // Check if card is already assigned
      if (scannedCard.status === "assigned") {
        const assignedUser = users.find((u) => u.id === scannedCard.userId)
        setCardError(`This card is already assigned to ${assignedUser ? assignedUser.name : "another user"}.`)
        toast({
          title: "Card Already Assigned",
          description: `This card is already assigned to ${assignedUser ? assignedUser.name : "another user"}.`,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Card Scanned",
        description: `NFC Card ${scannedCard.id} detected and ready for assignment`,
      })
    }, 2000)
  }

  const handleAssignCard = async () => {
    if (!selectedUser || !selectedCard) {
      toast({
        title: "Selection Required",
        description: "Please select a user and scan an NFC card",
        variant: "destructive",
      })
      return
    }

    if (cardError) {
      toast({
        title: "Cannot Assign Card",
        description: cardError,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Assign card to user
      onAssign(selectedUser, selectedCard)

      toast({
        title: "Card Assigned Successfully",
        description: `Card ${selectedCard} has been assigned to the selected user.`,
      })

      // Reset selections
      setSelectedUser(null)
      setSelectedCard(null)
      setCardError(null)
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Failed to assign card to user",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Select User</CardTitle>
          <CardDescription>Choose a user to assign an NFC card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-search">Search Users</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="user-search"
                type="search"
                placeholder="Search by name, ID, or department..."
                className="pl-8"
                value={userSearchQuery}
                onChange={(e) => {
                  setUserSearchQuery(e.target.value)
                  setSelectedUser(null)
                }}
              />
            </div>
          </div>

          <div className="border rounded-md">
            {filteredUsers.length > 0 ? (
              <RadioGroup value={selectedUser || ""} onValueChange={setSelectedUser}>
                <div className="max-h-[300px] overflow-auto">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2 p-3 border-b last:border-0">
                      <RadioGroupItem value={user.id} id={`user-${user.id}`} />
                      <Label htmlFor={`user-${user.id}`} className="flex items-center gap-3 cursor-pointer flex-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Badge variant="outline">{user.role}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="p-4 text-center">
                <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {users.length === 0 ? "No users available" : "No users match your search"}
                </p>
              </div>
            )}
          </div>

          {selectedUser && (
            <div className="p-3 border rounded-md bg-muted/50">
              <p className="text-sm font-medium">Selected User:</p>
              <p className="text-sm">
                {filteredUsers.find((user) => user.id === selectedUser)?.name} (
                {filteredUsers.find((user) => user.id === selectedUser)?.id})
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scan NFC Card</CardTitle>
          <CardDescription>Scan an NFC card to assign to the selected user</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Scan NFC Card to Assign</Label>
              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 bg-primary/10 rounded-full ${isScanning ? "animate-ping" : ""}`}
                    ></div>
                    <div
                      className={`absolute inset-2 bg-primary/20 rounded-full ${isScanning ? "animate-pulse" : ""}`}
                    ></div>
                    <ContactlessIcon className="w-12 h-12 text-primary relative z-10" />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleScanCard}
                    disabled={isScanning || isLoading}
                  >
                    {isScanning ? "Scanning..." : "Simulate Card Scan"}
                  </Button>
                  {selectedCard && !cardError && (
                    <div className="text-center mt-2">
                      <span className="text-sm text-muted-foreground">Card detected:</span>
                      <span className="ml-2 font-medium">{selectedCard}</span>
                    </div>
                  )}
                  {cardError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{cardError}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              onClick={handleAssignCard}
              disabled={!selectedUser || !selectedCard || !!cardError || isLoading}
              className="w-full"
            >
              {isLoading ? (
                "Assigning..."
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" /> Assign Card to User
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
