import { MovePlayerCommandPayload, createMovePlayerCommand } from '@/connect4-domain/commands'
import { PlayerMoveFailedEvent, PlayerMovedEvent } from '@/connect4-domain/events'
import GameFactory, { BoardCell, InvalidBoardDimensionsError } from '@/connect4-domain/game'
import _toAsciiTable from '@/connect4-domain/to-ascii-table'
import * as R from 'ramda'
import { describe, expect, it } from 'vitest'

const toAsciiTable = (board: Array<Array<BoardCell>>): string =>
  _toAsciiTable<BoardCell>(board, (value): string => {
    switch (value.player) {
      case 1:
        return '1'
      case 2:
        return '2'
      default:
        return ''
    }
  })

const create2x2Board = () => new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })

const empty2x2BoardAsciiTable = `
|---|---|
|   |   |
|---|---|
|   |   |
|---|---|`

describe('game', () => {
  describe('new game', () => {
    describe('given defaults', () => {
      it('should return an instance of Game', () => {
        const game = new GameFactory()
        expect(game).toBeInstanceOf(GameFactory)
      })
      it('creates a 6x7 board', () => {
        const game = new GameFactory()
        const board = game.getBoard()
        expect(toAsciiTable(board)).toMatchInlineSnapshot(`
          "
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|"
        `)
      })
      it('creates a game where player 1 starts with a number of discs equal to half the number of cells', () => {
        const game = new GameFactory()
        const player1Stats = game.getStatsForPlayer(1)
        expect(player1Stats).toEqual(
          expect.objectContaining({
            player: 1,
            discsLeft: 21,
          }),
        )
      })
      it('creates a game where player 2 starts with a number of discs equal to half the number of cells', () => {
        const game = new GameFactory()
        const player1Stats = game.getStatsForPlayer(2)
        expect(player1Stats).toEqual(
          expect.objectContaining({
            player: 2,
            discsLeft: 21,
          }),
        )
      })
      it('creates a deep copy of the board', () => {
        const game = new GameFactory()
        const firstBoard = game.getBoard()
        const secondBoard = game.getBoard()
        expect(secondBoard).toBeDeeplyUnequal(firstBoard)
      })
    })
    describe('given custom board dimensions', () => {
      describe('with 0 rows', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 0, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1'),
          )
        })
      })
      describe('with 0 columns', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 3, columns: 0 } })).toThrow(
            new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1'),
          )
        })
      })
      describe('with a negative number of rows', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: -2, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1'),
          )
        })
      })
      describe('with a negative number of columns', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 3, columns: -2 } })).toThrow(
            new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1'),
          )
        })
      })
      describe('which results in an odd number of cells', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 3, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError(
              'Total number of cells on a board must be even. Supplied board dimensions (3 rows x 3 columns) results in an odd number of cells (9)',
            ),
          )
        })
      })
      describe('which results in an even number of cells', () => {
        it('should return an instance of game', () => {
          const game = new GameFactory({ boardDimensions: { rows: 6, columns: 10 } })
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|"
          `)
        })
      })
    })
    it('returns the currently active player', () => {
      const game = new GameFactory()
      expect(game.getActivePlayer()).toBe(1)
    })
  })
  describe('making a move', () => {
    describe('given a player is currently active', () => {
      describe('and a cell location that is not on the board', () => {
        it('the player is unable to move to a cell with a row number below the first row', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: -1, column: 0 },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'Cell at row -1 column 0 does not exist on the board. The row number must be >= 0 and <= 1',
            },
          })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
        })
        it('the player is unable to move to a cell with a row number above the last row', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 2, column: 0 },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'Cell at row 2 column 0 does not exist on the board. The row number must be >= 0 and <= 1',
            },
          })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
        })
        it('the player is unable to move to a cell with a column number before the first column', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 0, column: -1 },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'Cell at row 0 column -1 does not exist on the board. The column number must be >= 0 and <= 1',
            },
          })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
        })
        it('the player is unable to move to a cell with a column number after the last column', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          expect(game.getActivePlayer()).toBe(1)
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 0, column: 2 },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'Cell at row 0 column 2 does not exist on the board. The column number must be >= 0 and <= 1',
            },
          })
        })
      })
      describe('and a cell on the first row', () => {
        describe('and the cell is unoccupied', () => {
          it('the player should be able to move a disk into the cell', () => {
            const game = create2x2Board()
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toBeInstanceOf(PlayerMovedEvent)
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
                  "
                  |---|---|
                  | 1 |   |
                  |---|---|
                  |   |   |
                  |---|---|"
                  `)
          })
        })
        describe('and the cell is occupied', () => {
          it('the player should not be able to move a disk into the cell', () => {
            const game = create2x2Board()
            game.move(
              createMovePlayerCommand({
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              }),
            )
            const movePlayerCommand = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 0,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toBeInstanceOf(PlayerMoveFailedEvent)
            expect(game.move(movePlayerCommand).payload?.message).toBe(
              'Cell at row 0 column 0 is already occupied',
            )
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
                "
                |---|---|
                | 1 |   |
                |---|---|
                |   |   |
                |---|---|"
                `)
          })
        })
      })
      describe('and a cell on the second row', () => {
        describe('and the cell below is occupied', () => {
          it('the player should be able to move a disk into the cell', () => {
            const game = create2x2Board()
            game.move(
              createMovePlayerCommand({
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              }),
            )
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              | 1 |   |
              |---|---|
              |   |   |
              |---|---|"
            `)
            const movePlayerCommand = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 1,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toBeInstanceOf(PlayerMovedEvent)
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
                "
                |---|---|
                | 1 |   |
                |---|---|
                | 2 |   |
                |---|---|"
              `)
          })
        })
        describe('and the cell below is unoccupied', () => {
          it('the player should not be able to move a disk into the cell', () => {
            const game = create2x2Board()
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 1,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toEqual({
              type: 'PLAYER_MOVE_FAILED',
              payload: {
                message:
                  'Cell at row 1 column 0 cannot be placed as there is no disk in the row below',
              },
            })
            expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
          })
        })
      })
    })
    describe('given a player is currently inactive', () => {
      it('the player should not be able to move a disk into the cell', () => {
        const game = create2x2Board()
        const movePlayerCommand = createMovePlayerCommand({
          player: 2,
          targetCell: {
            row: 0,
            column: 0,
          },
        })
        expect(game.getActivePlayer()).toBe(1)
        expect(game.move(movePlayerCommand)).toEqual({
          type: 'PLAYER_MOVE_FAILED',
          payload: {
            message: "Player 2 cannot make a move while it is player 1's turn",
          },
        })
        expect(toAsciiTable(game.getBoard())).toEqual(empty2x2BoardAsciiTable)
      })
    })
  })
  describe('getting the status of the game', () => {
    describe('given neither player has won yet', () => {
      it('reports the status as "in progress"', () => {
        const game = create2x2Board()
        expect(game.getGameStatus()).toBe('IN_PROGRESS')
      })
    })
    describe('given player 1 has won the game', () => {
      it('reports the status of the game as a win for player 1', () => {
        const game = new GameFactory({ boardDimensions: { rows: 2, columns: 5 } })
        R.pipe<[number[]], Array<MovePlayerCommandPayload>, any>(
          R.reduce((acc, column) => {
            return [
              ...acc,
              { player: 1, targetCell: { column: column, row: 0 } },
              { player: 2, targetCell: { column: column, row: 1 } },
            ]
          }, [] as Array<MovePlayerCommandPayload>),
          R.forEach((commandPayload: MovePlayerCommandPayload) =>
            game.move(createMovePlayerCommand(commandPayload)),
          ),
        )(R.range(0, 5))
        expect(toAsciiTable(game.getBoard()))
        expect(game.getGameStatus()).toBe('PLAYER_ONE_WIN')
      })
    })
    describe('given player 2 has won the game', () => {
      it('reports the status of the game as a win for player 2', () => {
        const game = new GameFactory({ boardDimensions: { rows: 1, columns: 10 } })
        R.pipe<[number[]], Array<MovePlayerCommandPayload>, any>(
          R.reduce(
            (acc, column) => {
              return [
                ...acc,
                { player: 2, targetCell: { column: column, row: 0 } },
                { player: 1, targetCell: { column: 9 - column, row: 0 } },
              ]
            },
            [{ player: 1, targetCell: { row: 0, column: 5 } }] as Array<MovePlayerCommandPayload>,
          ),
          R.forEach((commandPayload: MovePlayerCommandPayload) =>
            game.move(createMovePlayerCommand(commandPayload)),
          ),
        )(R.range(0, 4))
        expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
          "
          |---|---|---|---|---|---|---|---|---|---|
          | 2 | 2 | 2 | 2 |   | 1 |   | 1 | 1 | 1 |
          |---|---|---|---|---|---|---|---|---|---|"
        `)
        expect(game.getGameStatus()).toBe('PLAYER_TWO_WIN')
      })
    })
  })
  it('changes made to the game after a getBoard call do not affect prior copies of the board', () => {
    const game = create2x2Board()
    const originalBoard = game.getBoard()
    expect(toAsciiTable(originalBoard)).toEqual(empty2x2BoardAsciiTable)
    game.move(
      createMovePlayerCommand({
        player: 1,
        targetCell: {
          row: 0,
          column: 0,
        },
      }),
    )

    const boardAfterMove = game.getBoard()
    expect(toAsciiTable(boardAfterMove)).toMatchInlineSnapshot(`
              "
              |---|---|
              | 1 |   |
              |---|---|
              |   |   |
              |---|---|"
            `)
    expect(toAsciiTable(originalBoard)).toEqual(empty2x2BoardAsciiTable)
  })
})
