"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin"
import { loginSchema, registerSchema } from "@/lib/validations/auth"

export type AuthState = {
  status: "idle" | "error" | "success"
  message?: string
  fieldErrors?: Partial<Record<"email" | "password" | "confirmPassword", string>>
}

export async function signIn(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = loginSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors
    return {
      status: "error",
      fieldErrors: {
        email: flat.email?.[0],
        password: flat.password?.[0],
      },
    }
  }

  const nextRaw = (formData.get("next") as string) ?? "/dashboard"
  const next =
    nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/dashboard"

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return {
      status: "error",
      message: "Email atau kata sandi salah.",
    }
  }

  if (!isAdminEmail(data.user?.email)) {
    await supabase.auth.signOut()
    return {
      status: "error",
      message: "Akun ini tidak punya akses admin.",
    }
  }

  revalidatePath("/dashboard", "layout")
  redirect(next)
}

export async function signUp(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const result = registerSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors
    return {
      status: "error",
      fieldErrors: {
        email: flat.email?.[0],
        password: flat.password?.[0],
        confirmPassword: flat.confirmPassword?.[0],
      },
    }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return {
      status: "error",
      message: "Pendaftaran gagal. Coba lagi atau gunakan email lain.",
    }
  }

  if (data.session) {
    if (!isAdminEmail(data.user?.email)) {
      await supabase.auth.signOut()
      return {
        status: "error",
        message: "Akun ini tidak punya akses admin.",
      }
    }

    revalidatePath("/dashboard", "layout")
    redirect("/dashboard")
  }

  return {
    status: "success",
    message:
      "Akun dibuat. Cek email kamu untuk konfirmasi sebelum masuk.",
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}
