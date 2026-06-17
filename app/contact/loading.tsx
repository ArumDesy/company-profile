import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-4 h-10 w-72 max-w-full" />
          <Skeleton className="mt-4 h-4 w-full max-w-md" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-28 w-full" />
            </div>
            <Skeleton className="h-10 w-full sm:w-36" />
          </div>

          <div className="space-y-8">
            <Skeleton className="h-5 w-40" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
