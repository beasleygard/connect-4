import { StoryObj, Meta } from '@storybook/react'
import Board, { BoardProps } from '@/Board'
import createCells from './create-cells'

type Story = StoryObj<typeof Board>

const meta: Meta<typeof Board> = {
  component: Board,
}

export default meta
export const TheOneWithDefaults: Story = {
  args: { cells: createCells(6, 7) } as BoardProps,
}
