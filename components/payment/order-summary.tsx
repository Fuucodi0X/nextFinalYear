"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderSummaryProps {
  items: Array<{ id: string; name: string; price: number; quantity: number }>
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export function OrderSummary({ items, onUpdateQuantity, onRemoveItem }: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-center text-muted-foreground">
        No items in order. Add products from the left panel.
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-md border p-3">
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
              </Button>

              <span className="w-8 text-center">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>

            <div className="ml-4 w-20 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
