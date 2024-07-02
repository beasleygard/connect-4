import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GameplayAreaMenu> = {
  component: GameplayAreaMenu,
}

type Story = StoryObj<typeof GameplayAreaMenu>

export const TheOneWithDefaults: Story = {
  render: () => <GameplayAreaMenu />,
}
