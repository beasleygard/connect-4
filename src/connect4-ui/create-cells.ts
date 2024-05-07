import { BoardCellProps } from '@/connect4-ui/BoardCell'

const crypto = require('crypto')

export type CreateCellsStrategy = () => 1 | 2 | undefined

export const createCells = (
  rowCount?: number,
  columnCount: number | undefined = rowCount,
  strategy: CreateCellsStrategy = () => undefined,
): Array<Array<BoardCellProps>> => {
  if (rowCount === undefined) {
    return []
  }

  return [...Array(rowCount)].map(
    (): Array<BoardCellProps> =>
      [...Array(columnCount)].map(
        (): BoardCellProps => ({
          player: strategy(),
          uuid: crypto.randomUUID(),
        }),
      ),
  )
}

export default createCells