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
    expect(colors.background).toBe('#121010') // matches the app's dark ground (bg in the-skate-workshop src/theme/tokens.ts)
    // the other warm neutrals mirror the app's dark tokens, mapped by role
    expect(colors['background-grouped']).toBe('#0B0A0A') // bgGrouped
    expect(colors.surface).toBe('#1F1C1C') // surface
    expect(colors['surface-raised']).toBe('#2A2626') // surfaceRaised
    expect(colors.line).toBe('#2C292A') // line
    expect(colors['ink-muted']).toBe('#A39E9C') // inkMuted
  })
})
