import type { Assertion, AsymmetricMatchersContaining } from '@vitest'

interface MatcherResult {
  pass: boolean
  message: () => string
  actual?: unknown
  expected?: unknown
}

interface CustomMatchers<R = unknown> {
  toBeUuid: (value: string) => R
  toBeDeeplyUnequal: (value: object) => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
