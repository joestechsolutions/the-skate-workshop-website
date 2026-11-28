'use client'

import { useState } from 'react'
import { Loader2, Lock } from 'lucide-react'

// The pass code screen of the download page. The install links are not in this file or in the page: the server
// sends them only after the right code (`/api/download-access`), and they are kept in memory for this visit only.

type Links = { ios: string | null; android: string | null }

export default function DownloadGate() {
  const [code, setCode] = useState('')
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [links, setLinks] = useState<Links | null>(null)

  const open = async (event: React.FormEvent) => {
    event.preventDefault()
    if (checking || code.trim() === '') return
    setChecking(true)
    setWrong(false)
    try {
      const response = await fetch('/api/download-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const answer = (await response.json().catch(() => null)) as ({ ok?: boolean } & Partial<Links>) | null
      if (response.ok && answer?.ok) setLinks({ ios: answer.ios ?? null, android: answer.android ?? null })
      else setWrong(true)
    } catch {
      setWrong(true)
    } finally {
      setChecking(false)
    }
  }

  if (links) {
    return (
      <div className="text-center" data-testid="download-links">
        {links.ios ? (
          <div className="mb-12">
            <p className="text-body text-white/70 mb-8 max-w-xl mx-auto">
              On iPhone the app installs through TestFlight, Apple&apos;s free app for early access.
            </p>
            <a href={links.ios} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-16 py-6 inline-block">
              Get it on TestFlight
            </a>
          </div>
        ) : null}
        {links.android ? (
          <div className="mb-12">
            <p className="text-body text-white/70 mb-8 max-w-xl mx-auto">
              On Android the app installs from a file. Your phone will ask before it installs it.
            </p>
            <a href={links.android} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-16 py-6 inline-block">
              Get the Android file
            </a>
          </div>
        ) : null}
        {!links.ios && !links.android ? (
          <p className="text-body text-white/70 max-w-xl mx-auto">The code is right, but there is no install link here yet. Ask the person who invited you.</p>
        ) : (
          <p className="text-body-sm text-white/40 max-w-xl mx-auto">
            After you sign up, tap Ask to join. A coach says yes before you see anything from the crew.
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={open} className="w-full max-w-md mx-auto text-center" noValidate>
      <label htmlFor="pass-code" className="block text-body text-white/70 mb-6">
        If you were invited, enter your pass code.
      </label>
      <div className="relative mb-4">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" aria-hidden="true" />
        <input
          id="pass-code"
          type="password"
          value={code}
          onChange={(event) => {
            setCode(event.target.value)
            setWrong(false)
          }}
          placeholder="Pass code"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={wrong}
          aria-describedby={wrong ? 'pass-code-wrong' : undefined}
          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-ink-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary ${wrong ? 'border-brand-primary' : 'border-line'}`}
        />
      </div>
      {wrong ? (
        <p id="pass-code-wrong" role="alert" className="text-body-sm text-white mb-4">
          That code is not right.
        </p>
      ) : null}
      <button type="submit" disabled={checking || code.trim() === ''} className="btn-primary text-lg px-16 py-6 inline-flex items-center justify-center gap-3 disabled:opacity-60">
        {checking ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : null}
        Open
      </button>
    </form>
  )
}
