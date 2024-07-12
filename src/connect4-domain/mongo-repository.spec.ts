import { BoardCell, GameStatus, PersistentGame } from '@/connect4-domain/game'
import MongoRepository from '@/connect4-domain/mongo-repository'
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

describe('mongo-repository', () => {
  describe('given defaults', () => {
    it('creates a mongo repository', () => {
      const repository = new MongoRepository()
      expect(repository).toBeInstanceOf(MongoRepository)
    })
    it('loads a saved game', () => {
      const repository = new MongoRepository()
      const persistentGame = create1x2PersistedGame()
      const gameId = repository.save(persistentGame)
      expect(repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', () => {
      const repository = new MongoRepository()
      const gameId = crypto.randomUUID()
      expect(repository.load(gameId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    it('saves a game', () => {
      const store = new Map()
      const repository = new MongoRepository(store)
      const persistentGame = create1x2PersistedGame()
      const gameId = repository.save(persistentGame)
      expect(store.get(gameId)).toBe(persistentGame)
    })
    it('loads a saved game', () => {
      const store = new Map()
      const repository = new MongoRepository(store)
      const game = create1x2PersistedGame()
      const gameId = repository.save(game)
      expect(repository.load(gameId)).toBe(game)
    })
    it('returns undefined when loading a non-existent game', () => {
      const store = new Map()
      const repository = new MongoRepository(store)
      const gameId = crypto.randomUUID()
      expect(repository.load(gameId)).toBe(undefined)
    })
  })
  it('saves a game with a provided ID', () => {
    const gameId = crypto.randomUUID()
    const repository = new MongoRepository()
    const game = create1x2PersistedGame()
    expect(repository.save(game, gameId)).toBe(gameId)
    expect(repository.load(gameId)).toBe(game)
  })
})
