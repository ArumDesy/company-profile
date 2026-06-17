import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-10 h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border bg-card p-5">
            <Skeleton className="mb-3 h-3 w-20" />
            <Skeleton className="mb-1 h-9 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  )
}
