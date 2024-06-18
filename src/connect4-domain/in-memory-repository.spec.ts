import { Board, BoardCell, GameStatus, PersistentGame } from '@/connect4-domain/game'
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

const create1x2PersistedGame = (): PersistentGame => ({
  board: create1x2AsciiTable(),
  activePlayer: 1,
  gameStatus: 'IN_PROGRESS' as GameStatus.IN_PROGRESS,
  validRowPlacementsByColumn: [0, 0],
  playerStats: {
    1: {
      player: 1,
      discsLeft: 1,
    },
    2: {
      player: 2,
      discsLeft: 2,
    },
  },
})

describe('in-memory-repository', () => {
  describe('given defaults', () => {
    it('creates an in-memory repository', () => {
      const repository = new InMemoryRepository()
      expect(repository).toBeInstanceOf(InMemoryRepository)
    })
    it('loads a saved game', () => {
      const repository = new InMemoryRepository()
      const persistentGame = create1x2PersistedGame()
      const gameId = repository.save(persistentGame)
      expect(repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', () => {
      const repository = new InMemoryRepository()
      const gameId = crypto.randomUUID()
      expect(repository.load(gameId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    it('saves a game', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const persistentGame = create1x2PersistedGame()
      const gameId = repository.save(persistentGame)
      expect(store.get(gameId)).toBe(persistentGame)
    })
    it('loads a saved board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const board: Board = create1x2AsciiTable()
      const boardId = repository.save(board)
      expect(repository.load(boardId)).toBe(board)
    })
    it('returns undefined when loading a non-existent board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const boardId = crypto.randomUUID()
      expect(repository.load(boardId)).toBe(undefined)
    })
  })
  it('saves a board with a provided ID', () => {
    const boardId = crypto.randomUUID()
    const repository = new InMemoryRepository()
    const board = create1x2AsciiTable()
    expect(repository.save(board, boardId)).toBe(boardId)
    expect(repository.load(boardId)).toBe(board)
  })
})
