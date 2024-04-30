import { Meta, StoryObj } from '@storybook/react'
import RoundOverview, { RoundOverviewProps } from '@/connect4-ui/RoundOverview'

type Story = StoryObj<typeof RoundOverview>

const meta: Meta<typeof RoundOverview> = {
  component: RoundOverview,
}

export const TheOneWithDefaults: Story = {
  args: {} as RoundOverviewProps,
}

export default meta
