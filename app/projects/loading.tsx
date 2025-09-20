import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Search Section Skeleton */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center space-y-3">
                <Skeleton className="w-16 h-16 rounded-xl mx-auto" />
                <Skeleton className="h-10 w-20 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Skeleton */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-8 w-60 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>

          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="flex items-center gap-6">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-12 w-48" />
                  </div>
                  <Skeleton className="h-[400px] lg:h-[500px] w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
            <Skeleton className="h-4 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-9" />
              ))}
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
