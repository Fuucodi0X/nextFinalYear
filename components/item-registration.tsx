"use client"
import { Package, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface ItemRegistrationProps {
  onItemRegistered: (item: any) => void
  registeredItems: any[]
}

export function ItemRegistration({ onItemRegistered, registeredItems }: ItemRegistrationProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      serialNumber: "",
    },
  })

  const onSubmit = (data: any) => {
    onItemRegistered(data)
    form.reset()
  }

  const itemCategories = ["Electronics", "Personal", "Equipment", "Documents", "Tools", "Other"]

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Laptop, Backpack, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itemCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the item" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number (if applicable)</FormLabel>
                <FormControl>
                  <Input placeholder="Serial number or identifying information" {...field} />
                </FormControl>
                <FormDescription>Optional for items without serial numbers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Register Item
          </Button>
        </form>
      </Form>

      {registeredItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Registered Items ({registeredItems.length})</h3>
          <ScrollArea className="h-[200px] rounded-md border">
            <div className="p-4 space-y-4">
              {registeredItems.map((item, index) => (
                <div key={item.id || index}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Package className="h-5 w-5 mt-0.5 text-primary" />
                      <div>
                        <div className="font-medium flex items-center">
                          {item.name}
                          <Badge variant="outline" className="ml-2">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        {item.serialNumber && <p className="text-xs text-muted-foreground">S/N: {item.serialNumber}</p>}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                  {index < registeredItems.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
