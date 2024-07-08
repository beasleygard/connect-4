import deepClone from '@/connect4-domain/deep-clone'
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

  getUuids() {
    return deepClone([...this.store.keys()])
  }

  load(gameUuid: GameUuid): PersistentGame | undefined {
    return this.store.get(gameUuid)
  }

  remove(gameUuid: GameUuid) {
    this.store.delete(gameUuid)
  }
}

export default InMemoryRepository
