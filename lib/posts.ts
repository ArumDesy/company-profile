import { createPublicClient } from "@/lib/supabase/public"

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, content, published, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) return []
    return (data as Post[]) ?? []
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, content, published, created_at")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error) return null
    return (data as Post) ?? null
  } catch {
    return null
  }
}
