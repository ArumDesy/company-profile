"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      aria-label={copied ? "Tersalin" : "Salin kode"}
      title={copied ? "Tersalin" : "Salin kode"}
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-measure-ink" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </Button>
  )
}
