"use server"

import { redirect, unauthorized } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { postSchema } from "@/lib/validations/post"

export type PostFormState = {
  status: "idle" | "error" | "success"
  message?: string
  fieldErrors?: Partial<Record<"title" | "excerpt" | "content" | "published", string>>
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

export async function createPost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return unauthorized()

  const raw = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") ?? "false",
  }

  const result = postSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors
    return {
      status: "error",
      fieldErrors: {
        title: flat.title?.[0],
        excerpt: flat.excerpt?.[0],
        content: flat.content?.[0],
      },
    }
  }

  const slug = generateSlug(result.data.title)

  const { error } = await supabase.from("posts").insert({
    title: result.data.title,
    slug,
    excerpt: result.data.excerpt,
    content: result.data.content,
    published: result.data.published,
  })

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "Slug artikel bentrok. Coba ubah judul sedikit.",
      }
    }
    return {
      status: "error",
      message: "Gagal menyimpan artikel. Coba lagi.",
    }
  }

  revalidatePath("/dashboard/posts")
  revalidatePath("/blog")
  redirect("/dashboard/posts")
}

export async function updatePost(
  id: string,
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return unauthorized()

  const raw = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") ?? "false",
  }

  const result = postSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors
    return {
      status: "error",
      fieldErrors: {
        title: flat.title?.[0],
        excerpt: flat.excerpt?.[0],
        content: flat.content?.[0],
      },
    }
  }

  const { data: existing, error: fetchError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .single()

  if (fetchError || !existing) {
    return {
      status: "error",
      message: "Artikel tidak ditemukan.",
    }
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title: result.data.title,
      excerpt: result.data.excerpt,
      content: result.data.content,
      published: result.data.published,
    })
    .eq("id", id)

  if (error) {
    return {
      status: "error",
      message: "Gagal memperbarui artikel. Coba lagi.",
    }
  }

  revalidatePath("/dashboard/posts")
  revalidatePath("/blog")
  revalidatePath(`/blog/${existing.slug}`)
  redirect("/dashboard/posts")
}

export async function deletePost(
  id: string
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, message: "Tidak terautentikasi." }

  const { data: existing } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .single()

  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    return { ok: false, message: "Gagal menghapus artikel." }
  }

  revalidatePath("/dashboard/posts")
  revalidatePath("/blog")
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`)

  return { ok: true }
}

export async function togglePublish(
  id: string,
  next: boolean
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, message: "Tidak terautentikasi." }

  const { data: existing } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .single()

  const { error } = await supabase
    .from("posts")
    .update({ published: next })
    .eq("id", id)

  if (error) {
    return { ok: false, message: "Gagal mengubah status terbit." }
  }

  revalidatePath("/dashboard/posts")
  revalidatePath("/blog")
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`)

  return { ok: true }
}
