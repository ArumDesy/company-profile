"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { submitContact, type ContactState } from "@/lib/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

const initialState: ContactState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Mengirim…" : "Kirim pesan"}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
      formRef.current?.reset()
    } else if (state.status === "error" && state.message && !state.fieldErrors) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      <Field data-invalid={!!state.fieldErrors?.name || undefined}>
        <FieldLabel htmlFor="name">Nama</FieldLabel>
        <Input
          id="name"
          name="name"
          placeholder="Nama kamu atau perusahaan"
          autoComplete="name"
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
        />
        {state.fieldErrors?.name && (
          <FieldError id="name-error">{state.fieldErrors.name}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.email || undefined}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@perusahaan.com"
          autoComplete="email"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        <FieldDescription>Kami balas ke sini, biasanya dalam satu hari kerja.</FieldDescription>
        {state.fieldErrors?.email && (
          <FieldError id="email-error">{state.fieldErrors.email}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.message || undefined}>
        <FieldLabel htmlFor="message">Pesan</FieldLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Ceritakan proyeknya — scope, tahap sekarang, dan apa yang ingin dicapai."
          rows={5}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
        {state.fieldErrors?.message && (
          <FieldError id="message-error">{state.fieldErrors.message}</FieldError>
        )}
      </Field>

      <SubmitButton />
    </form>
  )
}
