import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="grid-blueprint absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative text-center">
        <p className="font-mono text-[7rem] font-bold leading-none text-border select-none md:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 text-xl font-bold md:text-2xl">Halaman ini tidak ada</h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-muted-foreground">
          Alamatnya mungkin salah ketik, atau halamannya sudah dipindah. Coba dari beranda atau
          lihat catatan teknis.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Ke beranda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">Lihat catatan</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
