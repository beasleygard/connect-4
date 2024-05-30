import { MovePlayerCommand, MovePlayerCommandPayload } from '@/connect4-domain/commands'
import deepClone from '@/connect4-domain/deep-clone'
import { PlayerMoveFailedEvent, createPlayerMoveFailedEvent } from '@/connect4-domain/events'

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

interface Game {
  getBoard: () => Board
}

export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
  private board: Board
  private playerStats: Record<PlayerNumber, PlayerStats>
  private activePlayer: PlayerNumber

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.#validateBoardDimensions(boardDimensions)
    this.board = this.#createBoard(boardDimensions)
    this.playerStats = this.#createPlayerStatsRecord(boardDimensions)
    this.activePlayer = 1
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

  getActivePlayer(): number {
    return this.activePlayer
  }

  move({
    payload: {
      targetCell: { row, column },
    },
  }: MovePlayerCommand): PlayerMoveFailedEvent {
    const rangeErrorMessage = `Cell at row ${row} column ${column} does not exist on the board.`
    if (row < 0 || row >= this.board.length) {
      return createPlayerMoveFailedEvent({
        message: `${rangeErrorMessage} The row number must be >= 0 and <= ${this.board.length - 1}`,
      })
    } else if (column < 0) {
      return createPlayerMoveFailedEvent({
        message: `${rangeErrorMessage} The column number must be >= 0 and <= ${this.board[0].length - 1}`,
      })
    }
    console.log(column)
  }
}

export default GameFactory
