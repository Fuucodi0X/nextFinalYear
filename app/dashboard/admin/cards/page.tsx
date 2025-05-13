"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Search, Filter, CreditCard, Home, Users, Settings, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ContactIcon as ContactlessIcon } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { io, Socket } from "socket.io-client";
import { gql, useMutation } from "@apollo/client"

// Initial card data
const initialCards = [
  { id: "CARD-1001", status: "Assigned", assignedTo: "Admin User", department: "IT", lastUsed: "2023-05-10 09:15" },
  {
    id: "CARD-1002",
    status: "Assigned",
    assignedTo: "Security Officer",
    department: "Security",
    lastUsed: "2023-05-10 08:30",
  },
  {
    id: "CARD-1003",
    status: "Assigned",
    assignedTo: "Dormitory Manager",
    department: "Housing",
    lastUsed: "2023-05-09 17:45",
  },
  { id: "CARD-2001", status: "Unassigned", assignedTo: "-", department: "-", lastUsed: "-" },
  { id: "CARD-2002", status: "Unassigned", assignedTo: "-", department: "-", lastUsed: "-" },
  { id: "CARD-2003", status: "Unassigned", assignedTo: "-", department: "-", lastUsed: "-" },
  { id: "CARD-3001", status: "Inactive", assignedTo: "-", department: "-", lastUsed: "2023-04-15 14:20" },
]

const navItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: Home },
  // { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
]

// Queries and Mutations
// const ADD_NFC = gql`
//   mutation AddNfc($nfc_id: String!) {
//     addNfc(nfc_id: $nfc_id){
//       affected_rows
//     }
//   }
// `;

