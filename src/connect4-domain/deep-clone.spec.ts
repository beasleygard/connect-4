import { describe, expect, it } from 'vitest'
import deepClone from '@/connect4-domain/deep-clone'

describe('deep-clone', () => {
  it('should return a primitive value as-is', () => {
    const original = 42
    const cloned = deepClone(42)
    expect(cloned).toBe(original)
  })
})
