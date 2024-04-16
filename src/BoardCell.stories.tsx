import { StoryObj, Meta } from '@storybook/react'
import { BoardCell } from '@/BoardCell'

type Story = StoryObj<typeof BoardCell>

const meta: Meta<typeof BoardCell> = {
  component: BoardCell,
}

export default meta
export const TheOneWithDefaults: Story = {
  args: {},
}

export const TheOneWithAPlayerToken: Story = {
  args: {
    player: 1,
  },
}
