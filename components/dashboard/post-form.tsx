"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createPost, updatePost, type PostFormState } from "@/lib/actions/posts"
import type { Post } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { PostEditor } from "@/components/editor/post-editor"
import { EditorGuide } from "@/components/editor/editor-guide"

const initialState: PostFormState = { status: "idle" }

function SubmitButton({ mode }: { mode: "create" | "update" }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending
        ? mode === "create"
          ? "Menyimpan…"
          : "Memperbarui…"
        : mode === "create"
          ? "Simpan artikel"
          : "Perbarui artikel"}
    </Button>
  )
}

type PostFormProps =
  | { mode: "create"; post?: never }
  | { mode: "update"; post: Post }

export function PostForm({ mode, post }: PostFormProps) {
  const action = mode === "create" ? createPost : updatePost.bind(null, post.id)
  const [state, formAction] = useActionState(action, initialState)
  const router = useRouter()

  const initialMarkdown = post?.content ?? ""
  const [content, setContent] = useState(initialMarkdown)
  const [published, setPublished] = useState(post?.published ?? false)

  useEffect(() => {
    if (state.status === "error" && state.message && !state.fieldErrors) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} noValidate className="space-y-6">
      <input type="hidden" name="content" value={content} readOnly />
      <input type="hidden" name="published" value={published ? "on" : "false"} />

      <Field data-invalid={!!state.fieldErrors?.title || undefined}>
        <FieldLabel htmlFor="title">Judul artikel</FieldLabel>
        <Input
          id="title"
          name="title"
          placeholder="Judul yang jelas dan deskriptif"
          defaultValue={post?.title ?? ""}
          aria-invalid={!!state.fieldErrors?.title}
          aria-describedby={state.fieldErrors?.title ? "title-error" : undefined}
        />
        {state.fieldErrors?.title && (
          <FieldError id="title-error">{state.fieldErrors.title}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!state.fieldErrors?.excerpt || undefined}>
        <FieldLabel htmlFor="excerpt">Ringkasan</FieldLabel>
        <Textarea
          id="excerpt"
          name="excerpt"
          placeholder="Satu–dua kalimat yang muncul di daftar artikel."
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          aria-invalid={!!state.fieldErrors?.excerpt}
          aria-describedby={state.fieldErrors?.excerpt ? "excerpt-error" : undefined}
        />
        {state.fieldErrors?.excerpt && (
          <FieldError id="excerpt-error">{state.fieldErrors.excerpt}</FieldError>
        )}
      </Field>

      <div className="space-y-2">
        <FieldLabel htmlFor="content-editor">Isi artikel</FieldLabel>
        <EditorGuide />
        <PostEditor
          initialMarkdown={initialMarkdown}
          value={content}
          onChange={setContent}
          invalid={!!state.fieldErrors?.content}
        />
        {state.fieldErrors?.content && (
          <FieldError id="content-error">{state.fieldErrors.content}</FieldError>
        )}
      </div>

      <div className="flex items-center gap-3 border border-border bg-card px-4 py-3">
        <Switch
          id="published-switch"
          checked={published}
          onCheckedChange={setPublished}
          aria-label="Status terbit"
        />
        <div>
          <FieldLabel htmlFor="published-switch" className="cursor-pointer">
            {published ? "Terbit" : "Draf"}
          </FieldLabel>
          <p className="text-xs text-muted-foreground">
            {published
              ? "Artikel ini tampil di halaman blog publik."
              : "Artikel disimpan sebagai draf, tidak tampil di blog."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <SubmitButton mode={mode} />
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/posts")}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
