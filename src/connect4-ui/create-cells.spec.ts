import { describe, expect, it } from 'vitest'
import { CreateCellsStrategy, createCells } from '@/create-cells'

describe('createCells', () => {
  const matchDefaultCell = expect.objectContaining({
    player: undefined,
    uuid: expect.toBeUuid(),
  })

  const matchPlayer1Cell = expect.objectContaining({
    player: 1,
    uuid: expect.toBeUuid(),
  })

  const playerOneStrategy: CreateCellsStrategy = () => 1
  const playerTwoStrategy: CreateCellsStrategy = () => 2

  it('returns a 0x0 matrix given defaults', () => {
    expect(createCells()).toEqual([])
  })
  describe('given one row', () => {
    describe('and a player selection strategy', () => {
      describe('that always selects player 1', () => {
        it('creates a single cell occupied by player 1', () => {
          const cells = createCells(1, 1, playerOneStrategy)
          expect(cells).toEqual([[matchPlayer1Cell]])
        })
      })
    })
  })
  describe("given 'm' rows", () => {
    describe('and no value for columns', () => {
      it('returns a m*m matrix given a value for m', () => {
        const cells = createCells(4)
        expect(cells).toEqual([
          [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
          [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
          [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
          [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
        ])
      })
      describe("and 'n' columns", () => {
        it('returns a m*n matrix given values for m and n', () => {
          const cells = createCells(3, 4)
          expect(cells).toEqual([
            [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
            [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
            [matchDefaultCell, matchDefaultCell, matchDefaultCell, matchDefaultCell],
          ])
        })
      })
      describe('and 1 column', () => {
        it('returns a 2d matrix of length m given n is 1', () => {
          const column = createCells(4, 1)
          expect(column).toEqual([
            [matchDefaultCell],
            [matchDefaultCell],
            [matchDefaultCell],
            [matchDefaultCell],
          ])
        })
      })
    })
  })
})
