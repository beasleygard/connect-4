import GameFactory from '@/connect4-domain/game'
import GameplayArea, { GameplayAreaProps } from '@/connect4-ui/GameplayArea'
import createGameApi from '@/connect4-ui/create-game-api'
import { Meta, StoryObj } from '@storybook/react'

export default {
  component: GameplayArea,
} satisfies Meta<typeof GameplayArea>

type Story = StoryObj<typeof GameplayArea>

const gameApi = createGameApi(new GameFactory())

export const TheOneWithAnActiveGame: Story = {
  args: {
    roundNumber: 1,
    gameApi: gameApi,
    board: gameApi.getBoard(),
  } satisfies GameplayAreaProps,
}
