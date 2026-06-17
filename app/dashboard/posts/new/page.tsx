import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostForm } from "@/components/dashboard/post-form"

export const metadata: Metadata = {
  title: "Tulis artikel",
}

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-3 font-mono text-xs">
          <Link href="/dashboard/posts">
            <ChevronLeftIcon className="size-4" />
            Kembali ke artikel
          </Link>
        </Button>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold">Tulis artikel baru</h1>
      </div>

      <PostForm mode="create" />
    </div>
  )
}
