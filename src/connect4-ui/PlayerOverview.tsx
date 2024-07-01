import Token from '@/connect4-ui/Token'
import styled from 'styled-components'

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
  line-height: 90%;
  font-size: 20px;
`

const TurnIndicator = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  height: 70px;
  align-items: center;

  & p {
    margin-top: 5px;
    font-weight: ${(props) => (props.$isActive ? '600' : 'inherit')};
  }

  & > div {
    filter: ${(props) => (props.$isActive ? 'grayscale(0%)' : 'grayscale(90%)')};
    animation: ${(props) => (props.$isActive ? 'spin 2s infinite linear' : 'none')};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

function PlayerOverview({ player, isActive, turnsLeft, playerTokenColour }: PlayerOverviewProps) {
  const otherPlayer = player === 1 ? 2 : 1

  return (
    <StyledPlayerOverview>
      <p>{`Player ${player}`}</p>
      <TurnIndicator $isActive={isActive}>
        <Token
          size={35}
          color={
            playerTokenColour === undefined
              ? player === 1
                ? 'crimson'
                : 'gold'
              : playerTokenColour
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
