import Link from "next/link"

import { siteConfig, footerNav } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block font-display text-lg font-bold">
              {siteConfig.name}<span className="text-measure-ink">.</span>
            </Link>
            <p className="mt-2 max-w-[18ch] text-sm text-muted-foreground leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex gap-1">
              <Button variant="ghost" size="icon-sm" asChild>
                <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Rakitan">
                  <IconGithub className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon-sm" asChild>
                <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Rakitan">
                  <IconLinkedin className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon-sm" asChild>
                <Link href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter Rakitan">
                  <IconX className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono">
              Kontak
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </Link>
              </li>
              <li>
                <Link
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.whatsapp}
                </Link>
              </li>
              <li className="text-muted-foreground">{siteConfig.contact.location}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.legalName}. Hak cipta dilindungi.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Next.js · Supabase · Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
