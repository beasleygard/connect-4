import { Board, BoardCell } from '@/connect4-domain/game'
import InMemoryRepository from '@/connect4-domain/in-memory-repository'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'
import { describe, expect, it } from 'vitest'

const createBoardFromAsciiTable = (asciiTable: string) =>
  parseAsciiTable<BoardCell>(
    asciiTable,
    (input: string): BoardCell => ({
      player: Number.parseInt(input) as 1 | 2,
    }),
  )

const create1x2AsciiTable = () =>
  createBoardFromAsciiTable(`
|---|---|
|   |   |
|---|---|`)

describe('in-memory-repository', () => {
  describe('given defaults', () => {
    it('creates an in-memory repository', () => {
      const repository = new InMemoryRepository()
      expect(repository).toBeInstanceOf(InMemoryRepository)
    })
    it('loads a saved board', () => {
      const repository = new InMemoryRepository()
      const board: Board = create1x2AsciiTable()
      const boardId = repository.save(board)
      expect(repository.load(boardId)).toBe(board)
    })
    it('returns undefined when loading a non-existent board', () => {
      const repository = new InMemoryRepository()
      const boardId = crypto.randomUUID()
      expect(repository.load(boardId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    it('saves a board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const board: Board = create1x2AsciiTable()
      const boardId = repository.save(board)
      expect(store.get(boardId)).toBe(board)
    })
  })
})
