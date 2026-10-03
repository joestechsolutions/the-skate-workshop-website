import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navigation from '../components/Navigation'

// Mock Next.js Link and Image
vi.mock('next/link', () => ({
  default: ({ children, className, href }: any) => <a href={href} className={className}>{children}</a>
}))
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

describe('Navigation Button Styles', () => {
  it('should have the new primary button style for the Join Waitlist CTA', () => {
    render(<Navigation />)
    
    // Find the "JOIN WAITLIST" button in the desktop nav
    // Note: It's rendered twice (mobile and desktop), we'll check both if needed
    const joinButtons = screen.getAllByText(/JOIN WAITLIST/i)
    
    joinButtons.forEach(button => {
      const parentLink = button.closest('a')
      // The shipped primary CTA: brand-primary background, white text
      // (updated 2026-10-03 from the older white-bg/black-text guideline,
      // which the live site no longer uses).
      expect(parentLink?.className).toContain('bg-brand-primary')
      expect(parentLink?.className).toContain('text-white')
      // Ensure it doesn't have the old brand-red
      expect(parentLink?.className).not.toContain('brand-red')
      expect(parentLink?.className).not.toContain('from-brand-red')
    })
  })
})
