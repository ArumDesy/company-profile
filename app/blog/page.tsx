import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Catatan teknis",
  description:
    "Tulisan dari dalam studio — pola yang kami pakai, keputusan yang kami ambil, dan hal-hal yang kami pelajari saat membangun web app dengan Next.js dan Supabase.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString))
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Catatan
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Catatan teknis dari dapur studio.
          </h1>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">
            Bukan tutorial generik. Ini tentang keputusan nyata yang kami ambil saat membangun
            proyek klien — kenapa kami pilih ini, apa yang tidak berhasil, dan apa yang akhirnya
            jalan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              Belum ada catatan. Yang pertama lagi ditulis.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader className="flex-1">
                  <div className="mb-2 font-mono text-xs text-muted-foreground">
                    {formatDate(post.created_at)}
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-measure-ink transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="px-0 text-measure-ink">
                    <Link href={`/blog/${post.slug}`}>Baca selengkapnya →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
