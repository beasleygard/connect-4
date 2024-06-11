import { MovePlayerCommandPayload } from '@/connect4-domain/commands'
import { Board, BoardCell } from '@/connect4-domain/game'
import * as R from 'ramda'

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

const targetColumnToColumnsAroundTheMove = (board: Board, targetColumn: number) =>
  R.compose<[number], (val: number) => boolean, Array<number>, Array<Array<number>>>(
    R.partition((columnIndex: number) => columnIndex <= targetColumn),
    R.flip(R.reject<number, any>)(R.range(0, board[0].length)),
    (val1: number) => (val2: number) => val1 === val2,
  )(targetColumn)

const getBoardCellsOnSlopeFromCellCoordinates = (
  board: Board,
  rowStartIndex: number,
  rowEndIndex: number,
  columns: number[],
  step: (input: number) => number,
) => {
  const cells = []

  let rowIndex = rowStartIndex
  for (const columnIndex of columns) {
    if (rowIndex === rowEndIndex) {
      break
    }

    cells.push(board[rowIndex][columnIndex])
    rowIndex = step(rowIndex)
  }

  return cells
}

const getBoardCellsOnDownwardSlope = R.curry(getBoardCellsOnSlopeFromCellCoordinates)(
  R.__,
  R.__,
  R.__,
  R.__,
  (input: number) => input - 1,
)

const getBoardCellsOnUpwardSlope = R.curry(getBoardCellsOnSlopeFromCellCoordinates)(
  R.__,
  R.__,
  R.__,
  R.__,
  (input: number) => input + 1,
)

const isVerticalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const targetRowToCellsToCheck = R.compose(
    R.map((rowIndex: number) => board[rowIndex][targetColumn]),
    R.reverse,
    R.range(0),
  )

  const cellsToCheck = targetRowToCellsToCheck(targetRow)
  const playerDiscLineLength = 1 + getSuccessivePlayerDiscCountFromCells(player, cellsToCheck)

  return {
    isWinningMove: playerDiscLineLength >= 4,
  }
}

const isHorizontalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const targetColumnToCellsAroundTheMove = R.compose<
    [number],
    Array<Array<number>>,
    Array<Array<BoardCell>>
  >(
    R.map((columnIndexes: Array<number>) =>
      R.map((columnIndex) => board[targetRow][columnIndex], columnIndexes),
    ),
    R.curry(targetColumnToColumnsAroundTheMove)(board),
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

const isBLTRDiagonalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const [columnsLeftOfMove, columnsRightOfMove] = targetColumnToColumnsAroundTheMove(
    board,
    targetColumn,
  )
  const cellsLeftOfMove = getBoardCellsOnDownwardSlope(
    board,
    targetRow - 1,
    -1,
    R.reverse(columnsLeftOfMove),
  )
  const cellsRightOfMove = getBoardCellsOnUpwardSlope(
    board,
    targetRow + 1,
    board.length,
    columnsRightOfMove,
  )

  const discLineLength =
    1 +
    getSuccessivePlayerDiscCountFromCells(player, cellsLeftOfMove) +
    getSuccessivePlayerDiscCountFromCells(player, cellsRightOfMove)

  return {
    isWinningMove: discLineLength >= 4,
  }
}

const isTLBRDiagonalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const [columnsLeftOfMove, columnsRightOfMove] = targetColumnToColumnsAroundTheMove(
    board,
    targetColumn,
  )
  const cellsLeftOfMove = getBoardCellsOnUpwardSlope(
    board,
    targetRow + 1,
    board.length,
    R.reverse(columnsLeftOfMove),
  )
  console.log(cellsLeftOfMove)
  const cellsRightOfMove = getBoardCellsOnDownwardSlope(
    board,
    targetRow - 1,
    -1,
    columnsRightOfMove,
  )

  const discLineLength =
    1 +
    getSuccessivePlayerDiscCountFromCells(player, cellsLeftOfMove) +
    getSuccessivePlayerDiscCountFromCells(player, cellsRightOfMove)

  return {
    isWinningMove: discLineLength >= 4,
  }
}

const winConditionChecks = [
  isVerticalWinningMove,
  isHorizontalWinningMove,
  isBLTRDiagonalWinningMove,
  isTLBRDiagonalWinningMove,
]

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
