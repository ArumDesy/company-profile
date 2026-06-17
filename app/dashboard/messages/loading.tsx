import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-6 h-8 w-44" />
      <Skeleton className="mb-5 h-9 w-full max-w-sm" />
      <div className="flex flex-col divide-y divide-border border border-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-14" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
