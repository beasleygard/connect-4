import { Meta, StoryObj } from '@storybook/react'
import PlayerOverview, { PlayerOverviewProps } from '@/connect4-ui/PlayerOverview'

const meta: Meta<typeof PlayerOverview> = {
  component: PlayerOverview,
}

type Story = StoryObj<typeof PlayerOverview>

export const TheOneWithDefaults: Story = {
  args: {} as PlayerOverviewProps,
}

export const TheOneWithAnInactivePlayer: Story = {
  args: { player: 1, turnsLeft: 15, isActive: false } satisfies PlayerOverviewProps,
}

export const TheOneWithPinkDiskColour: Story = {
  args: {
    player: 1,
    turnsLeft: 15,
    isActive: true,
    playerTokenColour: 'pink',
  } satisfies PlayerOverviewProps,
}

export default meta
