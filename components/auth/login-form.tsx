"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { toast } from "sonner"

import { signIn, type AuthState } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

const initialState: AuthState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Masuk…" : "Masuk"}
    </Button>
  )
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(signIn, initialState)

  useEffect(() => {
    if (state.status === "error" && state.message && !state.fieldErrors) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <Field data-invalid={!!state.fieldErrors?.email || undefined}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="kamu@domain.com"
          autoComplete="email"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <FieldError id="email-error">{state.fieldErrors.email}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.password || undefined}>
        <FieldLabel htmlFor="password">Kata sandi</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
          autoComplete="current-password"
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={
            state.fieldErrors?.password ? "password-error" : undefined
          }
        />
        {state.fieldErrors?.password && (
          <FieldError id="password-error">{state.fieldErrors.password}</FieldError>
        )}
      </Field>

      <SubmitButton />

      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/register">Daftar</Link>
        </Button>
      </p>
    </form>
  )
}
