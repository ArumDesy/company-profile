import { Skeleton } from "@/components/ui/skeleton"

export default function PostsLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="flex flex-col divide-y divide-border border border-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
