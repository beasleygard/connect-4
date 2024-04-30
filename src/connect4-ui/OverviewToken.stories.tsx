import { Meta, StoryObj } from '@storybook/react'
import OverviewToken from './OverviewToken'
import { TokenProps } from '@/connect4-ui/Token'

const meta: Meta<typeof OverviewToken> = {
  component: OverviewToken,
}

type Story = StoryObj<typeof OverviewToken>

export const TheOneWithDefaults: Story = {
  args: {},
}

export const TheOneWithACustomColorAndSize50: Story = {
  args: {
    size: 50,
    color: 'pink',
    isActive: true,
  } satisfies TokenProps & { isActive: boolean },
}
export default meta
