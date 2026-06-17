import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Format email belum benar. Cek lagi."),
  password: z.string().min(1, "Kata sandi tidak boleh kosong."),
})

export const registerSchema = z
  .object({
    email: z.string().email("Format email belum benar. Cek lagi."),
    password: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter."),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi tidak boleh kosong."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi dan konfirmasinya tidak cocok.",
    path: ["confirmPassword"],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
