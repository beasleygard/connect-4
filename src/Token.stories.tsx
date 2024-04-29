import { Meta, StoryObj } from '@storybook/react'
import Token from '@/Token'

const meta: Meta<typeof Token> = {
  component: Token,
}

type Story = StoryObj<typeof Token>

export const TheOneWithDefaults: Story = {
  args: {},
}

export const TheOneWithACustomColour: Story = {
  args: {
    $size: 80,
    $color: 'pink',
  },
}

export default meta
