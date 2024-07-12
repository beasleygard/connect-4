import { BoardCell, GameStatus, PersistentGame } from '@/connect4-domain/game'
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

const create1x2Board = () =>
  createBoardFromAsciiTable(`
|---|---|
|   |   |
|---|---|`)

const create1x2PersistedGame = (): PersistentGame => ({
  board: create1x2Board(),
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
    it('loads a saved game', async () => {
      const repository = new InMemoryRepository()
      const persistentGame = create1x2PersistedGame()
      const gameId = await repository.save(persistentGame)
      expect(await repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', async () => {
      const repository = new InMemoryRepository()
      const gameId = crypto.randomUUID()
      expect(await repository.load(gameId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    it('saves a game', async () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const persistentGame = create1x2PersistedGame()
      const gameId = await repository.save(persistentGame)
      expect(store.get(gameId)).toBe(persistentGame)
    })
    it('loads a saved game', async () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const game = create1x2PersistedGame()
      const gameId = await repository.save(game)
      expect(await repository.load(gameId)).toBe(game)
    })
    it('returns undefined when loading a non-existent game', async () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const gameId = crypto.randomUUID()
      expect(await repository.load(gameId)).toBe(undefined)
    })
  })
  it('saves a game with a provided ID', async () => {
    const gameId = crypto.randomUUID()
    const repository = new InMemoryRepository()
    const game = create1x2PersistedGame()
    expect(await repository.save(game, gameId)).toBe(gameId)
    expect(await repository.load(gameId)).toBe(game)
  })
})
