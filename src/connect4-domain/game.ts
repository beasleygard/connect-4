type Player = 1 | 2 | undefined
export type BoardCell = {
  player: Player
}
export type Board = Array<Array<BoardCell>>
type BoardDimensions = {
  rows: number
  columns: number
}
export type GameParameters = {
  boardDimensions: BoardDimensions
}

interface Game {
  getBoard: () => Board
}

class GameFactory implements Game {
  board: Board
  movesLeft: number

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.board = this.#createBoard(boardDimensions)
    this.movesLeft = boardDimensions.rows * boardDimensions.columns
  }

  #createBoard({ rows, columns }: BoardDimensions) {
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

  getBoard() {
    return this.board
  }

  getStatsForPlayer(player: 1 | 2) {
    return {
      player: player,
      discsLeft: player === 1 ? Math.ceil(this.movesLeft / 2) : Math.floor(this.movesLeft / 2),
    }
  }
}

export default GameFactory
