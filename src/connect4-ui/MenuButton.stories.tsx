import MenuButton, { MenuButtonProps } from '@/connect4-ui/MenuButton'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
}

type Story = StoryObj<typeof MenuButton>

export const TheOneWithDefaults: Story = {
  args: {
    text: 'My test button!',
  } satisfies MenuButtonProps,
}

export const TheOneWithAClickHandler: Story = {
  args: {
    text: 'Click me to perform an action!',
    onClick: action('Clicked'),
  },
}

export default meta
