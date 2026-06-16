"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { mainNav, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })

  const activeIndex = mainNav.findIndex((item) => isActive(item.href, pathname))

  const moveTo = useCallback((index: number) => {
    const el = itemRefs.current[index]
    if (!el) {
      setIndicator((prev) => ({ ...prev, visible: false }))
      return
    }
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
  }, [])

  useEffect(() => {
    moveTo(activeIndex)
    const onResize = () => moveTo(activeIndex)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeIndex, moveTo])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-0.5 text-base font-semibold tracking-tight text-foreground"
        >
          <span className="font-display font-bold">{siteConfig.name}</span>
          <span className="text-measure-ink text-lg leading-none">.</span>
        </Link>

        <div
          ref={listRef}
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => moveTo(activeIndex)}
        >
          {mainNav.map((item, index) => (
            <Link
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              href={item.href}
              onMouseEnter={() => moveTo(index)}
              onFocus={() => moveTo(index)}
              onBlur={() => moveTo(activeIndex)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
                isActive(item.href, pathname)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1.5 h-0.5 bg-measure transition-all duration-200 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Ajukan proyek</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Buka menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left font-display">
                  <span>{siteConfig.name}</span>
                  <span className="text-measure-ink">.</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-foreground",
                      isActive(item.href, pathname)
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="mt-auto px-4 pb-4">
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link href="/contact">Ajukan proyek</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
