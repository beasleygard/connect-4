import { Meta, StoryObj } from '@storybook/react'
import GameOverview from '@/connect4-ui/GameOverview'

const meta: Meta<typeof GameOverview> = {
  component: GameOverview,
}

type Story = StoryObj<typeof GameOverview>

export const TheOneWithDefaults: Story = {
  args: {},
}

export default meta
