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
  const targetColumnToCellsAroundTheMove = R.compose<
    [number],
    (val: number) => boolean,
    Array<number>,
    Array<Array<number>>,
    Array<Array<Array<number>>>
  >(
    R.map((columnIndexes) =>
      R.map<number, number[]>((columnIndex) => [targetRow, columnIndex], columnIndexes),
    ),
    R.partition((columnIndex: number) => columnIndex <= targetColumn),
    R.flip(R.reject<number, any>)(R.range(0, board[0].length)),
    (val1: number) => (val2: number) => val1 === val2,
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
