import Overlay from '@/connect4-ui/Overlay'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Overlay> = {
  component: Overlay,
}

type Story = StoryObj<typeof Overlay>

export const TheOneWithDefaults: Story = {
  args: {},
}

export default meta
