function toAsciiTable(grid: Array<Array<string>>): string {
  const table = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow, currentElement): string => {
        return tableRow.concat(`| ${currentElement} |`)
      }, ''),
    )
    return tableRows
  }, [])

  return grid.length !== 0 ? ['', '|---|', table[0], '|---|'].join('\n') : ''
}

export default toAsciiTable
