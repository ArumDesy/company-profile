import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { RegisterForm } from "@/components/auth/register-form"
import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin"

export const metadata: Metadata = {
  title: "Daftar",
}

export default async function RegisterPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (isAdminEmail(user?.email)) redirect("/dashboard")

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="grid-blueprint absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative w-full max-w-sm">
        <div className="border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Admin
            </p>
            <h1 className="mt-1 text-xl font-bold">Buat akun</h1>
          </div>
          <div className="px-6 py-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
