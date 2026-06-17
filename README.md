# Rakitan

Company profile buat studio yang bikin web app pakai Next.js dan Supabase.
Situsnya sekaligus jadi contoh hasil kerja: halaman publik buat calon klien,
catatan teknis sebagai portofolio, dan dashboard admin yang dijaga buat ngurus
isinya.

Dibangun pelan-pelan sebagai satu produk yang tumbuh, dari situs statis sampai
jadi MVP dengan database, login, dan editor konten beneran.

## Yang dipakai

- Next.js 16 (App Router, Turbopack, React 19)
- Supabase: Postgres, Auth email dan Google, plus Row Level Security
- shadcn/ui di atas Tailwind CSS v4
- Zod buat validasi input di Server Action
- MDXEditor buat nulis konten di admin, disimpan sebagai Markdown
- react-markdown buat nampilin artikel, lengkap sama KaTeX dan Mermaid
- Prisma cuma dipakai pas seeding data awal
- Bun buat install dan jalanin semuanya

## Jalanin di lokal

Proyek ini pakai Bun, bukan npm atau pnpm.

```bash
bun install
```

Copy file contoh env, terus isi nilainya:

```bash
cp .env.example .env.local
```

Nyalain server dev:

```bash
bun run dev
```

Buka http://localhost:3000.

## Isi env

Semua nilainya ada di dashboard Supabase, bagian Project Settings.

| Variabel | Buat apa |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Kunci publik buat klien di browser |
| `SUPABASE_SECRET_KEY` | Kunci server buat operasi admin, jangan diawali `NEXT_PUBLIC_` |
| `ADMIN_EMAILS` | Email yang boleh masuk dashboard, pisah pakai koma |
| `DATABASE_URL` | Koneksi Postgres lewat pooler mode transaksi (port 6543) |
| `DIRECT_URL` | Koneksi Postgres mode sesi buat migrasi (port 5432) |
| `NEXT_PUBLIC_SITE_URL` | URL produksi buat metadata dan tautan kanonik |

`.env.local` nggak ikut dikomit. Buat produksi, nilainya diatur di project Vercel.

## Skrip

| Perintah | Buat apa |
| --- | --- |
| `bun run dev` | Server dev |
| `bun run build` | Build produksi |
| `bun run start` | Jalanin hasil build |
| `bun run lint` | Cek ESLint |
| `bun run icons` | Bikin ikon dan favicon |

## Susunan folder

```
app/         Rute App Router: halaman publik, dashboard, auth, plus file SEO
components/  Komponen UI, dipisah per fitur, dijaga di bawah 500 baris
lib/         Klien Supabase, Server Action, validasi Zod, dan helper data
config/      Brand dan konten, ngumpul di satu file
prisma/      Skema dan seeder data awal
proxy.ts     Refresh sesi dan jaga rute dashboard (pengganti middleware)
```

## Soal akses

Dashboard cuma buat admin, dan dijaga berlapis. Di sisi aplikasi, email dicek
ke `ADMIN_EMAILS` pas login dan di tiap Server Action. Di sisi database, Row
Level Security pakai fungsi `private.is_admin`, jadi aturannya tetap jalan walau
lapisan aplikasi ditembus.

## Deploy

Deploy ke Vercel jalan otomatis lewat GitHub Actions, tapi cuma kepicu pas tag
rilis `week-*` didorong ke repo. Push biasa ke `main` nggak ngerilis apa-apa;
aturan ini diatur di `vercel.json` sama file workflow di `.github/workflows`.

Biar deploy jalan, setel tiga secret ini di setting repo GitHub:

| Secret | Ambil dari |
| --- | --- |
| `VERCEL_TOKEN` | Vercel, di Account Settings lalu Tokens |
| `VERCEL_ORG_ID` | File `.vercel/project.json` setelah `vercel link` |
| `VERCEL_PROJECT_ID` | File `.vercel/project.json` setelah `vercel link` |

Kalau secret udah siap, dorong tag buat rilis:

```bash
git tag week-10
git push origin week-10
```

Workflow bakal narik env dari Vercel, build artefaknya, terus rilis ke produksi.
