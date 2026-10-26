import { describe, it, expect } from 'vitest'
import config from '../../tailwind.config'

describe('Tailwind Config Design Tokens', () => {
  it('should have the correct brand color palette', () => {
    const colors = config.theme?.extend?.colors as any
    expect(colors.brand).toBeDefined()
    expect(colors.brand.primary).toBe('#D7232B') // Workshop Red
    expect(colors.brand.secondary).toBeUndefined() // no second accent: the cyan is gone
    // the pre-2026 'brand.red' key stays gone; the current red is brand.primary
    expect(colors.brand.red).toBeUndefined()
  })

  it('should have the correct surface and background colors', () => {
    const colors = config.theme?.extend?.colors as any
    expect(colors.surface).toBe('#1F2937') // Dark Gray Surface
    expect(colors.background).toBe('#121212') // Softer Dark Background
  })
})
