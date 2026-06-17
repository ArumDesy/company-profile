import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong."),
  email: z.string().email("Format email belum benar. Cek lagi."),
  message: z.string().min(10, "Pesan terlalu pendek — tulis sedikit lebih."),
})

export type ContactInput = z.infer<typeof contactSchema>
