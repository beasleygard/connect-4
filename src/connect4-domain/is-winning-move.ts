import { MovePlayerCommandPayload } from '@/connect4-domain/commands'
import { BoardCell } from '@/connect4-domain/game'

const isVerticalWinningMove = (
  board: Array<Array<BoardCell>>,
  { player, targetCell: { row, column } }: MovePlayerCommandPayload,
) => {
  let playerDiscLineLength = 1

  for (const rowIndex of [...Array(row).keys()].reverse()) {
    if (board[rowIndex][column].player === player) {
      playerDiscLineLength += 1
    } else {
      break
    }
  }

  return {
    isWinningMove: playerDiscLineLength >= 4,
  }
}

const isWinningMove = (board: Array<Array<BoardCell>>, move: MovePlayerCommandPayload) => {
  return isVerticalWinningMove(board, move)
}

export default isWinningMove
