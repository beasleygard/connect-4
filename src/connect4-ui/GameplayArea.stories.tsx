import { Meta, StoryObj } from '@storybook/react'
import GameplayArea from '@/connect4-ui/GameplayArea'

export default {
  component: GameplayArea,
} satisfies Meta<typeof GameplayArea>

type Story = StoryObj<typeof GameplayArea>

export const TheOneWithDefaults: Story = {
  args: {},
}
