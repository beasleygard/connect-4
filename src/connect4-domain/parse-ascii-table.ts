type NullableString = string | null

function parseAsciiTable<T>(asciiTable: string): Array<Array<T>> {
  return asciiTable
    .split('\n')
    .filter((_, index, rows) => index % 2 === 0 && index != 0 && index < rows.length - 1)
    .map((row) => row.match(/(?<=\| )(.*?)(?= \|)/gm) as Array<NullableString>)
    .reduce((parsedRows: Array<Array<T>>, rowContent: Array<NullableString>): Array<Array<T>> => {
      parsedRows.push(
        rowContent.reduce((parsedCells: Array<T>, cellContent: NullableString): Array<T> => {
          if (cellContent !== null && cellContent.length > 0) {
            parsedCells.push(cellContent as T)
          }
          return parsedCells
        }, []),
      )
      return parsedRows
    }, [])
}

export default parseAsciiTable
