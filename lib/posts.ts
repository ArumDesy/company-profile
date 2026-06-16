export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
}

const posts: Post[] = [
  {
    id: "1",
    title: "Kenapa kami pakai Server Actions ketimbang REST",
    slug: "kenapa-server-actions",
    excerpt:
      "REST endpoint terasa berlebihan untuk web app yang deployment-nya sudah di server. Server Actions menyederhanakan stack tanpa mengorbankan keamanan.",
    published: true,
    created_at: "2024-11-10T08:00:00.000Z",
    content: `<p>Saat pertama membangun web app klien, pertanyaan pertama biasanya: "API-nya pakai apa?" REST, GraphQL, tRPC — pilihannya banyak. Tapi sejak Next.js memperkenalkan Server Actions secara stabil, kami mulai mempertanyakan apakah route <code>/api/*</code> itu benar-benar perlu.</p>

<h2>Masalah dengan REST di app kecil-menengah</h2>

<p>REST endpoint membutuhkan dua lapisan kode yang terpisah: handler di server dan <code>fetch()</code> di client. Untuk sebuah form kontak sederhana, Anda perlu tulis <code>/api/contact/route.ts</code>, lalu buat fungsi fetch di sisi client, tambah loading state, tangani error — dua kali kerja untuk satu fitur.</p>

<ul>
  <li>Duplikasi tipe data antara client dan server</li>
  <li>Token CSRF perlu diurus sendiri</li>
  <li>Endpoint terbuka kalau tidak dijaga dengan benar</li>
</ul>

<h2>Server Actions menyederhanakan banyak hal</h2>

<p>Dengan Server Actions, form submission langsung memanggil fungsi server. Validasi Zod, query ke Supabase, dan respons — semua di satu tempat. Tidak ada endpoint terpisah, tidak ada fetch manual.</p>

<pre><code>async function submitContact(formData: FormData) {
  "use server"
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, error: "Input tidak valid" }
  await supabase.from("messages").insert(parsed.data)
  return { ok: true }
}</code></pre>

<p>Keamanan bawaan: Next.js otomatis menambah proteksi CSRF, dan kode server tidak pernah terkirim ke browser. Kami belum kembali ke REST untuk fitur yang bisa ditangani Server Actions.</p>`,
  },
  {
    id: "2",
    title: "Pola RLS Supabase yang tidak bikin pusing",
    slug: "pola-rls-supabase",
    excerpt:
      "Row Level Security terasa menakutkan di awal. Setelah paham strukturnya, justru jadi lapisan perlindungan yang paling sederhana.",
    published: true,
    created_at: "2024-11-20T08:00:00.000Z",
    content: `<p>Salah satu pertanyaan yang paling sering datang dari klien baru: "Data di Supabase aman kan? Siapa yang bisa akses?" Jawabannya bergantung sepenuhnya pada Row Level Security (RLS). Tanpa RLS aktif, semua tabel terbuka untuk siapa saja yang punya kunci anon.</p>

<h2>Aktifkan dulu, baru tambah policy</h2>

<p>Langkah pertama selalu sama: aktifkan RLS di setiap tabel. Setelah RLS aktif, defaultnya adalah <em>tidak ada yang bisa akses</em>. Baru dari sana kita tambah policy satu per satu sesuai kebutuhan.</p>

<pre><code>alter table posts enable row level security;

create policy "Publik baca artikel terbit"
  on posts for select
  using (published = true);

create policy "Admin bisa semua"
  on posts for all
  using (auth.role() = 'authenticated');</code></pre>

<h2>Tiga pola yang paling sering kami pakai</h2>

<ul>
  <li><strong>Baca publik, tulis admin</strong> — untuk blog dan halaman konten</li>
  <li><strong>Baca milik sendiri</strong> — <code>auth.uid() = user_id</code> untuk data personal</li>
  <li><strong>Service role bypass</strong> — untuk operasi server-side yang tidak butuh filter user</li>
</ul>

<p>Satu aturan yang selalu kami terapkan: jangan pernah andalkan RLS saja sebagai satu-satunya lapisan keamanan. Verifikasi ulang di Server Action dengan <code>supabase.auth.getUser()</code> sebelum menyentuh data sensitif.</p>`,
  },
  {
    id: "3",
    title: "Optimistic UI tanpa bikin kode berantakan",
    slug: "optimistic-ui-nextjs",
    excerpt:
      "useOptimistic dari React 19 membuat UI terasa instan tanpa perlu state management yang rumit. Ini pola yang kami pakai di dashboard klien.",
    published: true,
    created_at: "2024-12-01T08:00:00.000Z",
    content: `<p>Salah satu keluhan paling umum soal dashboard web: tombol ditekan, lalu loading spinner berputar selama satu dua detik, baru UI berubah. Padahal di baliknya mungkin cuma operasi delete satu baris. <code>useOptimistic</code> dari React 19 menyelesaikan ini dengan elegan.</p>

<h2>Cara kerjanya sederhana</h2>

<p>Anda punya state asli dari server dan state optimistic yang diubah duluan sebelum server merespons. Kalau server berhasil, state asli sinkron dengan optimistic. Kalau gagal, React otomatis rollback ke state sebelumnya.</p>

<pre><code>"use client"

const [optimisticItems, removeOptimistic] = useOptimistic(
  items,
  (state, idToRemove: string) =>
    state.filter((item) => item.id !== idToRemove)
)

async function handleDelete(id: string) {
  removeOptimistic(id)
  await deleteAction(id)
}</code></pre>

<h2>Yang perlu diperhatikan</h2>

<ul>
  <li>Selalu tangani error: tampilkan toast kalau operasi gagal dan informasikan ke user</li>
  <li>Gunakan untuk operasi yang <em>hampir pasti</em> berhasil: delete, update status</li>
  <li>Jangan pakai untuk operasi yang hasilnya tidak pasti tanpa konfirmasi server</li>
</ul>

<p>Di proyek terakhir kami, kombinasi <code>useOptimistic</code> + Server Actions menghasilkan dashboard yang terasa lebih responsif dibanding SPA dengan REST API — tanpa satu baris state management library.</p>`,
  },
  {
    id: "4",
    title: "Streaming dan loading.tsx di App Router",
    slug: "streaming-loading-app-router",
    excerpt:
      "loading.tsx bukan cuma pengganti spinner. Dikombinasikan dengan Suspense dan skeleton, hasilnya terasa berbeda dari loading konvensional.",
    published: true,
    created_at: "2024-12-10T08:00:00.000Z",
    content: `<p>App Router mengubah cara kita memikirkan loading state. Bukan lagi satu spinner besar yang menunggu seluruh halaman siap, tapi setiap bagian halaman bisa muncul secara bertahap sesuai kecepatan datanya.</p>

<h2>loading.tsx adalah Suspense boundary otomatis</h2>

<p>Letakkan <code>loading.tsx</code> di samping <code>page.tsx</code>, dan Next.js otomatis membungkus konten halaman dengan <code>&lt;Suspense&gt;</code>. Saat navigasi terjadi, loading.tsx langsung ditampilkan sambil page.tsx dieksekusi di server.</p>

<pre><code>export default function Loading() {
  return (
    &lt;div className="space-y-4 p-6"&gt;
      &lt;Skeleton className="h-8 w-48" /&gt;
      &lt;Skeleton className="h-4 w-full" /&gt;
      &lt;Skeleton className="h-4 w-3/4" /&gt;
    &lt;/div&gt;
  )
}</code></pre>

<h2>Skeleton vs spinner: mana yang lebih baik?</h2>

<p>Skeleton menunjukkan <em>bentuk</em> konten yang akan datang. Pengguna tahu kira-kira apa yang akan muncul, sehingga transisi terasa lebih halus. Spinner hanya bilang "tunggu" tanpa konteks.</p>

<ul>
  <li>Skeleton untuk konten yang bentuknya bisa diprediksi: daftar artikel, kartu profil</li>
  <li>Spinner untuk proses yang hasilnya belum jelas: upload file, submit form</li>
  <li>Kombinasi keduanya untuk halaman kompleks dengan beberapa bagian</li>
</ul>

<p>Satu hal yang sering terlewat: <code>loading.tsx</code> hanya aktif saat navigasi antara route, bukan saat refresh halaman. Untuk data yang di-fetch di dalam komponen, tetap butuh <code>&lt;Suspense&gt;</code> manual.</p>`,
  },
]

export function getAllPosts(): Post[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.published)
}
