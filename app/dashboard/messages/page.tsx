import type { Metadata } from "next"
import { Suspense } from "react"

import { getMessages } from "@/lib/messages"
import { SearchBar } from "@/components/dashboard/search-bar"
import { MessageList } from "@/components/dashboard/message-list"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Pesan",
}

function MessageListSkeleton() {
  return (
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
  )
}

async function MessageResults({ q }: { q?: string }) {
  const messages = await getMessages(q)

  return (
    <>
      {q && (
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          Hasil untuk:{" "}
          <span className="text-foreground">&ldquo;{q}&rdquo;</span>
          {" "}— {messages.length} pesan ditemukan
        </p>
      )}
      <MessageList messages={messages} />
    </>
  )
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold">Pesan masuk</h1>
      </div>

      <div className="mb-5">
        <Suspense fallback={<Skeleton className="h-9 w-full max-w-sm" />}>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense key={q ?? ""} fallback={<MessageListSkeleton />}>
        <MessageResults q={q} />
      </Suspense>
    </div>
  )
}
