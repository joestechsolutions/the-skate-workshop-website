import { describe, it, expect } from 'vitest'
import { accessFor, sameCode, MIN_CODE_LENGTH } from '../lib/download-access'

const settings = {
  DOWNLOAD_PASSCODE: 'Kickflip-2026',
  DOWNLOAD_IOS_URL: 'https://example.com/ios',
  DOWNLOAD_ANDROID_URL: 'https://example.com/android.apk',
}

describe('the download page pass code', () => {
  it('is closed to everyone while no pass code is set, or one shorter than the minimum', () => {
    expect(accessFor('anything', {})).toEqual({ ok: false, reason: 'closed' })
    expect(accessFor('', { DOWNLOAD_PASSCODE: '' })).toEqual({ ok: false, reason: 'closed' })
    const short = 'x'.repeat(MIN_CODE_LENGTH - 1)
    expect(accessFor(short, { DOWNLOAD_PASSCODE: short })).toEqual({ ok: false, reason: 'closed' })
  })

  it('refuses a wrong code, a missing one, and anything that is not text', () => {
    for (const code of ['kickflip-2025', 'Kickflip-2026x', '', null, undefined, 42, { code: 'Kickflip-2026' }, 'k'.repeat(500)]) {
      expect(accessFor(code, settings)).toEqual({ ok: false, reason: 'wrong' })
    }
  })

  it('opens for the right code, whatever the capitals and the spaces around it, and hands out the links', () => {
    for (const code of ['Kickflip-2026', 'kickflip-2026', '  KICKFLIP-2026 ']) {
      expect(accessFor(code, settings)).toEqual({ ok: true, links: { ios: 'https://example.com/ios', android: 'https://example.com/android.apk' } })
    }
  })

  it('hands out only https links: a missing or odd one is left out', () => {
    expect(accessFor('Kickflip-2026', { DOWNLOAD_PASSCODE: 'Kickflip-2026' })).toEqual({ ok: true, links: { ios: null, android: null } })
    expect(accessFor('Kickflip-2026', { ...settings, DOWNLOAD_IOS_URL: 'http://example.com/ios', DOWNLOAD_ANDROID_URL: 'javascript:alert(1)' })).toEqual({
      ok: true,
      links: { ios: null, android: null },
    })
  })

  it('compares codes by every character', () => {
    expect(sameCode('abcdefgh', 'abcdefgh')).toBe(true)
    expect(sameCode('abcdefgh', 'abcdefgi')).toBe(false)
    expect(sameCode('abcdefgh', 'abcdefg')).toBe(false)
    expect(sameCode('', 'abcdefgh')).toBe(false)
  })
})
