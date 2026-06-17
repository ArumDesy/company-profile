import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const oauthError = searchParams.get("error")
  const oauthErrorCode = searchParams.get("error_code")
  const nextRaw = searchParams.get("next") ?? "/dashboard"
  const next =
    nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/dashboard"

  if (oauthError || oauthErrorCode) {
    const params = new URLSearchParams()
    if (oauthErrorCode) params.set("error_code", oauthErrorCode)
    if (oauthError) params.set("error", oauthError)
    return NextResponse.redirect(`${origin}/login?${params.toString()}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!isAdminEmail(user?.email)) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/login?error=denied`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
