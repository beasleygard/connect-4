import { StoryObj, Meta } from '@storybook/react'
import { BoardGrid } from '@/BoardGrid'

type Story = StoryObj<typeof BoardGrid>

const meta: Meta<typeof BoardGrid> = {
  component: BoardGrid,
}

export default meta

export const TheOneWithDefaults: Story = {
  args: {},
}

export const TheOneWithPlayerTokens: Story = {
  args: {
    tokenColumns: [
      [1, 2],
      [2, 1, 2],
      [1, 1, 1, 2],
      [2, 2, 1, 2, 1, 2],
      [2, 1],
      [],
      [],
    ],
  },
}
