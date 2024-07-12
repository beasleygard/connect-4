import { BoardCell, GameStatus, PersistentGame } from '@/connect4-domain/game'
import MongoRepository from '@/connect4-domain/mongo-repository'
import parseAsciiTable from '@/connect4-domain/parse-ascii-table'
import { describe, expect, it } from 'vitest'

const createBoardFromAsciiTable = (asciiTable: string) =>
  parseAsciiTable<BoardCell>(asciiTable, (input: string): BoardCell => {
    const playerNumber = Number.parseInt(input) as 1 | 2
    return {
      player: Object.is(playerNumber, NaN) ? undefined : playerNumber,
    }
  })

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
  const repository = new MongoRepository()
  describe('given defaults', () => {
    it('creates a mongo repository', () => {
      expect(repository).toBeInstanceOf(MongoRepository)
    })
    it('loads a saved game', async () => {
      const persistentGame = create1x2PersistedGame()
      const gameId = await repository.save(persistentGame)
      expect(await repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', async () => {
      const gameId = crypto.randomUUID()
      expect(await repository.load(gameId)).toBe(undefined)
    })
    it('returns the list of stored uuids', async () => {
      const gameIds = [
        await repository.save(create1x2PersistedGame()),
        await repository.save(create1x2PersistedGame()),
      ]

      expect(await repository.getUuids()).toEqual(expect.arrayContaining(gameIds))
    })
    it('allows deletion of games by ID', async () => {
      const gameId = await repository.save(create1x2PersistedGame())
      expect(await repository.getUuids()).toEqual(expect.arrayContaining([gameId]))
      await repository.remove(gameId)
      expect(await repository.getUuids()).not.toEqual(expect.arrayContaining([gameId]))
    })
  })
  it('saves a game with a provided ID', async () => {
    const gameId = crypto.randomUUID()
    const game = create1x2PersistedGame()
    expect(await repository.save(game, gameId)).toBe(gameId)
    expect(await repository.load(gameId)).toMatchObject(game)
  })
})
