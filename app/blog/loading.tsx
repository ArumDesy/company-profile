import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-9 w-3/4 md:h-12" />
          <Skeleton className="mt-4 h-5 w-[52ch] max-w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-lg border border-border p-5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-28" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
