import { Board, GameRepository, GameUuid, PersistentGame } from '@/connect4-domain/game'

type Store = Map<GameUuid, PersistentGame | Board>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map() as Store) {
    this.store = store
  }

  save(game: PersistentGame | Board, gameUuid: GameUuid = crypto.randomUUID()): GameUuid {
    this.store.set(gameUuid, game)
    return gameUuid
  }

  load(gameUuid: GameUuid): PersistentGame | Board | undefined {
    return this.store.get(gameUuid)
  }
}

export default InMemoryRepository
