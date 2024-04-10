import { describe, it, expect } from 'vitest'
import createEmptyMatrix from '@/createEmptyMatrix'

describe('createEmptyMatrix', () => {
  it('returns a 0x0 matrix given defaults', () => {
    expect(createEmptyMatrix()).toEqual([])
  })
  it('returns a 0xColumns matrix given columns', () => {
    expect(createEmptyMatrix(7)).toEqual([[], [], [], [], [], [], []])
  })
})
