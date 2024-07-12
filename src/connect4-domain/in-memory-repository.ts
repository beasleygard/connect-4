import deepClone from '@/connect4-domain/deep-clone'
import { GameRepository, GameUuid, PersistentGame } from '@/connect4-domain/game'

type Store = Map<GameUuid, PersistentGame>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map() as Store) {
    this.store = store
  }

  save(game: PersistentGame, gameUuid: GameUuid = crypto.randomUUID()) {
    this.store.set(gameUuid, game)
    return Promise.resolve(gameUuid)
  }

  getUuids() {
    return Promise.resolve(deepClone([...this.store.keys()]))
  }

  load(gameUuid: GameUuid) {
    return Promise.resolve(this.store.get(gameUuid))
  }

  remove(gameUuid: GameUuid) {
    this.store.delete(gameUuid)
    return Promise.resolve()
  }
}

export default InMemoryRepository
