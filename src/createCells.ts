import { BoardCellProps } from './BoardCell'

const createEmptyMatrix = (rows?: number, columns?: number): Array<Array<BoardCellProps>> => {
  if (rows === undefined) {
    return []
  } else if (columns === undefined) {
    columns = rows
  }

  return [...Array(rows)].map(
    (): Array<BoardCellProps> =>
      Array(columns)
        .fill(undefined)
        .map((): BoardCellProps => {
          return {
            player: undefined,
          }
        }),
  )
}

export default createEmptyMatrix
