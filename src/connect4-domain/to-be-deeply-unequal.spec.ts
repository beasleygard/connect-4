import { describe, expect, it } from 'vitest'

describe('toBeDeeplyUnequal', () => {
  it('should pass when given objects are deeply unequal at a shallow level', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 3, b: 4 }
    expect(obj1).toBeDeeplyUnequal(obj2)
  })
})
