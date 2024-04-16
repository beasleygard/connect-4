import { StoryObj, Meta } from '@storybook/react'
import { Board } from '@/Board'

type Story = StoryObj<typeof Board>

const meta: Meta<typeof Board> = {
  component: Board,
}

export default meta
export const TheOneWithDefaults: Story = {
  args: {},
}
