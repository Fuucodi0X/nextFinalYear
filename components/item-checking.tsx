"use client"

import { useState } from "react"
import { Check, CheckCircle2, Package, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ItemCheckingProps {
  items: any[]
  onItemChecked: (itemId: string, checked: boolean) => void
  onAllItemsChecked: () => void
}

export function ItemChecking({ items, onItemChecked, onAllItemsChecked }: ItemCheckingProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const allChecked = items.length > 0 && items.every((item) => item.checked)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {items.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Items to Verify ({items.length})</h3>
            <Button variant="outline" size="sm" onClick={onAllItemsChecked} disabled={allChecked}>
              <Check className="mr-2 h-4 w-4" />
              Verify All
            </Button>
          </div>

          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-4 space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn("rounded-lg p-3 transition-colors", item.checked ? "bg-muted/50" : "bg-background")}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.checked}
                        onCheckedChange={(checked) => onItemChecked(item.id, !!checked)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`item-${item.id}`}
                            className={cn(
                              "font-medium cursor-pointer flex items-center",
                              item.checked && "line-through text-muted-foreground",
                            )}
                          >
                            {item.name}
                            <Badge variant="outline" className="ml-2">
                              {item.category}
                            </Badge>
                          </label>
                          {item.checked && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        </div>
                        <p className={cn("text-sm text-muted-foreground", item.checked && "line-through")}>
                          {item.description}
                        </p>
                        {item.serialNumber && <p className="text-xs text-muted-foreground">S/N: {item.serialNumber}</p>}
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Package className="h-3 w-3" />
                          <span>Registered: {new Date(item.registeredAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {index < filteredItems.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <Package className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No items match your search</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex justify-end">
            <Button
              className="w-full"
              disabled={!allChecked}
              onClick={() => {
                // In a real app, you would submit the verification to a database
                // For now, we'll just show a success message via the onAllItemsChecked callback
                onAllItemsChecked()
              }}
            >
              Complete Verification
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] text-center border rounded-lg p-6">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium mb-1">No Items Registered</h3>
          <p className="text-sm text-muted-foreground">This person has no registered items to verify</p>
        </div>
      )}
    </div>
  )
}
