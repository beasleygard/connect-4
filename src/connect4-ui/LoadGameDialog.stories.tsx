import LoadGameDialog from '@/connect4-ui/LoadGameDialog'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoadGameDialog> = {
  component: LoadGameDialog,
}

type Story = StoryObj<typeof LoadGameDialog>

export const TheOneWithNoSavedGames: Story = {
  args: {},
}

export default meta
