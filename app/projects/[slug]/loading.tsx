import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Skeleton className="h-9 w-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
                
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-3/4" />
                
                <Skeleton className="h-6 w-48" />
              </div>

              <div className="flex items-center gap-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-40" />
              </div>

              <Skeleton className="h-24 w-full" />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>

            <div className="relative">
              <Skeleton className="aspect-[4/3] rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0 space-y-4">
                  <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                  <Skeleton className="h-8 w-20 mx-auto" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Section Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-8 w-48 mx-auto" />
          </div>

          <Card className="p-8 lg:p-12">
            <CardContent className="p-0 space-y-8">
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Projects Section Skeleton */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-48 mx-auto" />
            <Skeleton className="h-8 w-40 mx-auto" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-80 mx-auto bg-white/20" />
            <Skeleton className="h-8 w-64 mx-auto bg-white/20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
            <Skeleton className="h-5 w-80 mx-auto bg-white/20" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Skeleton className="h-12 w-48 bg-white/20" />
            <Skeleton className="h-12 w-40 bg-white/20" />
          </div>
        </div>
      </section>
    </div>
  )
}
