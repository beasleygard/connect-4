import { describe, expect, it } from 'vitest'
import isWinningMove from '@/connect4-domain/is-winning-move'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'

type PlayerMove = {
  player: 1 | 2
  targetCell: {
    row: number
    column: number
  }
}

const resolveToBoardCell = (input: string) => ({
  player: Number.parseInt(input),
})

describe('is-winning-move', () => {
  describe('given a board and a move that would result in a vertical win', () => {
    it('detects the win', () => {
      const board = parseAsciiTable(
        `
|---|
| 1 |
|---|
| 1 |
|---|
| 1 |
|---|
|   |
|---|`,
        resolveToBoardCell,
      )
      const move: PlayerMove = {
        player: 1,
        targetCell: {
          row: 3,
          column: 0,
        },
      }
      expect(isWinningMove(board, move)).toEqual(
        expect.objectContaining({
          isWinningMove: true,
        }),
      )
    })
  })
})
