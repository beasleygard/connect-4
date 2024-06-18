import { MovePlayerCommand } from '@/connect4-domain/commands'
import deepClone from '@/connect4-domain/deep-clone'
import {
  Event,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from '@/connect4-domain/events'
import InMemoryRepository from '@/connect4-domain/in-memory-repository'
import isWinningMove from '@/connect4-domain/is-winning-move'

type PlayerNumber = 1 | 2
type PlayerStats = {
  player: PlayerNumber
  discsLeft: number
}
type CellPlayer = PlayerNumber | undefined
type BoardCell = {
  player: CellPlayer
}
type Board = Array<Array<BoardCell>>
type BoardDimensions = {
  rows: number
  columns: number
}
type GameUuid = ReturnType<typeof crypto.randomUUID>
type PersistentGame = {
  board: Board
  activePlayer: PlayerNumber
  gameStatus: GameStatus
  validRowPlacementsByColumn: Array<number>
  playerStats: Record<PlayerNumber, PlayerStats>
}
interface GameRepository {
  save: (board: PersistentGame) => GameUuid
  load: (boardId: GameUuid) => PersistentGame | undefined
}
type GameParameters = {
  boardDimensions?: BoardDimensions
  repository?: GameRepository
}
enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
  DRAW = 'DRAW',
}

type MoveValidationCheck = {
  predicate: (movePlayerCommand: MovePlayerCommand) => boolean
  failureMessageFactory: (movePlayerCommand: MovePlayerCommand) => string
}
type MoveValidationResult = {
  isValid: boolean
  message?: string
}

class InvalidBoardDimensionsError extends RangeError {}
class NoSuchSavedGameError extends ReferenceError {}

interface Game {
  getBoard: () => Board
  getGameStatus: () => GameStatus
  getStatsForPlayer: (playerNumber: PlayerNumber) => PlayerStats
  getActivePlayer: () => PlayerNumber
  getValidRowPlacementsByColumn: () => Array<number>
  move: (movePlayerCommand: MovePlayerCommand) => Event
  save: () => GameUuid
  load: (gameUuid: GameUuid) => void
}

class GameFactory implements Game {
  private board: Board
  private playerStats: Record<PlayerNumber, PlayerStats>
  private validRowPlacementsByColumn: number[]
  private moveValidationChecks: MoveValidationCheck[]
  private activePlayer: PlayerNumber
  private gameStatus: GameStatus
  private repository: GameRepository

