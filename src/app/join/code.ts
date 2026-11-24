// Crew code: eight characters, no look-alikes. Shown as XXXX-XXXX.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const BARE = new RegExp(`^[${ALPHABET}]{8}$`)
const DASHED = new RegExp(`^[${ALPHABET}]{4}-[${ALPHABET}]{4}$`)

/** Returns the 8-character code (upper case, no dash) or null. Never returns raw input. */
export function parseCrewCode(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length > 40) return null
  const s = raw.toUpperCase().replace(/\s+/g, '')
  if (BARE.test(s)) return s
  if (DASHED.test(s)) return s.replace('-', '')
  return null
}

export const formatCrewCode = (code: string) => `${code.slice(0, 4)}-${code.slice(4)}`

export const deepLink = (code: string) => `skateworkshop://join?code=${code}`

/** Read out as separate characters, with a pause between the halves. */
export const spokenCode = (code: string) =>
  `${code.slice(0, 4).split('').join(' ')}, ${code.slice(4).split('').join(' ')}`
