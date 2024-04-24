import { Meta, StoryObj } from '@storybook/react'
import RoundOverview, { RoundOverviewProps } from '@/RoundOverview'

type Story = StoryObj<typeof RoundOverview>

const meta: Meta<typeof RoundOverview> = {
  component: RoundOverview,
}

export const TheOneWithDefaults: Story = {
  args: {} as RoundOverviewProps,
}

export default meta
