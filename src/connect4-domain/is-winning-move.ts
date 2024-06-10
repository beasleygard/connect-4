import * as R from 'ramda'
import { MovePlayerCommandPayload } from '@/connect4-domain/commands'
import { Board, BoardCell } from '@/connect4-domain/game'

const getSuccessivePlayerDiscCountFromCells = (
  player: 1 | 2,
  cellCoordinates: Array<BoardCell>,
): number => {
  let playerDiscLineLength = 0
  for (const boardCell of cellCoordinates) {
    if (boardCell.player === player) {
      playerDiscLineLength++
    } else {
      break
    }
  }

  return playerDiscLineLength
}

const isVerticalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const targetRowToCellsToCheck = R.compose(
    R.map((rowIndex: number) => board[rowIndex][targetColumn]),
    R.reverse,
    R.range(0),
  )

  const cellsToCheck = targetRowToCellsToCheck(targetRow) as Array<BoardCell>
  const playerDiscLineLength = 1 + getSuccessivePlayerDiscCountFromCells(player, cellsToCheck)

  return {
    isWinningMove: playerDiscLineLength >= 4,
  }
}

const isHorizontalWinningMove = (
  board: Array<Array<BoardCell>>,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const targetColumnToCellsAroundTheMove = R.compose<
    [number],
    (val: number) => boolean,
    Array<number>,
    Array<Array<number>>,
    Array<Array<BoardCell>>
  >(
    R.map((columnIndexes: Array<number>) =>
      R.map((columnIndex) => board[targetRow][columnIndex], columnIndexes),
    ),
    R.partition((columnIndex: number) => columnIndex <= targetColumn),
    R.flip(R.reject<number, any>)(R.range(0, board[0].length)),
    (val1: number) => (val2: number) => val1 === val2,
  )

  const [cellsLeftOfMove, cellsRightOfMove] = targetColumnToCellsAroundTheMove(targetColumn)
  const discLineLength =
    1 +
    getSuccessivePlayerDiscCountFromCells(player, R.reverse(cellsLeftOfMove)) +
    getSuccessivePlayerDiscCountFromCells(player, cellsRightOfMove)

  return {
    isWinningMove: discLineLength >= 4,
  }
}

const winConditionChecks = [isVerticalWinningMove, isHorizontalWinningMove]

const isWinningMove = (board: Array<Array<BoardCell>>, move: MovePlayerCommandPayload) => {
  for (const checkWinCondition of winConditionChecks) {
    const winConditionCheckResult = checkWinCondition(board, move)
    if (winConditionCheckResult.isWinningMove === true) {
      return winConditionCheckResult
    }
  }

  return {
    isWinningMove: false,
  }
}

export default isWinningMove
