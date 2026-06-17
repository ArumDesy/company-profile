"use client"

import { useState } from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export function MobileNav({ email }: { email: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="md:hidden">
          <MenuIcon className="size-4" />
          <span className="sr-only">Buka menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="font-mono text-xs uppercase tracking-widest">
            Dashboard
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-2 pt-1">
          <p className="truncate font-mono text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="px-4">
          <DashboardNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
