import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processSteps, services, siteConfig, stats } from "@/config/site"

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="grid-blueprint absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-32">
          <Badge variant="outline" className="mb-6 font-mono text-xs">
            Studio · Next.js + Supabase
          </Badge>
          <h1 className="max-w-[16ch] text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Kami rakit web app yang{" "}
            <span className="text-measure-ink">beneran dipakai.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-base text-muted-foreground md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Ajukan proyek
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Lihat catatan teknis</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Layanan
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Apa yang kami kerjakan</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80} className="h-full">
              <Card className="lift-brutal h-full">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 font-mono text-xs text-measure-ink">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center" delay={120}>
          <Button asChild variant="outline">
            <Link href="/services">Selengkapnya tentang layanan kami</Link>
          </Button>
        </Reveal>
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
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Dari obrolan ke produksi</h2>
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

      <section className="relative overflow-hidden border-t border-border bg-card">
        <div className="grid-blueprint-lg absolute inset-0 opacity-60" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-5xl px-4 py-20 text-center md:px-6">
          <h2 className="text-2xl font-bold md:text-4xl">Ada proyek yang mau digarap?</h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-muted-foreground">
            Ceritakan dulu lewat email atau formulir. Kami respons dalam satu hari kerja.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Mulai diskusi</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
