import type { Metadata } from "next"
import Link from "next/link"
import { MessageSquareIcon, FileTextIcon, CheckCircleIcon, InboxIcon } from "lucide-react"

import { getMessages } from "@/lib/messages"
import { getPostsForAdmin } from "@/lib/posts"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Ringkasan",
}

export default async function DashboardPage() {
  const [messages, posts] = await Promise.all([
    getMessages(),
    getPostsForAdmin(),
  ])

  const totalMessages = messages.length
  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.published).length
  const draftPosts = totalPosts - publishedPosts

  const stats = [
    {
      label: "Total pesan",
      value: totalMessages,
      icon: MessageSquareIcon,
      href: "/dashboard/messages",
      cta: "Lihat pesan",
    },
    {
      label: "Total artikel",
      value: totalPosts,
      icon: FileTextIcon,
      href: "/dashboard/posts",
      cta: "Kelola artikel",
    },
    {
      label: "Artikel terbit",
      value: publishedPosts,
      icon: CheckCircleIcon,
      href: "/dashboard/posts",
      cta: "Lihat terbit",
    },
    {
      label: "Draf",
      value: draftPosts,
      icon: InboxIcon,
      href: "/dashboard/posts",
      cta: "Lihat draf",
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold">Ringkasan</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <stat.icon className="size-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <span className="mb-4 font-mono text-4xl font-bold leading-none">
              {stat.value}
            </span>
            <div className="mt-auto">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={stat.href}>{stat.cta}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="mb-4 text-base font-semibold">Aksi cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/posts/new">Tulis artikel baru</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/messages">Cek pesan masuk</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