export default function CardsPage() {
  const { toast } = useToast()
  const [cards, setCards] = useState(initialCards)
  const [searchQuery, setSearchQuery] = useState("")
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCardId, setScannedCardId] = useState<string>("")
  const [cardError, setCardError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isWsConnected, setIsWsConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  // const [addCard, { data, loading, error}] = useMutation(ADD_NFC)

  // Filter cards based on search query
  const filteredCards = cards.filter((card) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      card.id.toLowerCase().includes(query) ||
      card.status.toLowerCase().includes(query) ||
      card.assignedTo.toLowerCase().includes(query) ||
      card.department.toLowerCase().includes(query)
    )
  })

  // Count cards by status
  const totalCards = cards.length
  const assignedCards = cards.filter((card) => card.status === "Assigned").length
  const unassignedCards = cards.filter((card) => card.status === "Unassigned").length
  const inactiveCards = cards.filter((card) => card.status === "Inactive").length

  const registerNfcCard = () => {
    // addCard({ variables: { type: scannedCardId } }).then(() => {
    //   if (!error) {
    //     setCardError("Error while registering card")
    //   }
    // })
  }
  
  const handleScanCard = () => {
    setIsScanning(true)
    setCardError(null)
    setScannedCardId("")

    // Simulate scanning process
    setTimeout(() => {
      // Generate a random card ID
      const newCardId = `CARD-${Math.floor(4000 + Math.random() * 1000)}`

      // Randomly decide if the card is already registered (for demo purposes)
      const isAlreadyRegistered = Math.random() > 0.7

      if (isAlreadyRegistered) {
        // Simulate finding an existing card
        const existingCardId = cards[Math.floor(Math.random() * cards.length)].id
        setScannedCardId(existingCardId)
        setCardError(`Card ${existingCardId} is already registered in the system.`)
        toast({
          title: "Card Already Registered",
          description: `Card ${existingCardId} is already registered in the system.`,
          variant: "destructive",
        })
      } else {
        // New card detected
        setScannedCardId(newCardId)
        toast({
          title: "Card Detected",
          description: `New card ${newCardId} detected and ready for registration.`,
        })
      }

      setIsScanning(false)
    }, 2000)
  }
  
  const handleRegisterCard = async () => {
    if (!scannedCardId || cardError) {
      return
    }

    setIsRegistering(true)

    try {
      // Simulate API delay
      registerNfcCard()

      // Add the new card to the list
      const newCard = {
        id: scannedCardId,
        status: "Unassigned",
        assignedTo: "-",
        department: "-",
        lastUsed: "-",
      }

      setCards([...cards, newCard])

      toast({
        title: "Card Registered Successfully",
        description: `Card ${scannedCardId} has been registered in the system.`,
      })

      // Close dialog and reset state
      setIsRegisterDialogOpen(false)
      setScannedCardId("")
      setCardError(null)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register the card.",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }
  
  const connectWebsocket = () => {
    // Connecting to the websocket
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_UR || "http://localhost:3001";
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
      console.log("Connected to websocket");
    });

    socket.on("disconnect", () => {
      setIsWsConnected(false);
      console.log("Disconnected from websocket");
    });

    socket.on("admin_card_registration", (nfc_id: string) => {
      setScannedCardId(nfc_id)
      console.log(`Nfc card with ID: ${nfc_id}!!`)
    });

    setSocket(socket)
  }

  const closeWebsocket = (socket: Socket | undefined) => {
    if (socket) socket.disconnect()
  }

  const handelRegisterCardScanner = (isOpen: boolean) => {
    setIsRegisterDialogOpen(isOpen)
    isOpen ? connectWebsocket() : closeWebsocket(socket)
  }

  return (
    <DashboardLayout navItems={navItems} title="Cards" icon={CreditCard} showBackButton={true}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Cards Management</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isRegisterDialogOpen} onOpenChange={handelRegisterCardScanner}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Register Cards
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register New NFC Card</DialogTitle>
                  <DialogDescription>Scan a new NFC card to register it in the system.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Scan NFC Card</Label>
                    <div className="border rounded-md p-6 bg-muted/20">
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
                        disabled={isScanning || isRegistering}
                      >
                        {isScanning ? "Scanning..." : "Simulate Card Scan"}
                      </Button>
                        {scannedCardId && !cardError && (
                          <div className="text-center mt-2">
                            <span className="text-sm text-muted-foreground">New card detected:</span>
                            <span className="ml-2 font-medium">{scannedCardId}</span>
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

                <DialogFooter>
                  <Button variant="outline" onClick={() => {setIsRegisterDialogOpen(false); closeWebsocket(socket);}}>
                    Cancel
                  </Button>
                  <Button onClick={handleRegisterCard} disabled={!scannedCardId || !!cardError || isRegistering}>
                    {isRegistering ? "Registering..." : "Register Card"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all">All Cards</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cards..."
                  className="w-[200px] pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCards}</div>
                  <p className="text-xs text-muted-foreground">All cards in the system</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assigned Cards</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignedCards}</div>
                  <p className="text-xs text-muted-foreground">
                    {((assignedCards / totalCards) * 100).toFixed(1)}% of total cards
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unassigned Cards</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{unassignedCards}</div>
                  <p className="text-xs text-muted-foreground">
                    {((unassignedCards / totalCards) * 100).toFixed(1)}% of total cards
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Cards</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inactiveCards}</div>
                  <p className="text-xs text-muted-foreground">
                    {((inactiveCards / totalCards) * 100).toFixed(1)}% of total cards
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Cards</CardTitle>
                <CardDescription>Manage all NFC cards in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell className="font-medium">{card.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              card.status === "Assigned"
                                ? "default"
                                : card.status === "Unassigned"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {card.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{card.assignedTo}</TableCell>
                        <TableCell>{card.department}</TableCell>
                        <TableCell>{card.lastUsed}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" disabled={card.status === "Inactive"}>
                            {card.status === "Assigned"
                              ? "Unassign"
                              : card.status === "Unassigned"
                                ? "Assign"
                                : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Cards</CardTitle>
                <CardDescription>Cards that are assigned to users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.status === "Assigned")
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell className="font-medium">{card.id}</TableCell>
                          <TableCell>
                            <Badge variant="default">{card.status}</Badge>
                          </TableCell>
                          <TableCell>{card.assignedTo}</TableCell>
                          <TableCell>{card.department}</TableCell>
                          <TableCell>{card.lastUsed}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Unassign
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="unassigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Cards</CardTitle>
                <CardDescription>Cards that are not yet assigned to any user</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.status === "Unassigned")
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell className="font-medium">{card.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{card.status}</Badge>
                          </TableCell>
                          <TableCell>{card.assignedTo}</TableCell>
                          <TableCell>{card.department}</TableCell>
                          <TableCell>{card.lastUsed}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Assign
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Cards</CardTitle>
                <CardDescription>Cards that have been deactivated</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.status === "Inactive")
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell className="font-medium">{card.id}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{card.status}</Badge>
                          </TableCell>
                          <TableCell>{card.assignedTo}</TableCell>
                          <TableCell>{card.department}</TableCell>
                          <TableCell>{card.lastUsed}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Activate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
