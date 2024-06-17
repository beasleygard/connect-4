import { Board } from '@/connect4-domain/game'

type BoardId = `${string}-${string}-${string}-${string}-${string}`

type BoardStore = Map<BoardId, Board>

interface GameRepository {
  save: (board: Board) => BoardId
}

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
}

export default InMemoryRepository
