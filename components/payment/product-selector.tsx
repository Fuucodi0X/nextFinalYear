"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample products by category
const productsByCategory = {
  cafe: [
    { id: "cafe-1", name: "Coffee", price: 2.5 },
    { id: "cafe-2", name: "Latte", price: 3.75 },
    { id: "cafe-3", name: "Cappuccino", price: 4.0 },
    { id: "cafe-4", name: "Espresso", price: 2.25 },
    { id: "cafe-5", name: "Tea", price: 2.0 },
    { id: "cafe-6", name: "Hot Chocolate", price: 3.5 },
    { id: "cafe-7", name: "Pastry", price: 2.75 },
  ],
  library: [
    { id: "lib-1", name: "Late Fee", price: 5.0 },
    { id: "lib-2", name: "Printing (B&W)", price: 0.1 },
    { id: "lib-3", name: "Printing (Color)", price: 0.5 },
    { id: "lib-4", name: "Book Replacement", price: 25.0 },
    { id: "lib-5", name: "Study Room Rental", price: 10.0 },
  ],
  dormitory: [
    { id: "dorm-1", name: "Laundry", price: 3.0 },
    { id: "dorm-2", name: "Room Cleaning", price: 15.0 },
    { id: "dorm-3", name: "Key Replacement", price: 20.0 },
    { id: "dorm-4", name: "Maintenance", price: 25.0 },
  ],
  cafeteria: [
    { id: "food-1", name: "Breakfast", price: 6.5 },
    { id: "food-2", name: "Lunch", price: 8.75 },
    { id: "food-3", name: "Dinner", price: 9.5 },
    { id: "food-4", name: "Snack", price: 3.25 },
    { id: "food-5", name: "Salad", price: 5.5 },
    { id: "food-6", name: "Sandwich", price: 6.0 },
    { id: "food-7", name: "Soup", price: 4.5 },
  ],
  store: [
    { id: "store-1", name: "Notebook", price: 3.5 },
    { id: "store-2", name: "Pen Pack", price: 4.25 },
    { id: "store-3", name: "USB Drive", price: 12.99 },
    { id: "store-4", name: "Backpack", price: 35.0 },
    { id: "store-5", name: "T-Shirt", price: 15.0 },
    { id: "store-6", name: "Water Bottle", price: 8.5 },
  ],
}

interface ProductSelectorProps {
  category: string
  onAddItem: (item: { id: string; name: string; price: number }) => void
}

export function ProductSelector({ category, onAddItem }: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const products = productsByCategory[category as keyof typeof productsByCategory] || []

  const filteredProducts = searchQuery
    ? products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-2">
        <div className="grid grid-cols-1 gap-2">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between rounded-md border p-3 hover:bg-muted">
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
              </div>
              <Button size="sm" onClick={() => onAddItem(product)}>
                Add
              </Button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="flex h-32 items-center justify-center text-center text-muted-foreground">
              No products found. Try a different search term or category.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
