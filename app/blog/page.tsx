import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/dashboard/search-bar"
import { Pager } from "@/components/ui/pager"
import { siteConfig } from "@/config/site"
import { getPublishedPostsPage } from "@/lib/posts"
import { highlightText } from "@/lib/highlight"

const PER_PAGE = 8

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = "", page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const { posts, total } = await getPublishedPostsPage(q, page, PER_PAGE)

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
          <div className="mt-6">
            <SearchBar
              placeholder="Cari catatan…"
              ariaLabel="Cari catatan"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              {q
                ? `Tak ada catatan yang cocok dengan “${q}”.`
                : "Belum ada catatan. Yang pertama lagi ditulis."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={index * 70} className="h-full">
                  <Card className="lift-brutal flex h-full flex-col">
                    <CardHeader className="flex-1">
                      <div className="mb-2 font-mono text-xs text-muted-foreground">
                        {formatDate(post.created_at)}
                      </div>
                      <CardTitle className="text-base font-semibold leading-snug">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition-colors hover:text-measure-ink"
                        >
                          {highlightText(post.title, q)}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {highlightText(post.excerpt, q)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm" className="px-0 text-measure-ink">
                        <Link href={`/blog/${post.slug}`}>Baca selengkapnya →</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </Reveal>
              ))}
            </div>
            <Pager page={page} total={total} perPage={PER_PAGE} />
          </>
        )}
      </section>
    </>
  )
}
