import { Meta, StoryObj } from '@storybook/react'
import Token from '@/Token'

const meta: Meta<typeof Token> = {
  component: Token,
}

type Story = StoryObj<typeof Token>

export const TheOneWithDefaults: Story = {
  args: {},
}

export default meta
