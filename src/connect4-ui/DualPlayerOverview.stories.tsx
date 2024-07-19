import DualPlayerOverview from '@/connect4-ui/DualPlayerOverview'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DualPlayerOverview> = {
  component: DualPlayerOverview,
}

type Story = StoryObj<typeof DualPlayerOverview>

export const TheOneWithDefaults: Story = {
  args: {},
}

export default meta
