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
      "Melakukan migrasi incremental tanpa menutup fitur yang sedang berjalan. Pola yang kami pakai saat memindahkan proyek klien ke App Router Next.js 15.",
    content: `<p>App Router bukan sekadar cara baru menulis halaman. Ini perubahan paradigma dari "fetch di client" ke "render di server secara default". Kami sudah memigrasikan tiga proyek klien dan menemukan pola yang paling minim risiko.</p>

<h2>Mulai dari route baru, bukan yang lama</h2>

<p>Kesalahan umum: mencoba memindahkan semua halaman sekaligus. Yang benar adalah membiarkan <code>pages/</code> tetap berjalan dan hanya menulis halaman baru di <code>app/</code>. Next.js mendukung keduanya berdampingan.</p>

<ul>
  <li>Pindahkan halaman statis dulu — tidak ada data fetching, tidak ada auth</li>
  <li>Lanjutkan ke halaman dengan fetch sederhana</li>
  <li>Terakhir, halaman dengan auth dan protected route</li>
</ul>

<h2>Perbedaan data fetching yang perlu dipahami</h2>

<p>Di Pages Router, <code>getServerSideProps</code> adalah satu-satunya titik fetch di server. Di App Router, setiap Server Component bisa fetch langsung — termasuk komponen yang bersarang jauh di dalam.</p>

<pre><code>async function PostList() {
  const posts = await db.post.findMany({ where: { published: true } })
  return posts.map(p =&gt; &lt;PostCard key={p.id} post={p} /&gt;)
}</code></pre>

<p>Hasilnya: tidak ada data waterfall, tidak ada prop drilling panjang. Setiap komponen fetch datanya sendiri secara paralel.</p>`,
    published: true,
    daysAgo: 90,
  },
  {
    title: "Mengapa kami pilih Supabase RLS dibanding backend terpisah",
    excerpt:
      "Database yang bisa menjaga dirinya sendiri. Row Level Security Supabase menggantikan layer permission yang biasanya ditulis manual di Express atau tRPC.",
    content: `<p>Setiap kali membahas arsitektur dengan klien baru, ada pertanyaan yang selalu muncul: "Perlu backend terpisah tidak?" Untuk sebagian besar proyek web app yang kami tangani, jawabannya tidak — dan Supabase RLS adalah alasannya.</p>

<h2>Apa itu Row Level Security</h2>

<p>RLS adalah fitur PostgreSQL yang memungkinkan kita mendefinisikan aturan akses langsung di level baris tabel. Bukan di aplikasi, tapi di database itu sendiri. Artinya, bahkan jika ada bug di kode aplikasi, data tetap terlindungi.</p>

<pre><code>alter table posts enable row level security;

create policy "publik baca yang terbit"
  on posts for select
  using (published = true);

create policy "penulis kelola miliknya"
  on posts for all
  using (auth.uid() = author_id);</code></pre>

<h2>Kapan RLS tidak cukup</h2>

<ul>
  <li>Logika bisnis kompleks yang membutuhkan beberapa tabel sekaligus</li>
  <li>Integrasi dengan sistem eksternal yang butuh webhook</li>
  <li>Operasi batch yang perlu service role bypass</li>
</ul>

<p>Untuk kasus-kasus di atas, kami tetap pakai Server Actions atau Route Handler — bukan REST API terpisah. Satu stack, lebih sedikit yang perlu dijaga.</p>`,
    published: true,
    daysAgo: 75,
  },
  {
    title: "Pola Server Action yang kami pakai di semua proyek",
    excerpt:
      "Bukan hanya cara memanggil fungsi server. Server Actions mengubah cara berpikir tentang form, validasi, dan state di Next.js.",
    content: `<p>Server Actions di Next.js 15 sudah stabil dan kami sudah menggunakannya di produksi. Ada beberapa pola yang selalu kami terapkan di setiap proyek — bukan karena ikut-ikutan, tapi karena sudah terbukti mengurangi bug dan mempercepat development.</p>

<h2>Validasi Zod sebelum sentuh DB</h2>

<p>Aturan pertama: tidak ada data yang masuk ke database sebelum melewati Zod. Bukan karena tidak percaya frontend — tapi karena Server Actions bisa dipanggil dari mana saja, termasuk curl.</p>

<pre><code>"use server"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function submitForm(prevState: State, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors }
  }
  await db.from("messages").insert(result.data)
  revalidatePath("/dashboard/messages")
  return { success: true }
}</code></pre>

<h2>Verifikasi user di setiap action yang menulis</h2>

<ul>
  <li>Jangan andalkan middleware saja — middleware bisa di-bypass (CVE-2025-29927)</li>
  <li>Panggil <code>supabase.auth.getUser()</code> di awal setiap action yang menulis data</li>
  <li>Return error generik ke client, log detail di server</li>
</ul>

<p>Dua aturan ini — validasi Zod dan verifikasi user — sudah cukup untuk menjaga sebagian besar attack surface di web app biasa.</p>`,
    published: true,
    daysAgo: 60,
  },
  {
    title: "Optimasi Core Web Vitals di Next.js: dari 65 ke 98 dalam tiga hari",
    excerpt:
      "LCP lambat bukan berarti server lambat. Sebagian besar waktu tersembunyi di gambar, font, dan CSS yang belum dioptimasi.",
    content: `<p>Salah satu klien datang dengan keluhan sederhana: situs mereka terasa lambat. Setelah audit Lighthouse, skor Performance-nya 65. Dalam tiga hari kerja kami membawanya ke 98 — tanpa mengganti hosting, tanpa CDN berbayar.</p>

<h2>Masalah pertama: gambar tanpa ukuran eksplisit</h2>

<p>Semua elemen <code>&lt;img&gt;</code> tanpa atribut <code>width</code> dan <code>height</code> menyebabkan Cumulative Layout Shift (CLS). Migrasi ke <code>next/image</code> dengan <code>sizes</code> yang benar menyelesaikan ini.</p>

<pre><code>&lt;Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={630}
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
/&gt;</code></pre>

<h2>Masalah kedua: Google Fonts di-load via &lt;link&gt;</h2>

<ul>
  <li>Ganti ke <code>next/font/google</code> — font di-bundle, zero layout shift</li>
  <li>Tambah <code>display: swap</code> untuk fallback yang bersih</li>
  <li>Preload subset yang dipakai saja</li>
</ul>

<h2>Masalah ketiga: JavaScript yang tidak dibutuhkan di initial load</h2>

<p>Dengan App Router, Server Components tidak mengirim JavaScript ke browser. Kami mengidentifikasi komponen-komponen yang tidak perlu interaksi client dan menghapus direktif <code>"use client"</code> dari sana. Hasilnya: bundle size turun 40%.</p>`,
    published: true,
    daysAgo: 45,
  },
  {
    title: "Draft: Streaming dengan Suspense di dashboard kompleks",
    excerpt:
      "Masih eksperimen. Beberapa widget dashboard dengan data berbeda — cara membuatnya semua stream tanpa saling blokir.",
    content: `<p>Ini masih dalam tahap percobaan di internal studio. Belum kami terapkan di proyek klien karena butuh lebih banyak pengujian edge case.</p>

<h2>Konsep dasarnya</h2>

<p>Dashboard biasanya punya beberapa widget dengan data dari sumber berbeda. Dengan Suspense, setiap widget bisa stream secara independen — widget yang datanya cepat langsung muncul tanpa menunggu yang lain.</p>

<pre><code>export default function Dashboard() {
  return (
    &lt;div className="grid grid-cols-3 gap-4"&gt;
      &lt;Suspense fallback={&lt;SkeletonCard /&gt;}&gt;
        &lt;RevenueWidget /&gt;
      &lt;/Suspense&gt;
      &lt;Suspense fallback={&lt;SkeletonCard /&gt;}&gt;
        &lt;UsersWidget /&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  )
}</code></pre>

<ul>
  <li>Setiap Suspense boundary adalah titik streaming independen</li>
  <li>Browser mulai render HTML parsial begitu ada yang selesai</li>
  <li>User melihat konten lebih cepat meski total waktu sama</li>
</ul>`,
    published: false,
    daysAgo: 10,
  },
  {
    title: "Draft: Arsitektur multi-tenant dengan Supabase",
    excerpt:
      "Masih ditulis. Pola RLS untuk aplikasi SaaS di mana satu database melayani banyak tenant sekaligus.",
    content: `<p>Artikel ini belum selesai. Sedang kami kerjakan bersamaan dengan proyek SaaS klien pertama yang pakai pola ini.</p>

<h2>Problem statement</h2>

<p>Satu database, banyak tenant, data harus terisolasi sempurna. RLS adalah solusinya, tapi implementasinya butuh pola yang konsisten di semua tabel.</p>

<pre><code>create policy "tenant isolation"
  on semua_tabel for all
  using (tenant_id = (
    select tenant_id from profiles
    where id = auth.uid()
  ));</code></pre>

<p>Akan ada bagian tentang performance — query <code>profiles</code> di setiap RLS policy bisa jadi bottleneck kalau tidak diindeks dengan benar. Dan cara memakai JWT claims untuk menghindari subquery ini.</p>`,
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

  console.log(`Seeded ${postData.length} posts dan ${messageData.length} messages.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
