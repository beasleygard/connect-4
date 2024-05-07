import { describe, expect, it } from 'vitest'
import GameFactory from '@/connect4-domain/game'

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
        expect(asciiBoard).toMatchInlineSnapshot(`
          [
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
            [
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
              {
                "player": undefined,
              },
            ],
          ]
        `)
      })
    })
  })
})
