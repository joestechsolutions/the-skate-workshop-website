import { NextRequest, NextResponse } from 'next/server'
import { accessFor } from '@/lib/download-access'

// Checks the download page's pass code on the server and, only when it is right, answers with the install links.
// A wrong code waits before it answers, so guessing is slow. Nothing is cached anywhere.

const WRONG_WAIT_MS = 800
const headers = { 'Cache-Control': 'no-store' }

export async function POST(request: NextRequest) {
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
