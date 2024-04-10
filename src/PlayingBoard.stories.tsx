import { StoryObj, Meta } from '@storybook/react'
import { PlayingBoard } from '@/PlayingBoard'

type Story = StoryObj<typeof PlayingBoard>

const meta: Meta<typeof PlayingBoard> = {
  component: PlayingBoard,
}

export default meta

export const TheOneWithTheEmptyBoard: Story = {
  args: {},
}
