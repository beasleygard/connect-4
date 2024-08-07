const createBorderLine = (widths: Array<number>): string =>
  `${widths.reduce((borderLine, currentCellWidth) => {
    return borderLine.concat(`|${'-'.repeat(currentCellWidth + 2)}`)
  }, '')}|`

const defaultResolver = <T>(value: T): string =>
  value === null || value === undefined ? '' : `${value}`

function toAsciiTable<T>(
  grid: Array<Array<T>>,
  cellResolver: (value: T) => string = defaultResolver<T>,
): string {
  const rowCount: number = grid.length
  const columnCount: number = grid[0]?.length
  if (rowCount === 0 || columnCount === 0) {
    return ''
  }

  const resolvedCells = [...Array(rowCount)].map(() => Array(columnCount))
  const widths = [...Array(columnCount)]
  for (const columnIndex of [...Array(columnCount).keys()]) {
    let maxWidth = 1
    for (const rowIndex of [...Array(rowCount).keys()]) {
      const resolvedCellContent = cellResolver(grid[rowIndex][columnIndex])
      resolvedCells[rowIndex][columnIndex] = resolvedCellContent
      if (resolvedCellContent.length > maxWidth) {
        maxWidth = resolvedCellContent.length
      }
    }
    widths[columnIndex] = maxWidth
  }

  const borderLine: string = createBorderLine(widths)

  const tableLines: Array<string> = resolvedCells.reduce(
    (tableLines, resolvedCellRow) => {
      tableLines.push(
        resolvedCellRow
          .reduce((tableRow, cellContent, columnIndex) => {
            if (cellContent.length === 0) {
              cellContent = ' '
            }
            const isEmptyCell = cellContent.length < 1
            const cellPadding =
              cellContent.length < widths[columnIndex]
                ? 1 + widths[columnIndex] - cellContent.length
                : 1
            return tableRow.concat('| ', isEmptyCell ? ' ' : cellContent, ' '.repeat(cellPadding))
          }, '')
          .concat('|'),
      )
      tableLines.push(borderLine)
      return tableLines
    },
    [, borderLine] as Array<string>,
  )

  return tableLines.join('\n')
}

export default toAsciiTable
