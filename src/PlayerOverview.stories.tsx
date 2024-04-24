import { Meta, StoryObj } from '@storybook/react'
import PlayerOverview, { PlayerOverviewProps } from '@/PlayerOverview'

const meta: Meta<typeof PlayerOverview> = {
  component: PlayerOverview,
}

type Story = StoryObj<typeof PlayerOverview>

export const TheOneWithDefaults: Story = {
  args: {} as PlayerOverviewProps,
}

export const TheOneWithAnInactivePlayer: Story = {
  args: { player: 1, turnsLeft: 15, isActive: false } as PlayerOverviewProps,
}

export const TheOneWithPinkDiskColour: Story = {
  args: {
    player: 1,
    turnsLeft: 15,
    isActive: true,
    playerTokenColour: 'pink',
  } as PlayerOverviewProps,
}

export default meta
