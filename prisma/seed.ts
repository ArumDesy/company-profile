import { fakerID_ID as faker } from "@faker-js/faker"
import { PrismaPg } from "@prisma/adapter-pg"
import { config } from "dotenv"
import { PrismaClient } from "../generated/prisma/client"

config({ path: ".env.local", quiet: true })

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

function uniqueSlug(base: string, used: Set<string>): string {
  let slug = slugify(base)
  let i = 2
  while (used.has(slug)) {
    slug = `${slugify(base)}-${i}`
    i++
  }
  used.add(slug)
  return slug
}

const postTemplates: Array<{
  title: string
  excerpt: string
  content: string
  published: boolean
  daysAgo: number
}> = [
  {
    title: "Migrasi dari Pages Router ke App Router tanpa downtime",
    excerpt:
      "Migrasi bertahap tanpa menutup fitur yang sedang berjalan. Pola yang kami pakai saat memindahkan proyek klien ke App Router.",
    content: `App Router bukan sekadar cara baru menulis halaman. Ini perubahan paradigma dari "fetch di client" ke "render di server secara default". Kami sudah memigrasikan tiga proyek dan menemukan pola yang paling minim risiko.

## Mulai dari route baru, bukan yang lama

Kesalahan umum: memindahkan semua halaman sekaligus. Yang benar, biarkan \`pages/\` tetap jalan dan tulis halaman baru di \`app/\`. Keduanya bisa berdampingan.

- Pindahkan halaman statis dulu — tanpa data, tanpa auth
- Lanjut ke halaman dengan fetch sederhana
- Terakhir, halaman dengan auth dan proteksi

## Urutan migrasi yang kami pakai

\`\`\`mermaid
flowchart LR
  Statis --> Fetch
  Fetch --> Auth
  Auth --> Selesai
\`\`\`

## Data fetching yang berubah

Di App Router setiap Server Component bisa fetch langsung — termasuk komponen yang bersarang jauh di dalam.

\`\`\`tsx
async function PostList() {
  const posts = await db.post.findMany({ where: { published: true } })
  return posts.map((p) => <PostCard key={p.id} post={p} />)
}
\`\`\`

Hasilnya: tanpa data waterfall, tanpa prop drilling panjang.`,
    published: true,
    daysAgo: 90,
  },
  {
    title: "Mengapa kami pilih Supabase RLS dibanding backend terpisah",
    excerpt:
      "Database yang bisa menjaga dirinya sendiri. Row Level Security menggantikan layer permission yang biasanya ditulis manual.",
    content: `Setiap bahas arsitektur dengan klien baru, ada pertanyaan yang selalu muncul: "Perlu backend terpisah tidak?" Untuk sebagian besar web app yang kami tangani, jawabannya tidak — dan Supabase RLS alasannya.

## Apa itu Row Level Security

RLS adalah fitur PostgreSQL untuk mendefinisikan aturan akses langsung di level baris. Bukan di aplikasi, tapi di database. Bahkan kalau ada bug di kode, data tetap terlindungi.

\`\`\`sql
alter table posts enable row level security;

create policy "publik baca yang terbit"
  on posts for select
  using (published = true);
\`\`\`

## Kapan RLS tidak cukup

- Logika bisnis yang menyentuh banyak tabel sekaligus
- Integrasi sistem eksternal lewat webhook
- Operasi batch yang butuh service role

Untuk kasus itu kami tetap pakai Server Actions, bukan REST API terpisah. Satu stack, lebih sedikit yang dijaga.`,
    published: true,
    daysAgo: 75,
  },
  {
    title: "Pola Server Action yang kami pakai di semua proyek",
    excerpt:
      "Bukan sekadar cara memanggil fungsi server. Server Actions mengubah cara berpikir tentang form, validasi, dan state.",
    content: `Server Actions sudah stabil dan kami pakai di produksi. Ada pola yang selalu kami terapkan — bukan ikut tren, tapi karena terbukti mengurangi bug.

## Validasi Zod sebelum sentuh DB

Aturan pertama: tidak ada data masuk database sebelum lewat Zod. Server Actions bisa dipanggil dari mana saja, termasuk curl.

\`\`\`ts
"use server"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function submitForm(prev: State, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }
  await db.from("messages").insert(result.data)
  return { success: true }
}
\`\`\`

## Verifikasi user di tiap action yang menulis

- Jangan andalkan middleware saja — bisa di-bypass
- Panggil \`getUser()\` di awal setiap action yang menulis
- Return error generik ke client, log detail di server`,
    published: true,
    daysAgo: 60,
  },
  {
    title: "Optimasi Core Web Vitals di Next.js: dari 65 ke 98 dalam tiga hari",
    excerpt:
      "LCP lambat bukan berarti server lambat. Sebagian besar waktu tersembunyi di gambar, font, dan CSS yang belum dioptimasi.",
    content: `Satu klien datang dengan keluhan sederhana: situsnya terasa lambat. Skor Lighthouse 65. Dalam tiga hari kami bawa ke 98 — tanpa ganti hosting.

## Cara skor performa dihitung

Skor itu rata-rata berbobot dari beberapa metrik. Disederhanakan:

\`\`\`math
\\text{Skor} = \\sum_{i} w_i \\cdot s_i
\`\`\`

Targetnya jelas: $LCP < 2.5s$ untuk dinilai baik.

## Gambar tanpa ukuran eksplisit

Elemen gambar tanpa \`width\` dan \`height\` memicu layout shift. Pindah ke \`next/image\` menyelesaikannya.

\`\`\`tsx
<Image src="/hero.webp" alt="Hero" width={1200} height={630} priority />
\`\`\`

## Font dan JavaScript

- Pakai \`next/font/google\` — font dibundel, nol layout shift
- Hapus \`"use client"\` dari komponen yang tak butuh interaksi
- Hasilnya bundle turun 40%`,
    published: true,
    daysAgo: 45,
  },
  {
    title: "Draft: Streaming dengan Suspense di dashboard kompleks",
    excerpt:
      "Masih eksperimen. Beberapa widget dashboard dengan data berbeda — cara membuatnya stream tanpa saling blokir.",
    content: `Masih tahap percobaan internal. Belum kami terapkan ke klien karena butuh lebih banyak uji edge case.

## Konsep dasarnya

Tiap widget bisa stream independen — yang datanya cepat langsung muncul tanpa menunggu yang lain.

\`\`\`tsx
<Suspense fallback={<SkeletonCard />}>
  <RevenueWidget />
</Suspense>
\`\`\`

- Tiap boundary Suspense titik streaming sendiri
- Browser render HTML parsial begitu ada yang selesai`,
    published: false,
    daysAgo: 10,
  },
  {
    title: "Draft: Arsitektur multi-tenant dengan Supabase",
    excerpt:
      "Masih ditulis. Pola RLS untuk SaaS di mana satu database melayani banyak tenant sekaligus.",
    content: `Belum selesai. Sedang dikerjakan bareng proyek SaaS klien pertama yang pakai pola ini.

## Problem statement

Satu database, banyak tenant, data harus terisolasi sempurna.

\`\`\`mermaid
flowchart TD
  Request --> Auth
  Auth --> Tenant{tenant_id?}
  Tenant --> Data[Baris milik tenant]
\`\`\`

Bagian berikutnya soal performa — indeks untuk subquery RLS dan cara memakai JWT claims.`,
    published: false,
    daysAgo: 3,
  },
]

async function main() {
  await prisma.message.deleteMany()
  await prisma.post.deleteMany()

  const usedSlugs = new Set<string>()

  const postData = postTemplates.map((t) => ({
    title: t.title,
    slug: uniqueSlug(t.title, usedSlugs),
    excerpt: t.excerpt,
    content: t.content,
    published: t.published,
    createdAt: new Date(Date.now() - t.daysAgo * 24 * 60 * 60 * 1000),
  }))

  await prisma.post.createMany({ data: postData })

  const messageData = Array.from({ length: 8 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.recent({ days: 30 }),
  }))

  await prisma.message.createMany({ data: messageData })

  return { posts: postData.length, messages: messageData.length }
}

main()
  .catch((e) => {
    process.exitCode = 1
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
