import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Forbidden() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="grid-blueprint absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-[6rem] font-bold leading-none text-border select-none md:text-[9rem]">
          403
        </p>
        <h1 className="mt-2 text-xl font-bold md:text-2xl">Akses ini bukan untukmu</h1>
        <p className="mx-auto mt-3 max-w-[40ch] text-muted-foreground">
          Akunmu sudah masuk, tapi halaman ini di luar jangkauanmu. Kalau menurutmu ini keliru,
          kabari kami.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Ke beranda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Hubungi kami</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
