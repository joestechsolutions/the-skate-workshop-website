import { describe, it, expect, vi } from 'vitest'
import { tooManyTries, type Counter } from '../lib/attempt-limit'

const counter = (success: boolean): Counter & { limit: ReturnType<typeof vi.fn> } => ({ limit: vi.fn(async () => ({ success })) })

describe('the limit on pass code tries', () => {
  it('lets a try through while both counters say yes, and counts it on both', async () => {
    const all = counter(true)
    const one = counter(true)
    expect(await tooManyTries({ DOWNLOAD_TRIES_ALL: all, DOWNLOAD_TRIES_PER_VISITOR: one }, '203.0.113.7')).toBe(false)
    expect(all.limit).toHaveBeenCalledWith({ key: 'all' })
    expect(one.limit).toHaveBeenCalledWith({ key: '203.0.113.7' })
  })

  it('a visitor over their own limit is refused WITHOUT using up a try of the shared counter (one machine cannot lock everybody out)', async () => {
    const all = counter(true)
    const one = counter(false)
    expect(await tooManyTries({ DOWNLOAD_TRIES_ALL: all, DOWNLOAD_TRIES_PER_VISITOR: one }, '203.0.113.7')).toBe(true)
    expect(all.limit).not.toHaveBeenCalled()
  })

  it('refuses when everybody together has tried too often', async () => {
    expect(await tooManyTries({ DOWNLOAD_TRIES_ALL: counter(false), DOWNLOAD_TRIES_PER_VISITOR: counter(true) }, '203.0.113.7')).toBe(true)
  })

  it('a visitor with no address shares one key; no counters at all (a local run) lets the try through', async () => {
    const one = counter(true)
    await tooManyTries({ DOWNLOAD_TRIES_PER_VISITOR: one }, '')
    expect(one.limit).toHaveBeenCalledWith({ key: 'unknown' })
    expect(await tooManyTries({}, '203.0.113.7')).toBe(false)
  })

  it('a counter that fails refuses the try', async () => {
    const broken: Counter = { limit: async () => { throw new Error('down') } }
    expect(await tooManyTries({ DOWNLOAD_TRIES_ALL: broken }, '203.0.113.7')).toBe(true)
  })
})
