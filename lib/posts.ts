import { createPublicClient } from "@/lib/supabase/public"
import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin"

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
}

export type PostPage = { posts: Post[]; total: number }

type PostRow = Post & { total_count: number | string }

function splitPostRows(rows: PostRow[] | null): PostPage {
  if (!rows || rows.length === 0) return { posts: [], total: 0 }
  const total = Number(rows[0].total_count) || 0
  const posts: Post[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    published: row.published,
    created_at: row.created_at,
  }))
  return { posts, total }
}

export async function getPublishedPostsPage(
  search: string,
  page: number,
  perPage: number
): Promise<PostPage> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.rpc("search_posts", {
      search,
      lim: perPage,
      off: (page - 1) * perPage,
      only_published: true,
    })
    if (error) return { posts: [], total: 0 }
    return splitPostRows(data as PostRow[] | null)
  } catch {
    return { posts: [], total: 0 }
  }
}

export async function getPostsForAdminPage(
  search: string,
  page: number,
  perPage: number
): Promise<PostPage> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) return { posts: [], total: 0 }

    const { data, error } = await supabase.rpc("search_posts", {
      search,
      lim: perPage,
      off: (page - 1) * perPage,
      only_published: false,
    })
    if (error) return { posts: [], total: 0 }
    return splitPostRows(data as PostRow[] | null)
  } catch {
    return { posts: [], total: 0 }
  }
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

export async function getPostsForAdmin(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) return []

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, content, published, created_at")
      .order("created_at", { ascending: false })

    if (error) return []
    return (data as Post[]) ?? []
  } catch {
    return []
  }
}

export async function getPostByIdForAdmin(id: string): Promise<Post | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) return null

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, content, published, created_at")
      .eq("id", id)
      .single()

    if (error) return null
    return (data as Post) ?? null
  } catch {
    return null
  }
}
