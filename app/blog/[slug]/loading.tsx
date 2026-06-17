import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-20">
      <div className="mb-8">
        <Skeleton className="mb-6 h-4 w-32" />
        <Skeleton className="mb-3 h-3 w-28" />
        <Skeleton className="h-8 w-full md:h-11" />
        <Skeleton className="mt-2 h-8 w-4/5 md:h-11" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-1.5 h-4 w-3/4" />
      </div>

      <Skeleton className="mb-8 h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-6 h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  )
}
