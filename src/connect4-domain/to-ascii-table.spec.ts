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
      describe('and a custom cell resolver', () => {
        it('will use the custom cell resolver to resolve the value of the cell', () => {
          const customResolver = (value: any) => (value === null ? '💩' : '😿')
          const asciiTable = toAsciiTable([[null]], customResolver)
          expect(asciiTable).toStrictEqual(`
|----|
| 💩 |
|----|`)
        })
      })
      describe('where the length of the content of the cell is more than one character', () => {
        it('returns a 1x1 ascii table', () => {
          const asciiTable = toAsciiTable([['999']])
          expect(asciiTable).toStrictEqual(`
|-----|
| 999 |
|-----|`)
        })
      })
      describe('with content 0 characters in length', () => {
        it('returns an empty 1x1 ascii table', () => {
          const asciiTable = toAsciiTable([['']])
          expect(asciiTable).toStrictEqual(`
|---|
|   |
|---|`)
        })
      })
      describe('containing undefined', () => {
        it('returns a 1x1 ascii table', () => {
          const asciiTable = toAsciiTable([[undefined]])
          expect(asciiTable).toStrictEqual(`
|---|
|   |
|---|`)
        })
      })
      describe('containing null', () => {
        it('returns a 1x1 ascii table', () => {
          const asciiTable = toAsciiTable([[null]])
          expect(asciiTable).toStrictEqual(`
|---|
|   |
|---|`)
        })
      })
    })
    describe('and multiple columns', () => {
      describe('where each element resolves to strings of the same length', () => {
        it('returns an ascii table with one row and multiple columns', () => {
          const asciiTable = toAsciiTable<string>([['O', 'O']])
          expect(asciiTable).toStrictEqual(`
|---|---|
| O | O |
|---|---|`)
        })
      })
      describe('where each element resolves to strings of differing lengths', () => {
        it('returns an ascii table with one row and multiple columns', () => {
          const asciiTable = toAsciiTable<number>([[1, 10]])
          expect(asciiTable).toStrictEqual(`
|---|----|
| 1 | 10 |
|---|----|`)
        })
      })
    })
  })
  describe('given a grid with multiple rows', () => {
    describe('and 1 column', () => {
      describe('where the content of each cell is of equal length', () => {
        it('returns an ascii table with multiple rows and 1 column', () => {
          const asciiTable = toAsciiTable([[1], [2]])
          expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|
| 2 |
|---|`)
        })
      })
      describe('where the content of each cell is of differing length', () => {
        it('returns an ascii table with multiple rows and 1 column', () => {
          const asciiTable = toAsciiTable([[1], [20]])
          expect(asciiTable).toStrictEqual(`
|----|
| 1  |
|----|
| 20 |
|----|`)
        })
      })
    })
    describe('and multiple columns', () => {
      describe('where the content of each cell is of equal length', () => {
        it('returns an ascii table with multiple rows and multiple columns', () => {
          const asciiTable = toAsciiTable([
            [1, 1],
            [1, 1],
          ])
          expect(asciiTable).toStrictEqual(`
|---|---|
| 1 | 1 |
|---|---|
| 1 | 1 |
|---|---|`)
        })
      })
      describe('where the content of each cell is of differing length', () => {
        it('returns an ascii table with multiple rows and multiple columns', () => {
          const asciiTable = toAsciiTable([
            [1, 11],
            [111, 1111],
          ])
          expect(asciiTable).toStrictEqual(`
|-----|------|
| 1   | 11   |
|-----|------|
| 111 | 1111 |
|-----|------|`)
        })
      })
    })
  })
})
