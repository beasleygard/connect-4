import { StoryObj, Meta } from '@storybook/react'
import { BoardColumn } from '@/BoardColumn'

type Story = StoryObj<typeof BoardColumn>

const meta: Meta<typeof BoardColumn> = {
  component: BoardColumn,
}

export default meta

export const TheOneWithDefaults: Story = {
  args: {
    tokens: [],
  },
}

export const TheOneWithPlayerTokens: Story = {
  args: {
    tokens: [1, 2, 1, 2, 1],
  },
}
