const DEFAULT_CELL_PADDING = 1

const createBorderLine = (widths: Array<number>, cellPadding: number): string =>
  `${widths.reduce((borderLine, currentCellWidth) => {
    return borderLine.concat(`|${'-'.repeat(currentCellWidth + 2 * cellPadding)}`)
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
  const resolvedCells = grid.map((gridRow) =>
    gridRow.map((gridElement) => cellResolver(gridElement)),
  )

  const widths: Array<number> = [...Array(columnCount).keys()].map((columnIndex) =>
    [...Array(rowCount).keys()].reduce((maxWidth, rowIndex: number) => {
      const cellContent = resolvedCells[rowIndex][columnIndex]
      return cellContent.length > maxWidth ? cellContent.length : maxWidth
    }, 1),
  )

  const borderLine: string = createBorderLine(widths, DEFAULT_CELL_PADDING)

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
                ? [
                    DEFAULT_CELL_PADDING,
                    DEFAULT_CELL_PADDING + widths[columnIndex] - cellContent.length,
                  ]
                : [DEFAULT_CELL_PADDING, DEFAULT_CELL_PADDING]
            return tableRow.concat(
              '|',
              ' '.repeat(cellPadding[0]),
              isEmptyCell ? ' ' : cellContent,
              ' '.repeat(cellPadding[1]),
            )
          }, '')
          .concat('|'),
      )
      return tableLines
    },
    [''] as Array<string>,
  )

  return tableLines
    .reduce((tableRows, tableRow) => {
      tableRows.push(tableRow)
      tableRows.push(borderLine)
      return tableRows
    }, [] as Array<string>)
    .join('\n')
}

export default toAsciiTable
