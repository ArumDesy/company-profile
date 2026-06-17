"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, XIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [value, setValue] = useState(searchParams.get("q") ?? "")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set("q", value.trim())
      } else {
        params.delete("q")
      }
      router.replace(`${pathname}?${params.toString()}`)
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => {
    setValue("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative max-w-sm">
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari nama, email, atau isi pesan…"
        className="pl-9 pr-9"
        aria-label="Cari pesan"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Hapus pencarian"
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  )
}
