const parseAsciiTable = <T>(
  asciiTable: string,
  cellResolver: (input: string) => T = ((input) => (input.length === 0 ? undefined : input)) as (
    input: string,
  ) => T,
): Array<Array<T>> =>
  asciiTable
    .split('\n')
    .filter((_, index, rows) => index % 2 === 0 && index != 0 && index < rows.length - 1)
    .map((row) =>
      row.match(/(?<=\| )(.*?)(?= +\|)/gm)!.map((cellContent) => cellResolver(cellContent)),
    )

export default parseAsciiTable
