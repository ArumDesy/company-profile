import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

import { getPostByIdForAdmin } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { PostForm } from "@/components/dashboard/post-form"

export const metadata: Metadata = {
  title: "Edit artikel",
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostByIdForAdmin(id)

  if (!post) notFound()

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
        <h1 className="mt-1 text-2xl font-bold">Edit artikel</h1>
        <p className="mt-1 text-sm text-muted-foreground">{post.title}</p>
      </div>

      <PostForm mode="update" post={post} />
    </div>
  )
}
