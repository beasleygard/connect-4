function createBorder(width: number): string {
  return `|${'-'.repeat(width)}`
}

function toAsciiTable(grid: Array<Array<string>>): string {
  const cellPadding = 1
  const widths: Array<number> = []

  if (grid.length === 0 || grid[0].length === 0) {
    return ''
  }

  for (let columnIndex = 0; columnIndex < grid[0].length; columnIndex++) {
    widths.push(
      [...Array(grid.length).keys()].reduce((maxWidth, rowIndex: number) => {
        if (grid[rowIndex][columnIndex] === undefined) {
          return maxWidth
        }
        const cellContentLength = `${grid[rowIndex][columnIndex]}`.length
        return cellContentLength > maxWidth ? cellContentLength : maxWidth
      }, 1),
    )
  }

  let tableRows: Array<string> = grid.reduce((tableRows, gridRow) => {
    tableRows.push(
      gridRow.reduce((tableRow, gridElement) => {
        const shouldUseSpace = gridElement === undefined || `${gridElement}`.length < 1
        return tableRow.concat(`| ${shouldUseSpace ? ' ' : `${gridElement}`} |`)
      }, ''),
    )
    return tableRows
  }, [])

  tableRows = tableRows.reduce((tableRows, tableRow) => {
    tableRows.push(
      `${widths.reduce((borderLine, currentCellWidth) => {
        return borderLine.concat(createBorder(currentCellWidth + 2 * cellPadding))
      }, '')}|`,
    )
    tableRows.push(tableRow)
    return tableRows
  }, [] as Array<string>)

  tableRows.push(
    `${widths.reduce((borderLine, currentCellWidth) => {
      return borderLine.concat(createBorder(currentCellWidth + 2 * cellPadding))
    }, '')}|`,
  )

  return ['', ...tableRows].join('\n')
}

export default toAsciiTable
