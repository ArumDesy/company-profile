import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services, siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Tiga jalur kerja yang kami tawarkan: bangun web app dari nol, buat dashboard internal, atau pindahkan situs lama ke stack yang enak dirawat.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: `${siteConfig.url}/services`,
    type: "website",
  },
}

const benefits = [
  {
    label: "Teknologi",
    title: "Next.js & Supabase",
    detail:
      "Stack yang kami pilih karena nyata bekerja di produksi, bukan karena sedang populer.",
  },
  {
    label: "Waktu",
    title: "Minggu, bukan bulan",
    detail:
      "MVP yang bisa diuji lebih berguna daripada rencana yang sempurna. Kami prioritaskan yang paling cepat memberi nilai.",
  },
  {
    label: "Setelah rilis",
    title: "Kode yang bisa diteruskan",
    detail:
      "Dokumentasi singkat, struktur yang rapi, dan tim internal Anda bisa melanjutkan tanpa perlu tanya kami setiap langkah.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Layanan
          </p>
          <h1 className="mt-3 max-w-[20ch] text-3xl font-bold tracking-tight md:text-5xl">
            Kami tidak jual semua hal untuk semua orang.
          </h1>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">
            Tiga jenis pekerjaan yang kami kuasai dengan baik: membangun dari nol, membuat
            dashboard yang dipakai tim, dan merapikan situs yang sudah ada.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="space-y-8">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 70} className="rule-measure">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-bold md:text-2xl">{service.title}</h2>
              </div>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-muted-foreground">
                {service.summary}
              </p>
              <div className="mt-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Yang kami hasilkan
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 font-mono text-measure-ink">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.label} delay={index * 80} className="h-full">
                <Card className="lift-brutal h-full">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                      {benefit.label}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {benefit.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.detail}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <h2 className="text-xl font-bold md:text-2xl">Cocok dengan yang Anda butuhkan?</h2>
        <p className="mt-3 max-w-[48ch] text-muted-foreground">
          Kirim gambaran singkat proyeknya — kami akan balas dengan estimasi scope dan waktu, tanpa
          komitmen dulu.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Ajukan proyek</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
