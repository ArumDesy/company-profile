"use client"

import { useOptimistic, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { deletePost, togglePublish } from "@/lib/actions/posts"
import type { Post } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type OptimisticAction =
  | { type: "delete"; id: string }
  | { type: "toggle"; id: string; published: boolean }

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function PostList({ posts }: { posts: Post[] }) {
  const [optimisticPosts, dispatch] = useOptimistic(
    posts,
    (prev, action: OptimisticAction) => {
      if (action.type === "delete") {
        return prev.filter((p) => p.id !== action.id)
      }
      return prev.map((p) =>
        p.id === action.id ? { ...p, published: action.published } : p
      )
    }
  )
  const [, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = (id: string) => {
    startTransition(async () => {
      dispatch({ type: "delete", id })
      const result = await deletePost(id)
      if (!result.ok) {
        toast.error(result.message ?? "Gagal menghapus artikel.")
        router.refresh()
      }
    })
  }

  const handleToggle = (id: string, next: boolean) => {
    startTransition(async () => {
      dispatch({ type: "toggle", id, published: next })
      const result = await togglePublish(id, next)
      if (!result.ok) {
        toast.error(result.message ?? "Gagal mengubah status.")
        router.refresh()
      } else {
        toast.success(next ? "Artikel diterbitkan." : "Artikel disembunyikan.")
      }
    })
  }

  if (optimisticPosts.length === 0) {
    return (
      <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Kosong
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Belum ada artikel. Mulai tulis yang pertama.
        </p>
        <div className="mt-5">
          <Button asChild>
            <Link href="/dashboard/posts/new">Tulis artikel pertama</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border border border-border">
      {optimisticPosts.map((post) => (
        <div key={post.id} className="bg-card px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={post.published ? "default" : "secondary"} className="font-mono text-xs">
                  {post.published ? "Terbit" : "Draf"}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatDate(post.created_at)}
                </span>
              </div>
              <h3 className="mt-1.5 font-semibold leading-snug">{post.title}</h3>
              {post.excerpt && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/posts/${post.id}/edit`}>Edit</Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggle(post.id, !post.published)}
              >
                {post.published ? "Sembunyikan" : "Terbitkan"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus artikel ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                      <strong>{post.title}</strong> akan dihapus permanen beserta semua isinya. Aksi ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(post.id)}
                      className="bg-destructive text-white hover:bg-destructive/90"
                    >
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
