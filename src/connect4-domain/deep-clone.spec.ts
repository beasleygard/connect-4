import { describe, expect, it } from 'vitest'
import deepClone from '@/connect4-domain/deep-clone'

describe('deep-clone', () => {
  it('should return a primitive value as-is', () => {
    const original = 42
    const cloned = deepClone(42)
    expect(cloned).toBe(original)
  })
  it('should return a deep copy of an array', () => {
    const original: [{ a: number }, number, number[]] = [{ a: 1 }, 2, [3, 4]]
    const cloned = deepClone(original)
    expect(cloned).not.toBe(original)
    expect(cloned[0]).not.toBe(original[0])
    expect(cloned[0]).toBeInstanceOf(Object)
    expect(Object.keys(cloned[0])).toHaveLength(1)
    expect(Object.hasOwn(cloned[0], 'a')).toBeTruthy()
    expect(cloned[0]['a']).toStrictEqual(original[0]['a'])
    expect(cloned[1]).toBe(original[1])
    expect(cloned[2]).not.toBe(original[2])
    expect(cloned[2][0]).toBe(original[2][0])
    expect(cloned[2][1]).toBe(original[2][1])
  })
  it('should return a deep copy of an object', () => {
    const original: { a: number; b: { c: string; d: number }; e: number[] } = {
      a: 42,
      b: { c: 'hi', d: 9 },
      e: [3, 4],
    }
    const cloned = deepClone(original)
    expect(cloned).not.toBe(original)
    expect(cloned.a).toStrictEqual(original.a)
    expect(cloned.b).not.toBe(original.b)
    expect(cloned.b.c).toStrictEqual(original.b.c)
    expect(cloned.b.d).toStrictEqual(original.b.d)
    expect(cloned.e).not.toBe(original.e)
    expect(cloned.e[0]).toStrictEqual(original.e[0])
    expect(cloned.e[1]).toStrictEqual(original.e[1])
  })
  it('should copy functions by reference', () => {
    const original = (x: number) => 2 * x
    const cloned = deepClone(original)
    expect(original(3)).toStrictEqual(cloned(3))
    expect(original).toBe(cloned)
  })
})
