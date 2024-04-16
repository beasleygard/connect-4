import { BoardCellProps } from './BoardCell'

const createCells = (
  rowCount?: number,
  columnCount?: number,
): Array<Array<BoardCellProps> | BoardCellProps> => {
  let mapper: () => BoardCellProps | Array<BoardCellProps>
  if (rowCount === undefined) {
    return []
  } else if (columnCount === undefined) {
    columnCount = rowCount
  }

  if (columnCount === 1) {
    mapper = (): BoardCellProps => ({ player: undefined, uuid: crypto.randomUUID() })
  } else {
    mapper = (): Array<BoardCellProps> =>
      [...Array(columnCount)].map(
        (): BoardCellProps => ({ player: undefined, uuid: crypto.randomUUID() }),
      )
  }

  return [...Array(rowCount)].map(mapper)
}

export default createCells
