import { MailIcon, MapPinIcon, MessageSquareIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactForm } from "@/components/contact/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Punya proyek yang mau digarap? Ceritakan lewat formulir ini. Kami baca semua pesan dan respons dalam satu hari kerja.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
}

const contactItems = [
  {
    icon: MailIcon,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageSquareIcon,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: MapPinIcon,
    label: "Lokasi",
    value: siteConfig.contact.location,
    href: null,
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Kontak
          </p>
          <h1 className="mt-3 max-w-[20ch] text-3xl font-bold tracking-tight md:text-5xl">
            Mulai dari satu pesan.
          </h1>
          <p className="mt-4 max-w-[48ch] text-muted-foreground">
            Tidak perlu proposal formal. Ceritakan proyeknya — kami respons dengan estimasi yang
            jujur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-6 text-lg font-semibold">Formulir proyek</h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Atau langsung hubungi</h2>
              <ul className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-start gap-3">
                      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <Link
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-foreground hover:text-measure-ink transition-colors"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-sm text-foreground">{item.value}</p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="rule-measure">
              <p className="text-sm font-medium">Waktu respons</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Kami membaca semua pesan masuk. Respons pertama biasanya dalam satu hari kerja,
                sering kali lebih cepat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
