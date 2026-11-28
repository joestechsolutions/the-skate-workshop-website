import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { accessFor } from '@/lib/download-access'
import { tooManyTries, type Counters } from '@/lib/attempt-limit'

// Checks the download page's pass code on the server and, only when it is right, answers with the install links.
// Tries are counted first (src/lib/attempt-limit.ts): too many, from one visitor or from everybody together, and the
// code is not even looked at. A wrong code also waits before it answers. Nothing is cached anywhere.

const WRONG_WAIT_MS = 800
const headers = { 'Cache-Control': 'no-store' }

/** The Worker's counters; none when this does not run on Cloudflare (a local run). */
function counters(): Counters {
  try {
    return getCloudflareContext().env as unknown as Counters
  } catch {
    return {}
  }
}

export async function POST(request: NextRequest) {
  const visitor = request.headers.get('cf-connecting-ip') ?? ''
  if (await tooManyTries(counters(), visitor)) {
    return NextResponse.json({ ok: false, wait: true }, { status: 429, headers: { ...headers, 'Retry-After': '60' } })
  }

  let code: unknown = null
  try {
    const body = (await request.json()) as { code?: unknown }
    code = body?.code
  } catch {
    code = null
  }

  const access = accessFor(code, process.env as Record<string, string | undefined>)
  if (access.ok) return NextResponse.json({ ok: true, ...access.links }, { status: 200, headers })

  await new Promise((resolve) => setTimeout(resolve, WRONG_WAIT_MS))
  return NextResponse.json({ ok: false }, { status: 401, headers })
}
