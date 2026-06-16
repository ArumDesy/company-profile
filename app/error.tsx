"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="grid-blueprint absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-[6rem] font-bold leading-none text-border select-none md:text-[9rem]">
          500
        </p>
        <h1 className="mt-2 text-xl font-bold md:text-2xl">Ada yang tidak beres</h1>
        <p className="mx-auto mt-3 max-w-[40ch] text-muted-foreground">
          Kesalahan ini dari sisi kami, bukan kamu. Coba muat ulang halamannya. Kalau masih
          bermasalah, kabari kami lewat halaman kontak.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-muted-foreground">Kode: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()}>Coba lagi</Button>
          <Button asChild variant="outline">
            <Link href="/">Ke beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
