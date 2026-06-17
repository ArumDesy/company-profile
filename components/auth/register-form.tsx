"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { toast } from "sonner"

import { signUp, type AuthState } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { GoogleButton } from "@/components/auth/google-button"

const initialState: AuthState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Membuat akun…" : "Buat akun"}
    </Button>
  )
}

export function RegisterForm() {
  const [state, formAction] = useActionState(signUp, initialState)

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success("Akun berhasil dibuat")
    } else if (state.status === "error" && state.message && !state.fieldErrors) {
      toast.error(state.message)
    }
  }, [state])

  if (state.status === "success") {
    return (
      <div className="space-y-4">
        <div className="border border-border bg-card p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Satu langkah lagi
          </p>
          <h2 className="mt-2 font-semibold">Cek email kamu</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {state.message ?? "Link konfirmasi sudah dikirim. Klik link itu untuk mengaktifkan akun, lalu masuk."}
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Sudah konfirmasi?{" "}
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/login">Masuk sekarang</Link>
          </Button>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <GoogleButton />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          atau
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} noValidate className="space-y-5">
      <Field data-invalid={!!state.fieldErrors?.email || undefined}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="kamu@domain.com"
          autoComplete="email"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "reg-email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <FieldError id="reg-email-error">{state.fieldErrors.email}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.password || undefined}>
        <FieldLabel htmlFor="password">Kata sandi</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
          autoComplete="new-password"
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={
            state.fieldErrors?.password ? "reg-password-error" : undefined
          }
        />
        {state.fieldErrors?.password && (
          <FieldError id="reg-password-error">{state.fieldErrors.password}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.confirmPassword || undefined}>
        <FieldLabel htmlFor="confirmPassword">Konfirmasi kata sandi</FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Ulangi kata sandi"
          autoComplete="new-password"
          aria-invalid={!!state.fieldErrors?.confirmPassword}
          aria-describedby={
            state.fieldErrors?.confirmPassword ? "confirm-error" : undefined
          }
        />
        {state.fieldErrors?.confirmPassword && (
          <FieldError id="confirm-error">{state.fieldErrors.confirmPassword}</FieldError>
        )}
      </Field>

      <SubmitButton />

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/login">Masuk</Link>
        </Button>
      </p>
      </form>
    </div>
  )
}
