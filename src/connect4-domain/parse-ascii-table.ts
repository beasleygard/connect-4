function parseAsciiTable<T>(
  asciiTable: string,
  cellResolver: (input: string) => T = ((input) => (input.length === 0 ? undefined : input)) as (
    input: string,
  ) => T,
): T[][] {
  return asciiTable
    .split('\n')
    .filter((_, index, rows) => index % 2 === 0 && index != 0 && index < rows.length - 1)
    .map((row) => row.match(/(?<=\| )(.*?)(?= +\|)/gm) as Array<string>)
    .reduce((parsedRows: T[][], rowContent: Array<string>): Array<Array<T>> => {
      parsedRows.push(
        rowContent.reduce((parsedCells: Array<T>, cellContent: string): Array<T> => {
          parsedCells.push(cellResolver(cellContent))
          return parsedCells
        }, []),
      )
      return parsedRows
    }, [])
}

export default parseAsciiTable
