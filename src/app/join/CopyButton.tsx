'use client'

import { useEffect, useRef, useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked: the code is still on screen to read.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="mt-4 min-h-[44px] rounded-full border border-white/30 px-6 text-sm uppercase tracking-widest text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
