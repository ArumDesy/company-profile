import type { Metadata } from "next"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { getPostsForAdminPage } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { PostList } from "@/components/dashboard/post-list"
import { SearchBar } from "@/components/dashboard/search-bar"
import { Pager } from "@/components/ui/pager"

const PER_PAGE = 10

export const metadata: Metadata = {
  title: "Kelola artikel",
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = "", page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const { posts, total } = await getPostsForAdminPage(q, page, PER_PAGE)

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

      <div className="mb-5">
        <SearchBar
          placeholder="Cari judul atau ringkasan…"
          ariaLabel="Cari artikel"
        />
      </div>

      {q && (
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          Hasil untuk: <span className="text-foreground">&ldquo;{q}&rdquo;</span> — {total} artikel
        </p>
      )}

      <PostList posts={posts} query={q} />
      <Pager page={page} total={total} perPage={PER_PAGE} />
    </div>
  )
}
