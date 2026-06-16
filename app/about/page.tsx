import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { processSteps, siteConfig, stats } from "@/config/site"

export const metadata: Metadata = {
  title: "Tentang studio",
  description:
    "Rakitan berdiri karena frustrasi dengan stack yang lambat dan susah dirawat. Kami bangun web app dengan Next.js dan Supabase — dua alat yang memang kami pakai sendiri.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${siteConfig.url}/about`,
    type: "website",
  },
}

const principles = [
  {
    title: "Kenapa Next.js?",
    detail:
      "App Router membuat pola server-client jadi eksplisit. Server Component untuk data, Client Component untuk interaksi. Hasilnya lebih cepat, lebih mudah di-maintain, dan lebih aman secara default.",
  },
  {
    title: "Kenapa Supabase?",
    detail:
      "Postgres dengan RLS yang benar, auth yang sudah jalan, dan client SDK yang rapi. Dari zero ke produksi lebih cepat dibanding setup backend sendiri, tanpa mengorbankan kontrol.",
  },
  {
    title: "Cara kami kerja",
    detail:
      "Iterasi kecil, komunikasi langsung, tidak ada buku proposal 40 halaman. Kami duduk bareng, pahami masalahnya, dan mulai rakit.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Tentang
          </p>
          <h1 className="mt-3 max-w-[22ch] text-3xl font-bold tracking-tight md:text-5xl">
            Studio yang membangun apa yang dijualnya.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-6 leading-relaxed text-muted-foreground">
            <p className="text-base">
              Rakitan dimulai dari frustrasi. Tim kami pernah membangun web app dengan stack yang
              lambat di pengembangan, berat di produksi, dan susah dioper ke klien. Setelah cukup
              lama bergulat, kami memutuskan untuk fokus ke dua alat yang benar-benar bekerja:
              Next.js dan Supabase.
            </p>
            <p className="text-base">
              Situs yang Anda buka ini dibangun dengan stack yang sama. Bukan kebetulan — kami
              percaya bahwa cara terbaik membuktikan kemampuan adalah memakainya sendiri. Setiap
              fitur yang kami tawarkan sudah kami pakai di produksi, termasuk di sini.
            </p>
            <p className="text-base">
              Kami tidak besar dan tidak ingin jadi besar demi ukuran. Kami lebih tertarik ke
              proyek yang benar-benar dipakai tim — bukan yang selesai dikerjakan lalu ditinggal
              dalam mode maintenance permanen.
            </p>
          </Reveal>
          <div className="space-y-6">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90} className="rule-measure">
                <h2 className="font-semibold">{principle.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px px-4 md:grid-cols-3 md:px-6">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 90}
              className="flex flex-col gap-1 px-2 py-10"
            >
              <span className="font-mono text-3xl font-bold md:text-4xl">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Cara kerja
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Proses yang tidak berbelit</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <Reveal key={step.no} delay={index * 80} className="rule-measure">
              <p className="font-mono text-2xl font-bold text-measure-ink">{step.no}</p>
              <h3 className="mt-1 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <Reveal className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <h2 className="text-xl font-bold md:text-2xl">Tertarik kerja bareng?</h2>
          <p className="mt-3 max-w-[48ch] text-muted-foreground">
            Ceritakan proyeknya. Kami baca semua pesan masuk dan respons dalam satu hari kerja.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Ajukan proyek</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Lihat layanan</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
