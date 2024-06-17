import { Board, BoardId, GameRepository } from '@/connect4-domain/game'

type BoardStore = Map<BoardId, Board>

class InMemoryRepository implements GameRepository {
  private store: BoardStore

  constructor(store: BoardStore = new Map() as BoardStore) {
    this.store = store
  }

  save(board: Board): BoardId {
    const boardId = crypto.randomUUID()
    this.store.set(boardId, board)
    return boardId
  }

  load(boardId: BoardId): Board | undefined {
    return this.store.get(boardId)
  }
}

export default InMemoryRepository
