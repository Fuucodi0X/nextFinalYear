"use client"

import { useState } from "react"
import { DollarSign, Receipt, Package, Shield, Search, Plus, Edit, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample products by category
const initialProducts = {
  store: [
    { id: "store-1", name: "Notebook", price: 3.5 },
    { id: "store-2", name: "Pen Pack", price: 4.25 },
    { id: "store-3", name: "USB Drive", price: 12.99 },
    { id: "store-4", name: "Backpack", price: 35.0 },
    { id: "store-5", name: "T-Shirt", price: 15.0 },
    { id: "store-6", name: "Water Bottle", price: 8.5 },
  ],
}

// Categories with icons
const categories = [
  { id: "store", name: "Campus Store" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [activeCategory, setActiveCategory] = useState("store")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "store" })
  const [editingProduct, setEditingProduct] = useState<{
    id: string
    name: string
    price: number
    category: string
  } | null>(null)

  const navItems = [
    { href: "/dashboard/payment", label: "Dashboard", icon: DollarSign },
    { href: "/dashboard/payment/history", label: "Payment History", icon: Receipt },
    { href: "/dashboard/payment/products", label: "Products", icon: Package },
  ]

  const filteredProducts = searchQuery
    ? Object.values(products)
        .flat()
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products[activeCategory as keyof typeof products] || []

  const handleAddProduct = () => {
    const price = Number.parseFloat(newProduct.price)
    if (!newProduct.name || isNaN(price) || price <= 0) return

    const category = newProduct.category as keyof typeof products
    const newId = `${category}-${Date.now()}`

    setProducts({
      ...products,
      [category]: [...products[category], { id: newId, name: newProduct.name, price }],
    })

    setNewProduct({ name: "", price: "", category: "store" })
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    if (!editingProduct) return

    const { id, name, price, category } = editingProduct
    if (!name || price <= 0) return

    setProducts({
      ...products,
      [category]: products[category as keyof typeof products].map((product) =>
        product.id === id ? { id, name, price } : product,
      ),
    })

    setEditingProduct(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteProduct = (id: string, category: string) => {
    setProducts({
      ...products,
      [category]: products[category as keyof typeof products].filter((product) => product.id !== id),
    })
  }

  const openEditDialog = (product: { id: string; name: string; price: number }, category: string) => {
    setEditingProduct({ ...product, category })
    setIsEditDialogOpen(true)
  }

  return (
    <DashboardLayout navItems={navItems} title="Products Management" icon={Package} showBackButton>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product or service to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update the product details.</DialogDescription>
              </DialogHeader>
              {editingProduct && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price ($)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditProduct}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products & Services</CardTitle>
            <CardDescription>Manage products and services available for purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={searchQuery ? "search-results" : activeCategory}
              onValueChange={(value) => {
                if (value !== "search-results") {
                  setActiveCategory(value)
                  setSearchQuery("")
                }
              }}
            >
              <TabsList className="mb-4">
                {!searchQuery &&
                  categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                {searchQuery && <TabsTrigger value="search-results">Search Results</TabsTrigger>}
              </TabsList>

              {!searchQuery &&
                categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 border-b p-3 font-medium">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-3">Price</div>
                        <div className="col-span-4 text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {products[category.id]?.map((product) => (
                          <div key={product.id} className="grid grid-cols-12 p-3">
                            <div className="col-span-5">{product.name}</div>
                            <div className="col-span-3">${product.price.toFixed(2)}</div>
                            <div className="col-span-4 flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(product, category.id)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteProduct(product.id, category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        ))}

                        {products[category.id]?.length === 0 && (
                          <div className="flex h-32 items-center justify-center text-center text-muted-foreground">
                            No products found in this category.
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                ))}

              {searchQuery && (
                <TabsContent value="search-results">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b p-3 font-medium">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-3">Category</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-3 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredProducts.map((product) => {
                        // Find which category this product belongs to
                        const category =
                          Object.entries(products).find(([_, products]) =>
                            products.some((p) => p.id === product.id),
                          )?.[0] || ""

                        const categoryName = categories.find((c) => c.id === category)?.name || category

                        return (
                          <div key={product.id} className="grid grid-cols-12 p-3">
                            <div className="col-span-4">{product.name}</div>
                            <div className="col-span-3">{categoryName}</div>
                            <div className="col-span-2">${product.price.toFixed(2)}</div>
                            <div className="col-span-3 flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(product, category)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteProduct(product.id, category)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        )
                      })}

                      {filteredProducts.length === 0 && (
                        <div className="flex h-32 items-center justify-center text-center text-muted-foreground">
                          No products found matching your search.
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
