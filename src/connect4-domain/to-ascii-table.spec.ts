import { describe, expect, it } from 'vitest'
import toAsciiTable from '@/connect4-domain/to-ascii-table'

describe('to-ascii-table', () => {
  describe('given an empty grid', () => {
    it('will return an empty ascii table', () => {
      const asciiTable = toAsciiTable([])
      expect(asciiTable).toStrictEqual('')
    })
  })
  describe('given a grid with 1 row', () => {
    describe('and 1 column', () => {
      it('will return a 1x1 ascii table', () => {
        const asciiTable = toAsciiTable([['1']])
        expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|`)
      })
    })
  })
})
