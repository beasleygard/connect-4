import { describe, it, expect } from 'vitest'
import createCells from '@/createCells'

describe('createCells', () => {
  const defaultPlayer = {
    player: undefined,
  }

  it('returns a 0x0 matrix given defaults', () => {
    expect(createCells()).toEqual([])
  })
  it('returns a m*n matrix given values for m and n', () => {
    const matrix = createCells(3, 4)
    expect(matrix).toEqual([
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
    ])
  })
  it('returns a m*m matrix given a value for m', () => {
    const matrix = createCells(4)
    expect(matrix).toEqual([
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
    ])
  })
})
