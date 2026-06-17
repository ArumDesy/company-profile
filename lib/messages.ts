import { createClient } from "@/lib/supabase/server"

export type Message = {
  id: string
  name: string
  email: string
  content: string
  created_at: string
}

export async function getMessages(query?: string): Promise<Message[]> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return []

    let req = supabase
      .from("messages")
      .select("id, name, email, content, created_at")
      .order("created_at", { ascending: false })

    if (query && query.trim().length > 0) {
      const escaped = query.trim().replace(/[%_]/g, (c) => `\\${c}`)
      req = req.or(
        `name.ilike.%${escaped}%,email.ilike.%${escaped}%,content.ilike.%${escaped}%`
      )
    }

    const { data, error } = await req

    if (error) return []
    return (data as Message[]) ?? []
  } catch {
    return []
  }
}
