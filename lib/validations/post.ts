import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter."),
  excerpt: z.string().min(10, "Ringkasan minimal 10 karakter."),
  content: z.string().min(20, "Konten terlalu pendek — tulis lebih."),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")])
    .transform((val) => val === "on" || val === "true")
    .default(false),
})

export type PostInput = z.infer<typeof postSchema>
