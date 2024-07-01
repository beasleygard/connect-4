import Board, { BoardProps } from '@/connect4-ui/Board'
import createCells from '@/connect4-ui/create-cells'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Board>

const meta: Meta<typeof Board> = {
  component: Board,
}

const alternatingValues: (1 | 2 | undefined)[] = [1, 2, undefined]
let currentValue = 0

const randomizedCellStrategy = () => alternatingValues[Math.floor(Math.random() * 3)]

export default meta
export const TheOneWithDefaults: Story = {
  args: {} as BoardProps,
}
export const TheOneWithAllPlayerOneTokens: Story = {
  args: { cells: createCells(6, 7, (): 1 => 1) } as BoardProps,
}

export const TheOneWithAllPlayerTwoTokens: Story = {
  args: { cells: createCells(6, 7, (): 2 => 2) } as BoardProps,
}

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
  } as BoardProps,
}

export const TheOneWithRandomizedTokens: Story = {
  args: {
    cells: createCells(6, 7, randomizedCellStrategy),
  } as BoardProps,
}

export const TheOneWithAModifiedBoardSizeAndNoTokens: Story = {
  args: {
    cells: createCells(9, 2),
  } as BoardProps,
}

export const TheOneWithAModifiedBoardSizeAndAlternatingTokens: Story = {
  args: {
    cells: createCells(9, 2, alternateCellsStrategy),
  } as BoardProps,
}

export const TheOneWithAClickHandler: Story = {
  args: {
    cells: createCells(6, 7),
    onClick: action('Clicked'),
  },
}
