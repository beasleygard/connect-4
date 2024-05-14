import { v1 as randomUuid } from 'uuid'
import { BoardCellProps } from '@/connect4-ui/BoardCell'

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
          uuid: randomUuid(),
        }),
      ),
  )
}

export default createCells
