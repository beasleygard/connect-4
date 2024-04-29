import styled from 'styled-components'
import Token from './Token'

export type PlayerOverviewProps = {
  player: 1 | 2
  turnsLeft: number
  isActive: boolean
  playerTokenColour?: string
  className?: string
}

const StyledPlayerOverview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #434c5e;
  color: #eceff4;
  text-align: center;
  font-variant-caps: all-small-caps;
`

const OverviewToken = styled(Token)<PlayerOverviewProps>`
  filter: ${(props) => (props.isActive ? 'grayscale(0%)' : 'grayscale(90%)')};
`

const TurnIndicator = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;

  & p {
    margin-top: 5px;
    font-weight: ${(props) => (props.isActive ? '600' : 'inherit')};
  }
  ${(props) =>
    props.isActive
      ? `& div {
    animation-name: spin;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }`
      : ''}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

function PlayerOverview(props: PlayerOverviewProps) {
  const { player, isActive, turnsLeft } = props
  const otherPlayer = player === 1 ? 2 : 1

  return (
    <StyledPlayerOverview>
      <p>{`Player ${player}`}</p>
      <TurnIndicator isActive={isActive}>
        <OverviewToken
          {...props}
          $size={35}
          $color={
            props.playerTokenColour === undefined
              ? player === 1
                ? 'crimson'
                : 'gold'
              : props.playerTokenColour
          }
        />
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
