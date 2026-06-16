"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FormFields = {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

const emptyForm: FormFields = { name: "", email: "", message: "" }

function validateForm(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.name.trim()) errors.name = "Nama tidak boleh kosong."
  if (!fields.email.trim()) {
    errors.email = "Email tidak boleh kosong."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Format email belum benar. Cek lagi."
  }
  if (!fields.message.trim()) errors.message = "Pesan tidak boleh kosong."
  else if (fields.message.trim().length < 10) errors.message = "Pesan terlalu pendek — tulis sedikit lebih."
  return errors
}

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validateForm(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    toast.success("Pesan kamu masuk. Kami balas lewat email.")
    setFields(emptyForm)
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field data-invalid={!!errors.name || undefined}>
        <FieldLabel htmlFor="name">Nama</FieldLabel>
        <Input
          id="name"
          name="name"
          value={fields.name}
          onChange={handleChange}
          placeholder="Nama kamu atau perusahaan"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.email || undefined}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="email@perusahaan.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        <FieldDescription>Kami balas ke sini, biasanya dalam satu hari kerja.</FieldDescription>
        {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.message || undefined}>
        <FieldLabel htmlFor="message">Pesan</FieldLabel>
        <Textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="Ceritakan proyeknya — scope, tahap sekarang, dan apa yang ingin dicapai."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full sm:w-auto">
        Kirim pesan
      </Button>
    </form>
  )
}
