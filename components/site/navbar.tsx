"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { useState } from "react"

import { siteConfig, mainNav } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-0.5 font-mono text-base font-semibold tracking-tight text-foreground"
        >
          <span className="font-display font-bold">{siteConfig.name}</span>
          <span className="text-measure-ink text-lg leading-none">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
                pathname === item.href
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
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
                <SheetTitle className="font-display text-left">
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
                      pathname === item.href
                        ? "bg-secondary text-foreground font-medium"
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
