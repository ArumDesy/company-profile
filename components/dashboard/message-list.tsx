"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { deleteMessage } from "@/lib/actions/messages"
import type { Message } from "@/lib/messages"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso))
}

export function MessageList({ messages }: { messages: Message[] }) {
  const [optimisticMessages, removeOptimistic] = useOptimistic(
    messages,
    (prev, id: string) => prev.filter((m) => m.id !== id)
  )
  const [, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = (id: string) => {
    startTransition(async () => {
      removeOptimistic(id)
      const result = await deleteMessage(id)
      if (!result.ok) {
        toast.error(result.message ?? "Gagal menghapus pesan. Coba lagi.")
        router.refresh()
      }
    })
  }

  if (optimisticMessages.length === 0) {
    return (
      <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Kosong
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Belum ada pesan masuk. Formulir kontak yang terkirim akan muncul di sini.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border border border-border">
      {optimisticMessages.map((message) => (
        <article key={message.id} className="bg-card px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-semibold">{message.name}</span>
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 font-mono text-xs font-normal text-muted-foreground hover:text-foreground"
                >
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                </Button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {message.content}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {formatDate(message.created_at)}
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="shrink-0 text-destructive hover:text-destructive">
                  Hapus
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus pesan ini?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Pesan dari <strong>{message.name}</strong> akan dihapus permanen. Aksi ini tidak bisa dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(message.id)}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </article>
      ))}
    </div>
  )
}
