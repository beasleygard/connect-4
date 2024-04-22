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
export const TheOneWithAllPlayerOneTokens: Story = {
  args: { cells: createCells(6, 7, (): 1 => 1) },
}

export const TheOneWithAllPlayerTwoTokens: Story = {
  args: { cells: createCells(6, 7, (): 2 => 2) },
}

const alternatingValues: (1 | 2 | undefined)[] = [1, 2, undefined]
let currentValue = 0
const alternateCellsStrategy = (): 1 | 2 | undefined => {
  if (currentValue === 2) {
    currentValue = 0
  } else {
    currentValue++
  }

  return alternatingValues[currentValue]
}
export const TheOneWithAlternatingCells: Story = {
  args: {
    cells: createCells(6, 7, alternateCellsStrategy),
  },
}

export const TheOneWithAModifiedBoardSizeAndNoTokens: Story = {
  args: {
    cells: createCells(9, 2),
  },
}

export const TheOneWithAModifiedBoardSizeAndAlternatingTokens: Story = {
  args: {
    cells: createCells(9, 2, alternateCellsStrategy),
  },
}
