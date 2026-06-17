const oauthMessages: Record<string, string> = {
  denied: "Akun Google ini tidak terdaftar sebagai admin.",
  oauth: "Login Google terputus di tengah jalan. Coba ulangi.",
  flow_state_already_used: "Tautan login sudah dipakai. Mulai lagi dari tombol masuk.",
  flow_state_expired: "Sesi login keburu kedaluwarsa. Coba masuk sekali lagi.",
  flow_state_not_found: "Sesi login tidak ditemukan. Mulai lagi dari tombol masuk.",
  bad_oauth_state: "Sesi login tidak cocok. Coba masuk lagi dari awal.",
  bad_oauth_callback: "Balasan dari Google tidak lengkap. Coba masuk lagi.",
  access_denied: "Login dibatalkan. Coba lagi kalau memang mau masuk.",
  server_error: "Server autentikasi sedang bermasalah. Coba beberapa saat lagi.",
  temporarily_unavailable: "Layanan login sedang sibuk. Coba sebentar lagi.",
  provider_email_needs_verification:
    "Email Google kamu belum terverifikasi. Verifikasi dulu, lalu coba lagi.",
  invalid_request: "Permintaan login tidak valid. Coba ulangi dari tombol masuk.",
}

export function humanizeOAuthError(input: {
  error?: string | null
  errorCode?: string | null
}): string | null {
  const key = input.errorCode || input.error
  if (!key) return null
  return oauthMessages[key] ?? "Login gagal. Coba ulangi dari tombol masuk."
}
