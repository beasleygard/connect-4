import { describe, expect, it } from 'vitest'
import GameFactory, { BoardCell } from '@/connect4-domain/game'
import toAsciiTable from '@/connect4-domain/to-ascii-table'

const boardAsciiTableStrategy = (value: BoardCell) => {
  switch (value.player) {
    case 1:
      return '1'
    case 2:
      return '2'
    default:
      return ''
  }
}
describe('game', () => {
  describe('new game', () => {
    describe('given defaults', () => {
      it('should return an instance of Game', () => {
        const game = new GameFactory()
        expect(game).toBeInstanceOf(GameFactory)
      })
      it('creates a 6x7 board', () => {
        const game = new GameFactory()
        const board = game.getBoard()
        expect(toAsciiTable(board, boardAsciiTableStrategy)).toStrictEqual(`
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|`)
      })
    })
  })
})
