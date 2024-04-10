const createEmptyMatrix = (columns?: number): Array<Array<1 | 2 | undefined>> => {
  if (columns === undefined) {
    return []
  }

  return [...Array(columns)].map(() => [])
}

export default createEmptyMatrix
