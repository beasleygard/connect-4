import { describe, it, expect } from 'vitest'
import isWinningMove from '@/gameLogic'
import createEmptyBoard from '@/createEmptyMatrix'

describe('isWinningMove', () => {
  it.skip('returns false for empty boards', () => {
    const board = createEmptyBoard()

    expect(isWinningMove(board, 0)).toStrictEqual(false)
  })
})
