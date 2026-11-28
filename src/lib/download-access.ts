// The download page's pass code (the owner, 2026-11-28: "This should be behind a pass code screen").
//
// The app is being tested by an invited crew. The install links are NOT in the page: they live in the Worker's own
// settings and are sent to a browser only after the right pass code, so reading the page's source shows nothing.
//
// Worker settings (set in Cloudflare, never in this repository):
//   DOWNLOAD_PASSCODE     the pass code; with none set, or one shorter than 8 characters, the page is closed to everyone
//   DOWNLOAD_IOS_URL      the iPhone install link (https)
//   DOWNLOAD_ANDROID_URL  the Android install link (https), optional

export const MIN_CODE_LENGTH = 8

export type DownloadLinks = { ios: string | null; android: string | null }
export type DownloadAccess = { ok: true; links: DownloadLinks } | { ok: false; reason: 'closed' | 'wrong' }

type Settings = Record<string, string | undefined>

/** What a person typed and what was set, made comparable: no spaces around, and capitals do not matter. */
const tidy = (value: string) => value.trim().toLowerCase()

/** Compares every character whatever the result, so the time taken says nothing about how much was right. */
export function sameCode(given: string, expected: string): boolean {
  const a = tidy(given)
  const b = tidy(expected)
  let differs = a.length ^ b.length
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    differs |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return differs === 0
}

/** A link is handed out only if it is a plain https address. */
function link(value: string | undefined): string | null {
  const text = (value ?? '').trim()
  return /^https:\/\/[^\s]+$/.test(text) ? text : null
}

/** Whether this code opens the page, and with which links. Closed when no usable pass code is set. */
export function accessFor(code: unknown, settings: Settings): DownloadAccess {
  const expected = (settings.DOWNLOAD_PASSCODE ?? '').trim()
  if (expected.length < MIN_CODE_LENGTH) return { ok: false, reason: 'closed' }
  if (typeof code !== 'string' || code.length > 200 || !sameCode(code, expected)) return { ok: false, reason: 'wrong' }
  return { ok: true, links: { ios: link(settings.DOWNLOAD_IOS_URL), android: link(settings.DOWNLOAD_ANDROID_URL) } }
}
