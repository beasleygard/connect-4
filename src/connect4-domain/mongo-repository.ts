import {
  Board,
  GameRepository,
  GameStatus,
  GameUuid,
  PersistentGame,
  PlayerNumber,
  PlayerStats,
} from '@/connect4-domain/game'
import MongooseClient from '@/connect4-domain/mongoose-client'
import mongoose, { Schema } from 'mongoose'
interface GameDocument {
  id: Schema.Types.UUID
  board: Board
  activePlayer: PlayerNumber
  gameStatus: GameStatus
  validRowPlacementsByColumn: Array<number>
  playerStats: Record<PlayerNumber, PlayerStats>
}

class MongoRepository implements GameRepository {
  constructor() {
    this.#initialize()
  }
  #initialize = async () => {
    await new MongooseClient().connect()
  }
  #gameSchema = new Schema<GameDocument>({
    id: { type: Schema.Types.UUID, required: true },
    board: {
      type: [[Number]],
      required: true,
      set: (val: Board) => val.map((row) => row.map((cell) => cell.player ?? 0)),
      get: (val: Array<Array<0 | 1 | 2>>): Board =>
        val.map((row) => row.map((cell) => ({ player: cell === 0 ? undefined : cell }))),
    },
    activePlayer: { type: Number },
    gameStatus: { type: String },
    validRowPlacementsByColumn: { type: [Number] },
    playerStats: {
      type: [Number],
      set: (val: Record<PlayerNumber, PlayerStats>): Array<number> => [
        val[1].discsLeft,
        val[2].discsLeft,
      ],
      get: (val: Array<number>): Record<PlayerNumber, PlayerStats> => ({
        1: { player: 1, discsLeft: val[0] },
        2: { player: 2, discsLeft: val[1] },
      }),
    },
  })

  #gameModel = mongoose.model('Game', this.#gameSchema)

  async save(game: PersistentGame, gameUuid: GameUuid = crypto.randomUUID()) {
    const gameSave = new this.#gameModel({ id: gameUuid, ...game })
    await gameSave.save()
    return gameUuid
  }

  async load(gameUuid: GameUuid) {
    return (await this.#gameModel.findOne({ id: gameUuid })) ?? undefined
  }

  async getUuids() {
    return (await this.#gameModel.find()).map((val) => val.id)
  }

  async remove(gameUuid: GameUuid) {
    await this.#gameModel.deleteOne({ id: gameUuid })
  }
}

export default MongoRepository
