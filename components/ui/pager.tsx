"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type PagerProps = {
  page: number
  total: number
  perPage: number
}

export function Pager({ page, total, perPage }: PagerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  if (totalPages <= 1) return null

  const hrefFor = (target: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (target <= 1) params.delete("page")
    else params.set("page", String(target))
    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <nav
      className="mt-6 flex items-center justify-between gap-3"
      aria-label="Navigasi halaman"
    >
      {hasPrev ? (
        <Button asChild variant="outline" size="sm">
          <Link href={hrefFor(page - 1)}>
            <ChevronLeftIcon className="size-4" />
            Sebelumnya
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeftIcon className="size-4" />
          Sebelumnya
        </Button>
      )}

      <span className="font-mono text-xs text-muted-foreground">
        Hal {page} / {totalPages}
      </span>

      {hasNext ? (
        <Button asChild variant="outline" size="sm">
          <Link href={hrefFor(page + 1)}>
            Berikutnya
            <ChevronRightIcon className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Berikutnya
          <ChevronRightIcon className="size-4" />
        </Button>
      )}
    </nav>
  )
}
