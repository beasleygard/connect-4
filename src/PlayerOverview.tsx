import styled from 'styled-components'
import Token from './Token'

export type PlayerOverviewProps = {
  player: 1 | 2
  turnsLeft: number
  isActive: boolean
  playerTokenColour?: string
}

const StyledPlayerOverview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #434c5e;
  color: #eceff4;
  text-align: center;
`

const OverviewToken = styled(Token)<PlayerOverviewProps>`
  /* opacity: ${(props) => (props.isActive ? '100%' : '60%')}; */
  filter: ${(props) => (props.isActive ? 'grayscale(0%)' : 'grayscale(90%)')};
`

const TurnIndicator = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  height: 80px;
  align-items: center;

  & p {
    margin-top: 0px;
    font-weight: ${(props) => (props.isActive ? '600' : 'inherit')};
  }
`

function PlayerOverview(props: PlayerOverviewProps) {
  const { player, isActive, turnsLeft } = props
  const otherPlayer = player === 1 ? 2 : 1

  return (
    <StyledPlayerOverview>
      <p>{`Player ${player}`}</p>
      <TurnIndicator isActive={isActive}>
        <OverviewToken {...props} size={35} color={player === 1 ? 'crimson' : 'gold'} />
        <p>{isActive ? 'Your Turn!' : `Waiting for Player ${otherPlayer}...`}</p>
      </TurnIndicator>
      <p>{`Turns left: ${turnsLeft}`}</p>
    </StyledPlayerOverview>
  )
}

PlayerOverview.defaultProps = {
  player: 1,
  turnsLeft: 21,
  isActive: true,
} as PlayerOverviewProps

export default PlayerOverview
