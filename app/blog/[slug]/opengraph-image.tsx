import { siteConfig } from "@/config/site"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = `Catatan teknis — ${siteConfig.name}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return renderOgImage({
    eyebrow: "Catatan",
    title: post?.title ?? "Catatan teknis dari dapur studio",
    footer: post ? formatDate(post.created_at) : undefined,
  })
}
