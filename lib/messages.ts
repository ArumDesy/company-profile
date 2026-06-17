import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin"

export type Message = {
  id: string
  name: string
  email: string
  content: string
  created_at: string
}

export type MessagePage = { messages: Message[]; total: number }

type MessageRow = Message & { total_count: number | string }

export async function getMessagesPage(
  search: string,
  page: number,
  perPage: number
): Promise<MessagePage> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) return { messages: [], total: 0 }

    const { data, error } = await supabase.rpc("search_messages", {
      search,
      lim: perPage,
      off: (page - 1) * perPage,
    })
    if (error) return { messages: [], total: 0 }

    const rows = (data as MessageRow[] | null) ?? []
    if (rows.length === 0) return { messages: [], total: 0 }
    const total = Number(rows[0].total_count) || 0
    const messages: Message[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      content: row.content,
      created_at: row.created_at,
    }))
    return { messages, total }
  } catch {
    return { messages: [], total: 0 }
  }
}

export async function getMessages(query?: string): Promise<Message[]> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) return []

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
