import { Meta, StoryObj } from '@storybook/react'
import FullRoundOverview, { FullRoundOverviewProps } from '@/FullRoundOverview'

const meta: Meta<typeof FullRoundOverview> = {
  component: FullRoundOverview,
}

type Story = StoryObj<typeof FullRoundOverview>

export const TheOneWithDefaults: Story = {
  args: {} as FullRoundOverviewProps,
}

export default meta
