"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Mail, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/messages", label: "Pesan", icon: Mail, exact: false },
  { href: "/dashboard/posts", label: "Artikel", icon: FileText, exact: false },
]

export function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href)

        return (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            className={cn(
              "justify-start gap-3 font-mono text-xs uppercase tracking-widest",
              isActive && "bg-secondary text-foreground"
            )}
            onClick={onNavigate}
          >
            <Link href={item.href}>
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
