import { updateSession } from "@/lib/supabase/middleware"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  const oauthError = searchParams.get("error")
  const oauthErrorCode = searchParams.get("error_code")
  const oauthErrorDesc = searchParams.get("error_description")
  const isOAuthError = Boolean(oauthErrorCode || (oauthError && oauthErrorDesc))

  if (isOAuthError && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url)
    if (oauthErrorCode) loginUrl.searchParams.set("error_code", oauthErrorCode)
    if (oauthError) loginUrl.searchParams.set("error", oauthError)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/dashboard")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {},
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
