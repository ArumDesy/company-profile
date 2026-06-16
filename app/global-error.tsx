"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="id">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
        <div className="max-w-md">
          <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Kesalahan fatal
          </p>
          <h1 className="mt-3 text-2xl font-bold">Aplikasi gagal dimuat</h1>
          <p className="mx-auto mt-3 max-w-[40ch] text-muted-foreground">
            Sesuatu berhenti bekerja sebelum halaman sempat tampil. Muat ulang untuk mencoba lagi.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-muted-foreground">Kode: {error.digest}</p>
          )}
          <div className="mt-8">
            <Button onClick={() => reset()}>Muat ulang</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