  constructor(
    {
      boardDimensions = { rows: 6, columns: 7 },
      repository = new InMemoryRepository(),
    }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
    },
  ) {
    this.#validateBoardDimensions(boardDimensions)
    this.board = this.#createBoard(boardDimensions)
    this.repository = repository
    this.playerStats = this.#createPlayerStatsRecord(boardDimensions)
    this.activePlayer = 1
    this.validRowPlacementsByColumn = new Array(boardDimensions.columns).fill(0)
    this.gameStatus = GameStatus.IN_PROGRESS
    this.moveValidationChecks = this.#createMoveValidationChecksForGame()
  }

  save = () =>
    this.repository.save(
      deepClone({
        board: this.board,
        activePlayer: this.activePlayer,
        gameStatus: this.gameStatus,
        validRowPlacementsByColumn: this.validRowPlacementsByColumn,
        playerStats: this.playerStats,
      } satisfies PersistentGame),
    )

  load = (gameUuid: GameUuid) => {
    const persistentGame = this.repository.load(gameUuid)
    if (persistentGame === undefined) {
      throw new NoSuchSavedGameError('No game with that ID has been saved.')
    } else {
      this.activePlayer = persistentGame.activePlayer
      this.board = persistentGame.board
      this.playerStats = persistentGame.playerStats
      this.gameStatus = persistentGame.gameStatus
      this.validRowPlacementsByColumn = persistentGame.validRowPlacementsByColumn
    }
  }

  getValidRowPlacementsByColumn = () => deepClone(this.validRowPlacementsByColumn)

  #validateBoardDimensions({ rows, columns }: BoardDimensions) {
    if (rows < 1) {
      throw new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1')
    } else if (columns < 1) {
      throw new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1')
    } else if ((rows * columns) % 2 !== 0) {
      throw new InvalidBoardDimensionsError(
        `Total number of cells on a board must be even. Supplied board dimensions (${rows} rows x ${columns} columns) results in an odd number of cells (${rows * columns})`,
      )
    }
  }

  #createBoard = ({ rows, columns }: BoardDimensions): Board =>
    Array(rows)
      .fill(undefined)
      .map(() =>
        Array(columns)
          .fill(undefined)
          .map(() => ({
            player: undefined,
          })),
      )

  #createPlayerStatsRecord({ rows, columns }: BoardDimensions): Record<PlayerNumber, PlayerStats> {
    const playerMovesLeft = (rows * columns) / 2
    return {
      1: { player: 1, discsLeft: playerMovesLeft },
      2: { player: 2, discsLeft: playerMovesLeft },
    }
  }

  getBoard = () => deepClone(this.board)

  getGameStatus = () => this.gameStatus

  getStatsForPlayer = (playerNumber: PlayerNumber) => deepClone(this.playerStats[playerNumber])

  getActivePlayer = () => this.activePlayer

  move = this.#createValidatedMove(this.#move.bind(this))

  #move(movePlayerCommand: MovePlayerCommand): PlayerMovedEvent {
    const { row, column } = movePlayerCommand.payload.targetCell
    this.board[row][column] = {
      player: movePlayerCommand.payload.player,
    }
    this.#updateGameBasedOnMoveCommand(movePlayerCommand)

    return createPlayerMovedEvent()
  }

  #updateGameBasedOnMoveCommand(movePlayerCommand: MovePlayerCommand) {
    this.validRowPlacementsByColumn[movePlayerCommand.payload.targetCell.column] += 1
    this.playerStats[this.activePlayer].discsLeft -= 1
    this.#updateGameStatusBasedOnMoveCommand(movePlayerCommand)
    this.activePlayer = this.activePlayer == 1 ? 2 : 1
  }

  #updateGameStatusBasedOnMoveCommand({ payload }: MovePlayerCommand) {
    if (isWinningMove(this.board, payload).isWinningMove) {
      this.gameStatus = payload.player === 1 ? GameStatus.PLAYER_ONE_WIN : GameStatus.PLAYER_TWO_WIN
    } else if (this.playerStats[1].discsLeft === 0 && this.playerStats[2].discsLeft === 0) {
      this.gameStatus = GameStatus.DRAW
    }
  }

  #validateMove(movePlayerCommand: MovePlayerCommand): MoveValidationResult {
    for (const { predicate, failureMessageFactory } of this.moveValidationChecks) {
      const moveValidationCheckFailed = !predicate(movePlayerCommand)
      if (moveValidationCheckFailed)
        return {
          isValid: false,
          message: failureMessageFactory(movePlayerCommand),
        }
    }
    return { isValid: true }
  }

  #createValidatedMove(moveFunction: Game['move']) {
    return (movePlayerCommand: MovePlayerCommand) => {
      const moveValidationResult = this.#validateMove(movePlayerCommand)
      return moveValidationResult.isValid
        ? moveFunction(movePlayerCommand)
        : createPlayerMoveFailedEvent({ message: moveValidationResult.message })
    }
  }

  #createMoveValidationChecksForGame(): Array<MoveValidationCheck> {
    return [
      {
        predicate: () => this.gameStatus === GameStatus.IN_PROGRESS,
        failureMessageFactory: () => 'Moves cannot be made after the game is over',
      },
      {
        predicate: ({ payload: { player } }) => player === this.activePlayer,
        failureMessageFactory: ({ payload: { player } }) =>
          `Player ${player} cannot make a move while it is player ${this.activePlayer}'s turn`,
      },
      {
        predicate: (command) =>
          command.payload.targetCell.row >= 0 && command.payload.targetCell.row < this.board.length,
        failureMessageFactory: (movePlayerCommand) =>
          `Cell at row ${movePlayerCommand.payload.targetCell.row} column ${movePlayerCommand.payload.targetCell.column} does not exist on the board. The row number must be >= 0 and <= ${this.board.length - 1}`,
      },
      {
        predicate: (command) =>
          command.payload.targetCell.column >= 0 &&
          command.payload.targetCell.column < this.board[0].length,
        failureMessageFactory: (movePlayerCommand) =>
          `Cell at row ${movePlayerCommand.payload.targetCell.row} column ${movePlayerCommand.payload.targetCell.column} does not exist on the board. The column number must be >= 0 and <= ${this.board[0].length - 1}`,
      },
      {
        predicate: (command) =>
          this.validRowPlacementsByColumn[command.payload.targetCell.column] <=
          command.payload.targetCell.row,
        failureMessageFactory: (command) =>
          `Cell at row ${command.payload.targetCell.row} column ${command.payload.targetCell.column} is already occupied`,
      },
      {
        predicate: (command) =>
          this.validRowPlacementsByColumn[command.payload.targetCell.column] >=
          command.payload.targetCell.row,
        failureMessageFactory: (command) =>
          `Cell at row ${command.payload.targetCell.row} column ${command.payload.targetCell.column} cannot be placed as there is no disk in the row below`,
      },
    ]
  }
}
export default GameFactory
export { GameStatus, InvalidBoardDimensionsError }
export type {
  Board,
  BoardCell,
  BoardDimensions,
  GameParameters,
  GameRepository,
  GameUuid,
  PersistentGame,
}
