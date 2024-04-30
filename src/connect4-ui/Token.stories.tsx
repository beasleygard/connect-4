import { Meta, StoryObj } from '@storybook/react'
import Token, { TokenProps } from '@/connect4-ui/Token'

const meta: Meta<typeof Token> = {
  component: Token,
}

type Story = StoryObj<typeof Token>

export const TheOneWithDefaults: Story = {
  args: {},
}

export const TheOneWithACustomColour: Story = {
  args: {
    size: 80,
    color: 'pink',
  } satisfies TokenProps,
}

export default meta
