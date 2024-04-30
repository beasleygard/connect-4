import { Meta, StoryObj } from '@storybook/react'
import DualPlayerOverview, { DualPlayerOverviewProps } from '@/connect4-ui/DualPlayerOverview'

const meta: Meta<typeof DualPlayerOverview> = {
  component: DualPlayerOverview,
}

type Story = StoryObj<typeof DualPlayerOverview>

export const TheOneWithDefaults: Story = {
  args: {},
}

export default meta
