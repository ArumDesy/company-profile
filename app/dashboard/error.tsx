"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="grid-blueprint absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-[5rem] font-bold leading-none text-border select-none">
          500
        </p>
        <h1 className="mt-2 text-xl font-bold">Dashboard tidak bisa dimuat</h1>
        <p className="mx-auto mt-3 max-w-[38ch] text-sm text-muted-foreground">
          Ada kesalahan di sisi server. Coba muat ulang halaman ini.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Kode: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()}>Coba lagi</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Ke ringkasan</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
