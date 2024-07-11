import { createMovePlayerCommand } from '@/connect4-domain/commands'
import { EventTypes } from '@/connect4-domain/events'
import { BoardCell as DomainBoardCell, Game, GameUuid } from '@/connect4-domain/game'

type PlayerNumber = 1 | 2

enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
  DRAW = 'DRAW',
}

type MoveResult = {
  isSuccess: boolean
  message?: Array<string>
}

export type BoardCell = {
  player?: PlayerNumber
  uuid: string
  handlePlayerMove: (player: PlayerNumber) => MoveResult
}

interface GameApi {
  getActivePlayer: () => 1 | 2
  getPlayerRemainingDisks: (player: PlayerNumber) => number
  getGameStatus: () => GameStatus
  getColumnCount: () => number
  getRowCount: () => number
  getBoard: () => Array<Array<BoardCell>>
  getSavedGameUuids: () => Array<GameUuid>
  save: () => void
  deleteSave: (uuid: GameUuid) => void
  load: (uuid: GameUuid) => void
  reset: () => void
}

const createBoardMapper = (game: Game) => (row: Array<DomainBoardCell>, rowIndex: number) => {
  const validPlacements = game.getValidRowPlacementsByColumn()

  return row.map((cell: DomainBoardCell, columnIndex: number) => ({
    player: cell.player,
    uuid: crypto.randomUUID(),
    isValidCellForMove: validPlacements[columnIndex] === rowIndex,
    handlePlayerMove: (player: PlayerNumber) => {
      const movePlayerCommand = createMovePlayerCommand({
        player,
        targetCell: {
          row: rowIndex,
          column: columnIndex,
        },
      })
      const moveEvent = game.move(movePlayerCommand)
      const isSuccess = moveEvent.type === EventTypes.PLAYER_MOVED
      return {
        isSuccess,
        message: isSuccess ? undefined : [moveEvent.payload?.message!],
      }
    },
  }))
}

const createGameApi = (game: Game) => {
  const boardMapper = createBoardMapper(game)
  const gameUuids: Array<GameUuid> = []
  return {
    getActivePlayer: game.getActivePlayer,
    getPlayerRemainingDisks: (player: PlayerNumber) => game.getStatsForPlayer(player).discsLeft,
    getGameStatus: game.getGameStatus,
    getColumnCount: () => game.getBoard()[0].length,
    getRowCount: () => game.getBoard().length,
    getBoard: () => game.getBoard().map(boardMapper),
    getSavedGameUuids: game.getSavedGames,
    save: () => {
      gameUuids.push(game.save())
    },
    deleteSave: game.deleteSave,
    load: game.load,
    reset: game.reset,
  } satisfies GameApi
}

export { GameStatus }
export type { GameApi }
export default createGameApi
