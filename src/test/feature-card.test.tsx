import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import FeatureCard from '../components/FeatureCard'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}))

describe('FeatureCard Styles', () => {
  const props = {
    icon: '🚀',
    title: 'Test Feature',
    description: 'Test Description',
  }

  it('should have the correct surface background and border colors', () => {
    const { container } = render(<FeatureCard {...props} />)
    const card = container.firstChild as HTMLElement
    
    // Surface is the app's warm dark surface (#1F1C1C)
    expect(card.className).toContain('bg-surface')
  })

  it('should use paper white, not a second accent, for highlights', () => {
    const { container } = render(<FeatureCard {...props} highlighted={true} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('border-white/50')
    expect(card.className).not.toContain('brand-secondary')
  })
})
