import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

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

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const eyebrow = "Catatan · Next.js + Supabase"
  const title = post?.title ?? "Catatan teknis dari dapur studio"
  const meta = post ? formatDate(post.created_at) : siteConfig.tagline

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0e151d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0px",
            backgroundImage:
              "linear-gradient(rgba(31,43,56,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(31,43,56,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "3px",
            height: "630px",
            backgroundColor: "#ff6a3d",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: "14px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ff6a3d",
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontFamily: "sans-serif",
              fontSize: "60px",
              fontWeight: 800,
              color: "#eef3f8",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "20px",
              color: "#93a3b2",
              letterSpacing: "0.02em",
            }}
          >
            {meta}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: "30px",
              fontWeight: 800,
              color: "#eef3f8",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ display: "flex" }}>{siteConfig.name}</span>
            <span style={{ color: "#ff6a3d", display: "flex" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#344150",
              letterSpacing: "0.05em",
            }}
          >
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
