// Next 16 removed `next lint`; this is the flat config its docs give for running ESLint directly.
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Marketing copy is full of plain apostrophes; React renders them fine, escaping them is noise.
      'react/no-unescaped-entities': 'off',
      // React-Compiler-era checks. This site runs React 18 without the compiler; the flagged cases
      // (Math.random inside useMemo, the reduced-motion setState) are intended — keep them visible.
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // Test doubles mock third-party components loosely on purpose.
    files: ['src/test/**'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'conductor/**']),
])
