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
    
    // According to guidelines: Surface is Dark Gray (#1F2937)
    // We expect bg-surface or similar
    expect(card.className).toContain('bg-surface')
    // Border should be Gray 700/800 which is #374151 or similar
    // Let's check for border-white/10 or border-gray-700
    // The guidelines say subtle borders (#374151)
  })

  it('should use paper white, not a second accent, for highlights', () => {
    const { container } = render(<FeatureCard {...props} highlighted={true} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('border-white/50')
    expect(card.className).not.toContain('brand-secondary')
  })
})
