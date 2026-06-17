import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Mark } from "@/components/brand/mark"

type LogoProps = {
  className?: string
  markClassName?: string
  showWordmark?: boolean
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Mark className={cn("size-6 text-foreground", markClassName)} />
      {showWordmark ? (
        <span className="font-display text-base font-bold tracking-tight">
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  )
}
