import { describe, expect, it } from 'vitest'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'

describe('parse-ascii-table', () => {
  describe('given a table with no rows or columns', () => {
    it('returns an empty grid', () => {
      const emptyTable = ''
      expect(parseAsciiTable(emptyTable)).toEqual([])
    })
  })
})
