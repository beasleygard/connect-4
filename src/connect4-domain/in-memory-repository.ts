import { GameRepository, GameUuid, PersistentGame } from '@/connect4-domain/game'

type Store = Map<GameUuid, PersistentGame>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map() as Store) {
    this.store = store
  }

  save(game: PersistentGame, gameUuid: GameUuid = crypto.randomUUID()): GameUuid {
    this.store.set(gameUuid, game)
    return gameUuid
  }

  load(gameUuid: GameUuid): PersistentGame | undefined {
    return this.store.get(gameUuid)
  }
}

export default InMemoryRepository
