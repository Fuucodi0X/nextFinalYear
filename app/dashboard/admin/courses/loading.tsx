import { CardFooter } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen } from "lucide-react"

// Navigation items for the admin dashboard
const navItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: BookOpen },
  { href: "/dashboard/admin/users", label: "Users", icon: BookOpen },
  { href: "/dashboard/admin/cards", label: "Cards", icon: BookOpen },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/admin/settings", label: "Settings", icon: BookOpen },
]

export default function CoursesLoading() {
  return (
    <DashboardLayout navItems={navItems} title="Course Management" icon={BookOpen} showBackButton>
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog" disabled>
            Course Catalog
          </TabsTrigger>
          <TabsTrigger value="registration" disabled>
            Course Registration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <Skeleton className="h-10 flex-1" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-[180px]" />
                  <Skeleton className="h-10 w-[180px]" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Skeleton className="h-5 w-40 mb-1" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2 grid grid-cols-2 gap-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <Skeleton className="h-1.5 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-48" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-10 w-32 mt-4" />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-40" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-56" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8">
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Skeleton className="h-3 w-full" />
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
