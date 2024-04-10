const createEmptyMatrix = (m?: number, n?: number): Array<Array<1 | 2 | undefined>> => {
  if (n === undefined) {
    return []
  }

  return [...Array(m)].map((): Array<1 | 2 | undefined> => Array(n).fill(undefined))
}

export default createEmptyMatrix
