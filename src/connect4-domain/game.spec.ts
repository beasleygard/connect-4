import { describe, expect, it } from 'vitest'
import GameFactory, { BoardCell } from '@/connect4-domain/game'
import _toAsciiTable from '@/connect4-domain/to-ascii-table'

const toAsciiTable = (board: Array<Array<BoardCell>>): string =>
  _toAsciiTable<BoardCell>(board, (value): string => {
    switch (value.player) {
      case 1:
        return '1'
      case 2:
        return '2'
      default:
        return ''
    }
  })
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
        expect(toAsciiTable(board)).toMatchInlineSnapshot(`
          "
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
          |---|---|---|---|---|---|---|"
        `)
      })
      it('creates a game where player 1 starts with a number of discs equal to half the number of cells', () => {
        const game = new GameFactory()
        const player1Stats = game.getStatsForPlayer(1)
        expect(player1Stats).toEqual(
          expect.objectContaining({
            player: 1,
            discsLeft: 21,
          }),
        )
      })
    })
  })
})
