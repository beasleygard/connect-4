import GameResult from '@/connect4-ui/GameResult'
import { GameStatus } from '@/connect4-ui/create-game-api'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GameResult> = {
  component: GameResult,
}

type Story = StoryObj<typeof GameResult>

export const TheOneWithAPlayer1Win: Story = {
  args: {
    result: GameStatus.PLAYER_ONE_WIN,
  },
}

export default meta
