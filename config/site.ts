export const siteConfig = {
  name: "Rakitan",
  legalName: "Rakitan Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rakitan.studio",
  locale: "id-ID",
  founded: "2021",
  tagline: "Kami rakit web app yang cepat dan beneran dipakai.",
  description:
    "Rakitan adalah studio yang membangun web app dengan Next.js dan Supabase — dari halaman pertama sampai dashboard yang dipakai tim tiap hari.",
  contact: {
    email: "halo@rakitan.studio",
    whatsapp: "+62 851-2345-6789",
    location: "Jepara, Jawa Tengah",
  },
  social: {
    github: "https://github.com/rakitan-studio",
    linkedin: "https://linkedin.com/company/rakitan-studio",
    x: "https://x.com/rakitanstudio",
  },
} as const

export type NavItem = {
  title: string
  href: string
}

export const mainNav: NavItem[] = [
  { title: "Beranda", href: "/" },
  { title: "Tentang", href: "/about" },
  { title: "Layanan", href: "/services" },
  { title: "Catatan", href: "/blog" },
  { title: "Kontak", href: "/contact" },
]

export const footerNav: { label: string; items: NavItem[] }[] = [
  {
    label: "Studio",
    items: [
      { title: "Tentang kami", href: "/about" },
      { title: "Layanan", href: "/services" },
      { title: "Catatan teknis", href: "/blog" },
    ],
  },
  {
    label: "Mulai",
    items: [
      { title: "Ajukan proyek", href: "/contact" },
      { title: "Lihat hasil kerja", href: "/blog" },
      { title: "Masuk ke admin", href: "/login" },
    ],
  },
]

export type Service = {
  slug: string
  title: string
  summary: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    slug: "web-app",
    title: "Bangun web app dari nol",
    summary:
      "Dari ide di kepala jadi aplikasi yang jalan di produksi. Next.js App Router, database Supabase, deploy ke Vercel.",
    deliverables: [
      "Arsitektur App Router & Server Components",
      "Database + auth Supabase dengan RLS",
      "Deploy otomatis lewat GitHub & Vercel",
    ],
  },
  {
    slug: "dashboard",
    title: "Dashboard internal",
    summary:
      "Panel admin buat tim kamu kelola data sendiri. CRUD, pencarian, dan akses yang dijaga per peran.",
    deliverables: [
      "CRUD lengkap dengan validasi",
      "Pencarian & filter yang tersimpan di URL",
      "Proteksi rute dan kontrol akses",
    ],
  },
  {
    slug: "revamp",
    title: "Rapikan situs lama",
    summary:
      "Situs lambat atau susah diurus kami pindah ke stack yang enak dirawat tanpa kehilangan konten.",
    deliverables: [
      "Migrasi konten tanpa putus",
      "Skor performa & SEO yang naik",
      "Kode yang gampang diteruskan tim",
    ],
  },
]

export type ProcessStep = {
  no: string
  title: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Petakan masalah",
    detail:
      "Kita duduk bareng, bedah kebutuhan, dan sepakati apa yang benar-benar perlu dibangun dulu.",
  },
  {
    no: "02",
    title: "Rakit MVP",
    detail:
      "Versi pertama yang bisa dipakai jadi dalam hitungan minggu, bukan bulan. Fokus ke alur inti.",
  },
  {
    no: "03",
    title: "Uji & rilis",
    detail:
      "Dicoba di perangkat nyata, dirapikan, lalu rilis ke produksi dengan deploy yang aman.",
  },
  {
    no: "04",
    title: "Rawat & kembangkan",
    detail:
      "Setelah hidup, kami bantu pantau, perbaiki, dan tambah fitur sesuai data pemakaian.",
  },
]

export type Stat = {
  value: string
  label: string
}

export const stats: Stat[] = [
  { value: "5 thn", label: "Merakit web app" },
  { value: "30+", label: "Proyek dirilis" },
  { value: "100%", label: "Next.js & Supabase" },
]
