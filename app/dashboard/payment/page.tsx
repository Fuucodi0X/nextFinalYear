"use client"

import { useState } from "react"
import { Shield, CreditCard, DollarSign, Receipt, Package, Coffee, Book, Home, Utensils } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardScanner } from "@/components/card-scanner"
import { PaymentProcessor } from "@/components/payment/payment-processor"
import { ProductSelector } from "@/components/payment/product-selector"
import { OrderSummary } from "@/components/payment/order-summary"
import { PinInput } from "@/components/payment/pin-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample categories and products
const categories = [
  { id: "store", name: "Campus Store", icon: Package },
]

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState("new-order")
  const [orderItems, setOrderItems] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const [paymentStage, setPaymentStage] = useState<
    "creating" | "scanning" | "pin-confirmation" | "processing" | "complete" | "failed"
  >("creating")
  const [scannedCardId, setScannedCardId] = useState<string | null>(null)
  const [studentInfo, setStudentInfo] = useState<any>(null)
  const [enteredPin, setEnteredPin] = useState("")
  const [pinError, setPinError] = useState("")

  // Mock student data
  const students = {
    "CARD-1001": { id: 1001, name: "John Doe", balance: 250.0, photo: "/placeholder.svg?height=100&width=100" },
    "CARD-1002": { id: 1002, name: "Jane Smith", balance: 15.0, photo: "/placeholder.svg?height=100&width=100" },
    "CARD-1003": { id: 1003, name: "Alex Johnson", balance: 500.0, photo: "/placeholder.svg?height=100&width=100" },
    "CARD-1004": { id: 1004, name: "Maria Garcia", balance: 0.0, photo: "/placeholder.svg?height=100&width=100" },
    "CARD-1005": { id: 1005, name: "Sam Wilson", balance: 75.0, photo: "/placeholder.svg?height=100&width=100" },
  }

  const handleAddItem = (item: { id: string; name: string; price: number }) => {
    const existingItem = orderItems.find((i) => i.id === item.id)
    if (existingItem) {
      setOrderItems(orderItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId)
      return
    }
    setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleProceedToPayment = () => {
    setPaymentStage("scanning")
  }

  const handleCardScanned = (cardId: string) => {
    setScannedCardId(cardId)
    const student = students[cardId as keyof typeof students]
    setStudentInfo(student)

    if (student) {
      setPaymentStage("pin-confirmation")
    } else {
      setPaymentStage("failed")
    }
  }

  const handlePinConfirmation = (pin: string) => {
    setEnteredPin(pin)
    setPinError("")
    setPaymentStage("processing")

    // Simulate PIN verification and payment processing
    setTimeout(() => {
      // Mock PIN validation (in real app, this would be server-side)
      const correctPin = "1234" // Mock PIN for demo

      if (pin !== correctPin) {
        setPinError("Incorrect PIN. Please try again.")
        setPaymentStage("pin-confirmation")
        return
      }

      if (studentInfo && studentInfo.balance >= calculateTotal()) {
        setPaymentStage("complete")
      } else {
        setPaymentStage("failed")
      }
    }, 1500)
  }

  const handleNewOrder = () => {
    setOrderItems([])
    setPaymentStage("creating")
    setScannedCardId(null)
    setStudentInfo(null)
    setActiveTab("new-order")
  }

  const navItems = [
    { href: "/dashboard/payment", label: "Dashboard", icon: CreditCard },
    { href: "/dashboard/payment/history", label: "Payment History", icon: Receipt },
    { href: "/dashboard/payment/products", label: "Products", icon: Package },
  ]

  return (
    <DashboardLayout navItems={navItems} title="Payment Dashboard" icon={DollarSign}>
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="new-order">New Order</TabsTrigger>
            <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="new-order" className="space-y-4">
            {paymentStage === "creating" && (
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Select Products</CardTitle>
                    <CardDescription>Add items to the current order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="category">Category</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categories.map((category) => {
                          const Icon = category.icon
                          return (
                            <Button
                              key={category.id}
                              variant={selectedCategory === category.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedCategory(category.id)}
                              className="flex items-center gap-1"
                            >
                              <Icon className="h-4 w-4" />
                              {category.name}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    <ProductSelector category={selectedCategory} onAddItem={handleAddItem} />
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Review and process payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrderSummary
                      items={orderItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</div>
                    <Button onClick={handleProceedToPayment} disabled={orderItems.length === 0}>
                      Proceed to Payment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {(paymentStage === "scanning" || paymentStage === "processing") && (
              <Card>
                <CardHeader>
                  <CardTitle>Scan Student Card</CardTitle>
                  <CardDescription>
                    Please scan the student's card to process payment of ${calculateTotal().toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CardScanner onCardScanned={handleCardScanned} isLoading={paymentStage === "processing"} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setPaymentStage("creating")}>
                    Back to Order
                  </Button>
                </CardFooter>
              </Card>
            )}

            {paymentStage === "pin-confirmation" && (
              <Card>
                <CardHeader>
                  <CardTitle>Enter PIN</CardTitle>
                  <CardDescription>
                    Please enter your 4-digit PIN to confirm payment of ${calculateTotal().toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  {studentInfo && (
                    <div className="mb-6 flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={studentInfo.photo || "/placeholder.svg"} alt={studentInfo.name} />
                        <AvatarFallback>{studentInfo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{studentInfo.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {studentInfo.id}</p>
                        <p className="text-sm text-muted-foreground">Balance: ${studentInfo.balance.toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  <PinInput onPinComplete={handlePinConfirmation} error={pinError} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setPaymentStage("scanning")}>
                    Back to Scan
                  </Button>
                </CardFooter>
              </Card>
            )}

            {(paymentStage === "complete" || paymentStage === "failed") && (
              <PaymentProcessor
                status={paymentStage}
                studentInfo={studentInfo}
                total={calculateTotal()}
                items={orderItems}
                onNewOrder={handleNewOrder}
              />
            )}
          </TabsContent>

          <TabsContent value="recent-transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>View recent payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b p-3 font-medium">
                    <div>Transaction ID</div>
                    <div>Student</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 p-3">
                      <div className="font-mono text-sm">#TRX-2305</div>
                      <div>John Doe</div>
                      <div>{new Date().toLocaleDateString()}</div>
                      <div>$24.99</div>
                      <div className="text-green-600">Completed</div>
                    </div>
                    <div className="grid grid-cols-5 p-3">
                      <div className="font-mono text-sm">#TRX-2304</div>
                      <div>Maria Garcia</div>
                      <div>{new Date(Date.now() - 86400000).toLocaleDateString()}</div>
                      <div>$15.50</div>
                      <div className="text-red-600">Failed</div>
                    </div>
                    <div className="grid grid-cols-5 p-3">
                      <div className="font-mono text-sm">#TRX-2303</div>
                      <div>Alex Johnson</div>
                      <div>{new Date(Date.now() - 172800000).toLocaleDateString()}</div>
                      <div>$42.75</div>
                      <div className="text-green-600">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
