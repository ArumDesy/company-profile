"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function deleteMessage(
  id: string
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, message: "Tidak terautentikasi." }

  const { error } = await supabase.from("messages").delete().eq("id", id)

  if (error) {
    return { ok: false, message: "Gagal menghapus pesan." }
  }

  revalidatePath("/dashboard/messages")
  return { ok: true }
}
