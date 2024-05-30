import { describe, expect, it } from 'vitest'

describe('events', () => {
  describe('createPlayerMoveFailedEvent', () => {
    it('should return a PlayerMoveFailedEvent', () => {
      const playerMoveFailedEvent = createPlayerMoveFailedEvent({
        message:
          'Cell at row -1 column 0 does not exist on the board. The row number must be >= 0 and <= 1',
      })
      expect(playerMoveFailedEvent).toBeInstanceOf(PlayerMoveFailedEvent)
      expect(playerMoveFailedEvent).toEqual({
        type: 'PLAYER_MOVE_FAILED',
        payload: {
          message:
            'Cell at row -1 column 0 does not exist on the board. The row number must be >= 0 and <= 1',
        },
      })
    })
  })
})
