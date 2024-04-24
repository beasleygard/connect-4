import { Meta, StoryObj } from '@storybook/react'
import DualPlayerOverview, { DualPlayerOverviewProps } from '@/DualPlayerOverview'

const meta: Meta<typeof DualPlayerOverview> = {
  component: DualPlayerOverview,
}

type Story = StoryObj<typeof DualPlayerOverview>

export const TheOneWithDefaults: Story = {
  args: {} as DualPlayerOverviewProps,
}

export default meta
