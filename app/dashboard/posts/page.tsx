import type { Metadata } from "next"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { getPostsForAdmin } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { PostList } from "@/components/dashboard/post-list"

export const metadata: Metadata = {
  title: "Kelola artikel",
}

export default async function PostsPage() {
  const posts = await getPostsForAdmin()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold">Artikel</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <PlusIcon className="size-4" />
            Tulis artikel
          </Link>
        </Button>
      </div>

      <PostList posts={posts} />
    </div>
  )
}
