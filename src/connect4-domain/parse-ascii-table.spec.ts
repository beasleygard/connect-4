import { describe, expect, it } from 'vitest'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'

const stringToNumberResolver = (input: string): number => Number(input)

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
|--|
|  |
|--|
`
      expect(parseAsciiTable<undefined>(asciiTable)).toEqual([[undefined]])
    })
    describe('with a non-empty cell', () => {
      it('returns a 1x1 grid', () => {
        const asciiTable = `
|---|
| 1 |
|---|`
        expect(parseAsciiTable(asciiTable)).toEqual([['1']])
      })
      describe('and a custom cell resolver', () => {
        it('returns a 1x1 grid with a resolved value', () => {
          const asciiTable = `
        |---|
        | 1 |
        |---|`
          expect(parseAsciiTable(asciiTable, stringToNumberResolver)).toEqual([[1]])
        })
      })
      describe('with trailing whitespace', () => {
        it('returns a 1x1 grid trimming the trailing whitespace', () => {
          const asciiTable = `
|----|
| 1  |
|----|`
          expect(parseAsciiTable(asciiTable)).toEqual([['1']])
        })
      })
    })
  })
  describe('given a 2x1 ascii table', () => {
    describe('where all cells hold content of the same length', () => {
      it('returns a 2x1 grid', () => {
        const asciiTable = `
|---|
| 1 |
|---|
| 2 |
|---|`
        expect(parseAsciiTable(asciiTable)).toEqual([['1'], ['2']])
      })
    })
    describe('where all cells hold content of differing length', () => {
      it('returns a 2x1 grid', () => {
        const asciiTable = `
|----|
| 1  |
|----|
| 10 |
|----|`
        expect(parseAsciiTable(asciiTable)).toEqual([['1'], ['10']])
      })
    })
  })
})
