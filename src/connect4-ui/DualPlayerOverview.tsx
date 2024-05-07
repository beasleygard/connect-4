import styled from 'styled-components'
import PlayerOverview, { PlayerOverviewProps } from '@/connect4-ui/PlayerOverview'

type SpecifiedPlayerOverviewProps<T extends 1 | 2> = Omit<PlayerOverviewProps, 'player'> & {
  player: T
}
export type DualPlayerOverviewProps = {
  player1State: SpecifiedPlayerOverviewProps<1>
  player2State: SpecifiedPlayerOverviewProps<2>
  activePlayer: 1 | 2
}

const DualPlayerOverviewProps = styled.div`
  display: flex;
  gap: 5px;

  & > div {
    width: 50%;
  }
`

function DualPlayerOverview({ player1State, player2State }: DualPlayerOverviewProps) {
  return (
    <DualPlayerOverviewProps>
      <PlayerOverview {...player1State} />
      <PlayerOverview {...player2State} />
    </DualPlayerOverviewProps>
  )
}

DualPlayerOverview.defaultProps = {
  player1State: {
    player: 1,
    isActive: true,
    turnsLeft: 21,
  },
  player2State: {
    player: 2,
    isActive: false,
    turnsLeft: 21,
  },
  activePlayer: 1,
} as DualPlayerOverviewProps

export default DualPlayerOverview
