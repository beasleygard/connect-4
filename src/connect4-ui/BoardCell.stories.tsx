import BoardCell, { BoardCellProps } from '@/connect4-ui/BoardCell'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { v1 as randomUuid } from 'uuid'

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
  } as BoardCellProps,
}

export const TheOneWithAClickHandler: Story = {
  args: {
    player: 1,
    uuid: randomUuid(),
    onClick: action('Clicked'),
  },
}
