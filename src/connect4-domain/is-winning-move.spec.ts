import { describe, expect, it } from 'vitest'
import { Board, BoardCell } from '@/connect4-domain/game'
import isWinningMove from '@/connect4-domain/is-winning-move'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'

type PlayerMove = {
  player: 1 | 2
  targetCell: {
    row: number
    column: number
  }
}

const resolveToBoardCell = (input: string): BoardCell => ({
  player: Number.parseInt(input) as 1 | 2,
})

describe('is-winning-move', () => {
  describe('vertical win condition checking', () => {
    describe('given a board and a move that would result in a vertical win', () => {
      describe('where 3 of the moving players discs are below the target cell', () => {
        it('detects the win', () => {
          const board: Board = parseAsciiTable(
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
    describe('given a board and a move that would not result in a vertical win', () => {
      describe('where there are none of the players discs beneath the target cell', () => {
        it('detects the win', () => {
          const board: Board = parseAsciiTable(
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
            player: 2,
            targetCell: {
              row: 3,
              column: 0,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({
              isWinningMove: false,
            }),
          )
        })
      })
      describe('where three of the moving players discs are below but not successive to the target cell', () => {
        it('detects the win', () => {
          const board: Board = parseAsciiTable(
            `
            |---|
            | 1 |
            |---|
            | 1 |
            |---|
            | 1 |
            |---|
            | 2 |
            |---|
            |   |
            |---|`,
            resolveToBoardCell,
          )
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 4,
              column: 0,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({
              isWinningMove: false,
            }),
          )
        })
      })
    })
  })
  describe('horizontal win condition checking', () => {
    describe('given a board and a move that would result in a horizontal win', () => {
      describe('given there are 3 of the moving players tokens to the left of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
            |---|---|---|---|
            | 1 | 1 | 1 |   |
            |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 3,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: true }),
          )
        })
      })
      describe('and there are 3 of the moving players tokens to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
    |---|---|---|---|
    |   | 1 | 1 | 1 |
    |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 0,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: true }),
          )
        })
      })
      describe('and there are 2 of the moving players tokens to the left and 1 to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
            |---|---|---|---|
            | 1 | 1 |   | 1 |
            |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: true }),
          )
        })
      })
      describe('and there is 1 of the moving players tokens to the left and 2 to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
            |---|---|---|---|
            | 1 |   | 1 | 1 |
            |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 1,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: true }),
          )
        })
      })
    })
    describe('given a board and a move that would not result in a horizontal win', () => {
      describe('and there are less than 3 of the active players tokens to the left of the target cell', () => {
        it('does not detect a win', () => {
          const asciiTable = `
            |---|---|---|---|
            | 1 |   |   |   |
            |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 3,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: false }),
          )
        })
      })
      describe('and there are less that 3 of the active players tokens to the right of the target cell', () => {
        it('does not detect a win', () => {
          const asciiTable = `
            |---|---|---|---|
            |   | 1 |   |   |
            |---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 0,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: false }),
          )
        })
      })
      describe('and there are 3 of the active players tokens in a row not successive with the target cell', () => {
        it('does not detect a win', () => {
          const asciiTable = `
            |---|---|---|---|---|
            | 1 | 1 | 1 | 2 |   |
            |---|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, resolveToBoardCell)
          const move: PlayerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 4,
            },
          }
          expect(isWinningMove(board, move)).toEqual(
            expect.objectContaining({ isWinningMove: false }),
          )
        })
      })
    })
  })
})
