import { MovePlayerCommandPayload } from '@/connect4-domain/commands'
import { Board, BoardCell } from '@/connect4-domain/game'
import * as R from 'ramda'

const getSuccessivePlayerDiscCountFromCells = (
  player: 1 | 2,
  cellCoordinates: Iterable<BoardCell>,
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

const targetColumnToColumnsAroundTheMove = (board: Board, targetColumn: number) => {
  const array = R.range(0, board[0].length)
  return [array.slice(0, targetColumn), array.slice(targetColumn + 1)]
}

function* getBoardCellsBelowCellCoordinates(board: Board, rowIndex: number, columnIndex: number) {
  while (rowIndex > 0) {
    rowIndex -= 1
    yield board[rowIndex][columnIndex]
  }
}

function* getBoardCellsLeftOfCellCoordinates(board: Board, rowIndex: number, columnIndex: number) {
  while (columnIndex > 0) {
    columnIndex -= 1
    yield board[rowIndex][columnIndex]
  }
}

function* getBoardCellsRightOfCellCoordinates(board: Board, rowIndex: number, columnIndex: number) {
  while (columnIndex < board[0].length - 1) {
    columnIndex += 1
    yield board[rowIndex][columnIndex]
  }
}

function* getBoardCellsOnSlopeFromCellCoordinates(
  step: (input: number) => number,
  board: Board,
  rowStartIndex: number,
  rowEndIndex: number,
  columns: number[],
) {
  let rowIndex = rowStartIndex

  for (const columnIndex of columns) {
    if (rowIndex === rowEndIndex) {
      return
    }
    yield board[rowIndex][columnIndex]
    rowIndex = step(rowIndex)
  }
}

const getBoardCellsOnDownwardSlope = R.curry(getBoardCellsOnSlopeFromCellCoordinates)(
  (input: number) => input - 1,
)

const getBoardCellsOnUpwardSlope = R.curry(getBoardCellsOnSlopeFromCellCoordinates)(
  (input: number) => input + 1,
)

const isVerticalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const cellsToCheck = getBoardCellsBelowCellCoordinates(board, targetRow, targetColumn)
  const playerDiscLineLength = 1 + getSuccessivePlayerDiscCountFromCells(player, cellsToCheck)

  return {
    isWinningMove: playerDiscLineLength >= 4,
  }
}

const isHorizontalWinningMove = (
  board: Board,
  { player, targetCell: { row: targetRow, column: targetColumn } }: MovePlayerCommandPayload,
) => {
  const cellsLeftOfMove = getBoardCellsLeftOfCellCoordinates(board, targetRow, targetColumn)
  const cellsRightOfMove = getBoardCellsRightOfCellCoordinates(board, targetRow, targetColumn)
  const discLineLength =
    1 +
    getSuccessivePlayerDiscCountFromCells(player, cellsLeftOfMove) +
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
