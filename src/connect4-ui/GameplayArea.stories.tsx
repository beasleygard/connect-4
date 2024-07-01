import { GameStatus } from '@/connect4-ui/GameOverview'
import GameplayArea, { GameplayAreaProps } from '@/connect4-ui/GameplayArea'
import createCells from '@/connect4-ui/create-cells'
import { Meta, StoryObj } from '@storybook/react'

export default {
  component: GameplayArea,
} satisfies Meta<typeof GameplayArea>

type Story = StoryObj<typeof GameplayArea>

export const TheOneWithAnActiveGame: Story = {
  args: {
    activeGame: {
      gameOverview: {
        roundNumber: 1,
        movesLeft: 42,
        activePlayer: 1,
        gameStatus: GameStatus.IN_PROGRESS,
      },
      board: {
        cells: createCells(6, 7),
      },
    },
  } satisfies GameplayAreaProps,
}
