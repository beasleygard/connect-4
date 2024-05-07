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
  })
})
