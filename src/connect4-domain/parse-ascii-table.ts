function parseAsciiTable<T>(asciiTable: string): Array<Array<T>> {
  const tableContent: Array<Array<string>> = asciiTable
    .split('\n')
    .filter((_, index, rows) => index % 2 === 0 && index != 0 && index < rows.length - 1)
    .map((row) => row.match(/(?<=\| )(.*?)(?= \|)/gm)) as Array<Array<string>>
  return tableContent.reduce(
    (parsedRows: Array<Array<T>>, rowContent: Array<string>): Array<Array<T>> => {
      parsedRows.push(
        rowContent.reduce((parsedCells: Array<T>, cellContent: string): Array<T> => {
          if (cellContent.length > 0) {
            parsedCells.push(cellContent as T)
          }
          return parsedCells
        }, []),
      )
      return parsedRows
    },
    [],
  )
}

export default parseAsciiTable
