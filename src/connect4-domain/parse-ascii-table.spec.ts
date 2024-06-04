import { describe, expect, it } from 'vitest'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'
import toAsciiTable from '@/connect4-domain/to-ascii-table'

describe('parse-ascii-table', () => {
  describe('given a table with no rows or columns', () => {
    it('returns an empty grid', () => {
      const emptyTable = ''
      expect(parseAsciiTable(emptyTable)).toEqual([])
    })
  })
  describe('given a 1x1 ascii table', () => {
    it('returns a 1x1 grid', () => {
      const asciiTable = `
        "
        |---|
        |   |
        |---|"
      `
      expect(parseAsciiTable(asciiTable)).toEqual([[]])
    })
  })
})
