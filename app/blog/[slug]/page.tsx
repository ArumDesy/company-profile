import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { MarkdownContent } from "@/components/blog/markdown-content"

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Artikel tidak ditemukan",
      description: "Artikel yang kamu cari tidak ada atau sudah dipindah.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.created_at,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Catatan", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-20">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 px-0 text-muted-foreground">
            <Link href="/blog">← Kembali ke catatan</Link>
          </Button>
          <div className="mb-3 font-mono text-xs text-muted-foreground">
            {formatDate(post.created_at)}
          </div>
          <h1 className="text-2xl font-bold tracking-tight leading-snug md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </div>

        <hr className="border-border mb-8" />

        <MarkdownContent markdown={post.content} />

        <hr className="border-border mt-12 mb-8" />

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">Lihat catatan lain</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Ajukan proyek</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
