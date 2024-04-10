import { describe, it, expect } from 'vitest'
import createEmptyMatrix from '@/createEmptyMatrix'

describe('createEmptyMatrix', () => {
  it('returns a 0x0 matrix given defaults', () => {
    expect(createEmptyMatrix()).toEqual([])
  })
  it('returns a m*n matrix given values for m and n', () => {
    const matrix = createEmptyMatrix(3, 4)
    expect(matrix).toHaveLength(3)
    expect(matrix).toEqual([
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ])
  })
})
