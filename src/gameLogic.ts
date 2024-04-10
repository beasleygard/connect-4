import { BoardData } from '@/BoardGrid'

const isVerticalWinningMove = (boardState: BoardData, currentPlayer: 1 | 2, column: number) => {
  let count = 0
  for (const playerToken of boardState[column]) {
    if (playerToken == currentPlayer) {
      count += 1
    } else {
      count = 0
    }

    if (count >= 4) {
      return true
    }
  }

  return false
}

const isHorizontalWinningMove = (boardState: BoardData, currentPlayer: 1 | 2, row: number) => {
  let count = 0
  for (let indexColumn = 0; indexColumn < 7; indexColumn++) {
    if (boardState[indexColumn][row] == currentPlayer) {
      count++
    } else {
      count = 0
    }

    if (count >= 4) {
      return true
    }
  }

  return false
}

const isForwardDiagonalWinningMove = (
  boardState: BoardData,
  currentPlayer: 1 | 2,
  column: number,
  row: number,
) => {
  let count = 0
  let indexRow, indexColumn
  if (row > column) {
    indexColumn = 0
    indexRow = row - column
  } else {
    indexRow = 0
    indexColumn = column - row
  }

  for (; indexRow < 6 && indexColumn < 7 && count < 4; indexRow++) {
    if (boardState[indexColumn][indexRow] === currentPlayer) {
      count++
    } else {
      count = 0
    }

    if (count >= 4) {
      return true
    }

    indexColumn++
  }

  return false
}

const isWinningMove = (boardState: BoardData, currentPlayer: 1 | 2, column: number) => {
  const row: number = boardState[column].length - 1
  return (
    isVerticalWinningMove(boardState, currentPlayer, column) ||
    isHorizontalWinningMove(boardState, currentPlayer, row) ||
    isForwardDiagonalWinningMove(boardState, currentPlayer, column, row)
  )
}

const isBoardFull = (boardState: BoardData) => {
  const fullColumns = boardState.reduce(
    (fullColumns, currentColumn) => (currentColumn.length >= 6 ? fullColumns + 1 : fullColumns),
    0,
  )
  return fullColumns >= 7
}

export { isWinningMove, isBoardFull }
