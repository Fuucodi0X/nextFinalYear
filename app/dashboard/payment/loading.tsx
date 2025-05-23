"use client"

import { DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentDashboardLoading() {
  const navItems = [
    { href: "/dashboard/payment", label: "Dashboard", icon: DollarSign },
    { href: "/dashboard/payment/history", label: "Payment History", icon: DollarSign },
    { href: "/dashboard/payment/products", label: "Products", icon: DollarSign },
    { href: "/dashboard/payment/settings", label: "Settings", icon: DollarSign },
  ]

  return (
    <DashboardLayout navItems={navItems} title="Payment Dashboard" icon={DollarSign}>
      <div className="space-y-4">
        <Tabs defaultValue="new-order" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new-order">New Order</TabsTrigger>
            <TabsTrigger value="recent-transactions">Recent Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="new-order" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-32" />
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
