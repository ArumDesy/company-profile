import { Skeleton } from "@/components/ui/skeleton"

export default function PostEditorLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-8 h-8 w-52" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-[320px] w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  )
}
