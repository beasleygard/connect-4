import { describe, expect, it } from 'vitest'

describe('toBeDeeplyUnequal', () => {
  it('should fail when given objects are the same object', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = obj1
    expect(obj1).not.toBeDeeplyUnequal(obj2)
  })
})
