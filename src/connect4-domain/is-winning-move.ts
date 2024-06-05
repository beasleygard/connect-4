import * as R from 'ramda'
import { MovePlayerCommandPayload } from '@/connect4-domain/commands'
import { Board, BoardCell } from '@/connect4-domain/game'

type DiscLineLengthAccumulator = {
  playerDiscLineLength: number
  lineIsContinuing: boolean
}

const getDiscLineLengthFromCellList = (
  board: Board,
  player: 1 | 2,
  cellCoordinates: Array<Array<number>>,
): number =>
  R.reduce(
    (
      { playerDiscLineLength, lineIsContinuing }: DiscLineLengthAccumulator,
      [rowIndex, columnIndex],
    ) => {
      if (lineIsContinuing) {
        if (board[rowIndex][columnIndex].player === player) {
          playerDiscLineLength += 1
        } else {
          lineIsContinuing = false
        }
      }

      return { playerDiscLineLength, lineIsContinuing }
    },
    { playerDiscLineLength: 0, lineIsContinuing: true },
    cellCoordinates,
  ).playerDiscLineLength

const isVerticalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const targetRowToCellsToCheck = R.compose(
    R.map((rowIndex) => [rowIndex, targetColumn]),
    R.reverse,
    R.range(0),
  )

  const cellsToCheck = targetRowToCellsToCheck(targetRow) as number[][]
  const playerDiscLineLength = 1 + getDiscLineLengthFromCellList(board, player, cellsToCheck)

  return {
    isWinningMove: playerDiscLineLength >= 4,
  }
}

const isHorizontalWinningMove = (
  board: Array<Array<BoardCell>>,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  //@ts-ignore
  const targetColumnToCellsAroundTheMove = R.compose(
    R.map((x: Array<number>) => R.map((columnIndex) => [targetRow, columnIndex], x)),
    R.partition((columnIndex: number) => columnIndex <= targetColumn),
    //@ts-ignore
    R.filter(R.__, R.range(0, board[0].length)),
    (x: number) => (columnIndex: number) => columnIndex !== x,
  )

  const [cellsLeftOfMove, cellsRightOfMove] = targetColumnToCellsAroundTheMove(targetColumn)
  const discLineLength =
    1 +
    getDiscLineLengthFromCellList(board, player, R.reverse(cellsLeftOfMove)) +
    getDiscLineLengthFromCellList(board, player, cellsRightOfMove)

  return {
    isWinningMove: discLineLength >= 4,
  }
}

const winConditionChecks = [isVerticalWinningMove, isHorizontalWinningMove]

const isWinningMove = (board: Array<Array<BoardCell>>, move: MovePlayerCommandPayload) => {
  for (const checkWinCondition of winConditionChecks) {
    const result = checkWinCondition(board, move)
    if (result.isWinningMove === true) return result
  }
  return {
    isWinningMove: false,
  }
}

export default isWinningMove
