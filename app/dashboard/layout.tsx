import { redirect } from "next/navigation"
import Link from "next/link"
import { LogOutIcon, TerminalSquareIcon } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login?next=/dashboard")

  const email = user.email ?? ""

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col md:flex-row">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <TerminalSquareIcon className="size-4 text-measure-ink" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest">
              Rakitan
            </span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-3 py-4">
          <DashboardNav />
        </div>

        <div className="border-t border-border px-3 py-4">
          <p className="mb-3 truncate px-2 font-mono text-xs text-muted-foreground">
            {email}
          </p>
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-3 font-mono text-xs uppercase tracking-widest"
            >
              <LogOutIcon className="size-4 shrink-0" />
              Keluar
            </Button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <MobileNav email={email} />
            <Link href="/" className="flex items-center gap-2">
              <TerminalSquareIcon className="size-4 text-measure-ink" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest">
                Rakitan
              </span>
            </Link>
          </div>
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="icon-sm"
              title="Keluar"
            >
              <LogOutIcon className="size-4" />
              <span className="sr-only">Keluar</span>
            </Button>
          </form>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
