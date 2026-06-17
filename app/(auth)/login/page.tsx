import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Masuk",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next, error } = await searchParams
  const redirectTo = next ?? "/dashboard"

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="grid-blueprint absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative w-full max-w-sm">
        <div className="border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Admin
            </p>
            <h1 className="mt-1 text-xl font-bold">Masuk ke dashboard</h1>
          </div>
          <div className="px-6 py-6">
            <LoginForm next={redirectTo} error={error} />
          </div>
        </div>
      </div>
    </div>
  )
}
