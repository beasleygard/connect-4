import { describe, it, expect } from 'vitest'
import createCells from '@/createCells'

describe('createCells', () => {
  const matchDefaultCell = expect.objectContaining({
    player: undefined,
    uuid: expect.toBeUuid(),
  })

  it('returns a 0x0 matrix given defaults', () => {
    expect(createCells()).toEqual([])
  })
  it('returns a m*n matrix given values for m and n', () => {
    const matrix = createCells(3, 4)
    expect(matrix).toEqual([
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
    ])
  })
  it('returns a m*m matrix given a value for m', () => {
    const matrix = createCells(4)
    expect(matrix).toEqual([
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
      [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
    ])
  })
  it('returns a 2d matrix of length m given n is 1', () => {
    const column = createCells(4, 1)
    expect(column).toEqual([matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell])
  })
})
