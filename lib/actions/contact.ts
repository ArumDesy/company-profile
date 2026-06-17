"use server"

import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validations/contact"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>
}

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors
    return {
      status: "error",
      fieldErrors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      },
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("messages").insert({
      name: result.data.name,
      email: result.data.email,
      content: result.data.message,
    })

    if (error) {
      return {
        status: "error",
        message: "Terjadi masalah saat mengirim pesan. Coba lagi sebentar.",
      }
    }
  } catch {
    return {
      status: "error",
      message: "Terjadi masalah saat mengirim pesan. Coba lagi sebentar.",
    }
  }

  return {
    status: "success",
    message: "Pesan kamu masuk. Kami balas lewat email.",
  }
}
