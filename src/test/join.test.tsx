import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import JoinPage, { metadata } from '../app/join/page'
import StoreStep from '../app/join/StoreStep'
import { deepLink, formatCrewCode, parseCrewCode } from '../app/join/code'

const page = async (code?: string | string[]) =>
  render(await JoinPage({ searchParams: Promise.resolve(code === undefined ? {} : { code }) }))

describe('parseCrewCode', () => {
  it.each(['K7F2-QXM4', 'k7f2-qxm4', 'K7F2QXM4', ' k7f2 qxm4 ', 'K7F2 -QXM4'])('accepts %j', (raw) => {
    expect(parseCrewCode(raw)).toBe('K7F2QXM4')
  })
  it.each([undefined, '', 'K7F2', 'K7F2QXM4X', 'K7F2-QXM', 'K7F20XM4', 'K7F2QXMI', 'K7F2-QX-M4', '<b>K7F2QXM4', ['K7F2QXM4'], 'K7F2QXM4'.repeat(10)])(
    'rejects %j',
    (raw) => {
      expect(parseCrewCode(raw)).toBeNull()
    },
  )
  it('formats and links exactly', () => {
    expect(formatCrewCode('K7F2QXM4')).toBe('K7F2-QXM4')
    expect(deepLink('K7F2QXM4')).toBe('skateworkshop://join?code=K7F2QXM4')
  })
})

describe('JoinPage', () => {
  it('shows the code state', async () => {
    await page('k7f2 qxm4')
    expect(screen.getByText("YOU'RE INVITED")).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('JOIN THE CREW')
    expect(screen.getByText('K7F2-QXM4')).toHaveAttribute('aria-label', 'K 7 F 2, Q X M 4')
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open in the app' })).toHaveAttribute('href', 'skateworkshop://join?code=K7F2QXM4')
    expect(screen.getByText('Nothing happened? Open the app yourself and type the code.')).toBeInTheDocument()
    expect(screen.getByText('The app is in testing. Ask your coach for the test version.')).toBeInTheDocument()
  })
  it('shows the no-code state and never echoes bad input', async () => {
    const bad = '<script>alert(1)</script>'
    const { container } = await page(bad)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('JOIN THE CREW')
    expect(screen.getByText('This link has no crew code. Ask your coach to send it again.')).toBeInTheDocument()
    expect(screen.queryByText("YOU'RE INVITED")).toBeNull()
    expect(screen.queryByRole('link', { name: 'Open in the app' })).toBeNull()
    expect(container.innerHTML).not.toContain('alert')
  })
  it('is the same with no code at all', async () => {
    await page()
    expect(screen.getByText(/no crew code/)).toBeInTheDocument()
  })
  it('is noindex, nofollow', () => {
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })
})

describe('StoreStep', () => {
  it('shows no button while both urls are empty', () => {
    render(<StoreStep config={{ appStoreUrl: '', playStoreUrl: '' }} />)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
    expect(screen.getByText('The app is in testing. Ask your coach for the test version.')).toBeInTheDocument()
  })
  it('shows only the stores that are set', () => {
    render(<StoreStep config={{ appStoreUrl: 'https://apps.apple.com/app/x', playStoreUrl: '' }} />)
    expect(screen.getByRole('link', { name: 'App Store' })).toHaveAttribute('href', 'https://apps.apple.com/app/x')
    expect(screen.queryByRole('link', { name: 'Google Play' })).toBeNull()
    expect(screen.queryByText(/in testing/)).toBeNull()
  })
})
