import { MovePlayerCommand } from '@/connect4-domain/commands'
import deepClone from '@/connect4-domain/deep-clone'
import {
  Event,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from '@/connect4-domain/events'

type PlayerNumber = 1 | 2
type PlayerStats = {
  player: PlayerNumber
  discsLeft: number
}
type CellPlayer = PlayerNumber | undefined
export type BoardCell = {
  player: CellPlayer
}
export type Board = Array<Array<BoardCell>>
export type BoardDimensions = {
  rows: number
  columns: number
}
export type GameParameters = {
  boardDimensions: BoardDimensions
}

type MoveValidationResult = {
  rowInValidRange: boolean
  columnInValidRange: boolean
  placementIsValid: boolean
  isValid: boolean
  message?: string
}

interface Game {
  getBoard: () => Board
  getStatsForPlayer: (playerNumber: PlayerNumber) => PlayerStats
  getActivePlayer: () => PlayerNumber
  move: (movePlayerCommand: MovePlayerCommand) => Event
}

export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
  private board: Board
  private playerStats: Record<PlayerNumber, PlayerStats>
  private activePlayer: PlayerNumber
  private validRowPlacementsByColumn: number[]

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.#validateBoardDimensions(boardDimensions)
    this.board = this.#createBoard(boardDimensions)
    this.playerStats = this.#createPlayerStatsRecord(boardDimensions)
    this.activePlayer = 1
    this.validRowPlacementsByColumn = new Array(boardDimensions.columns).fill(0)
  }

  #validateBoardDimensions(boardDimensions: BoardDimensions) {
    if (boardDimensions.rows < 1) {
      throw new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1')
    } else if (boardDimensions.columns < 1) {
      throw new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1')
    } else if ((boardDimensions.rows * boardDimensions.columns) % 2 !== 0) {
      throw new InvalidBoardDimensionsError(
        `Total number of cells on a board must be even. Supplied board dimensions (${boardDimensions.rows} rows x ${boardDimensions.columns} columns) results in an odd number of cells (${boardDimensions.rows * boardDimensions.columns})`,
      )
    }
  }

  #createBoard({ rows, columns }: BoardDimensions): Board {
    return Array(rows)
      .fill(undefined)
      .map(
        (): Array<BoardCell> =>
          Array(columns)
            .fill(undefined)
            .map(
              (): BoardCell => ({
                player: undefined,
              }),
            ),
      )
  }

  #createPlayerStatsRecord({ rows, columns }: BoardDimensions): Record<PlayerNumber, PlayerStats> {
    const playerMovesLeft = (rows * columns) / 2
    return {
      1: { player: 1, discsLeft: Math.ceil(playerMovesLeft) },
      2: { player: 2, discsLeft: Math.floor(playerMovesLeft) },
    }
  }

  getBoard(): Board {
    return deepClone(this.board)
  }

  getStatsForPlayer(playerNumber: PlayerNumber): PlayerStats {
    return this.playerStats[playerNumber]
  }

  getActivePlayer(): PlayerNumber {
    return this.activePlayer
  }

  move = this.#createValidatedMove(this.#move.bind(this))

  #move(movePlayerCommand: MovePlayerCommand): PlayerMovedEvent {
    const {
      payload: {
        player,
        targetCell: { row, column },
      },
    } = movePlayerCommand

    this.board[row][column] = {
      player: player,
    } satisfies BoardCell
    this.validRowPlacementsByColumn[column] += 1

    return createPlayerMovedEvent()
  }

  #validateMove({
    payload: {
      targetCell: { row, column },
    },
  }: MovePlayerCommand): MoveValidationResult {
    const result = {} as MoveValidationResult
    result.rowInValidRange = row >= 0 && row < this.board.length
    result.columnInValidRange = column >= 0 && column < this.board[0].length
    result.placementIsValid = this.validRowPlacementsByColumn[column] === row
    result.isValid = result.rowInValidRange && result.columnInValidRange && result.placementIsValid
    if (!(result.rowInValidRange && result.columnInValidRange)) {
      result.message = `Cell at row ${row} column ${column} does not exist on the board. ${
        !result.rowInValidRange
          ? `The row number must be >= 0 and <= ${this.board.length - 1}`
          : `The column number must be >= 0 and <= ${this.board[0].length - 1}`
      }`
    } else if (!result.placementIsValid) {
      result.message = `Cell at row ${row} column ${column} is already occupied`
    }
    return result
  }

  #createValidatedMove(
    moveFunction: (movePlayerCommand: MovePlayerCommand) => PlayerMovedEvent,
  ): (movePlayerCommand: MovePlayerCommand) => Event {
    return (movePlayerCommand: MovePlayerCommand) => {
      const moveValidationResult = this.#validateMove(movePlayerCommand)
      if (moveValidationResult.isValid) {
        return moveFunction(movePlayerCommand)
      } else {
        return createPlayerMoveFailedEvent({ message: moveValidationResult.message })
      }
    }
  }
}
export default GameFactory
