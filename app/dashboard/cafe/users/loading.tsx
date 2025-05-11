import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[300px]" />
          <div className="flex-1"></div>
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-5 w-[100px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-[70px] mb-1" />
                  <Skeleton className="h-4 w-[120px]" />
                </CardContent>
              </Card>
            ))}
        </div>
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
                <Skeleton className="h-8 w-[200px]" />
              </div>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-[50px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[200px]" />
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[80px]" />
                    <Skeleton className="h-5 w-[80px]" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
