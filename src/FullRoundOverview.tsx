import RoundOverview from '@/RoundOverview'
import DualPlayerOverview from './DualPlayerOverview'
import styled from 'styled-components'

type FullRoundOverviewProps = {
  roundNumber: number
  movesLeft: number
  activePlayer: 1 | 2
}

const StyledFullRoundOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 300px;
  max-width: 350px;
`

function FullRoundOverview({ activePlayer, roundNumber, movesLeft }: FullRoundOverviewProps) {
  return (
    <StyledFullRoundOverview>
      <RoundOverview roundNumber={roundNumber} />
      <DualPlayerOverview
        player1State={{
          player: 1,
          isActive: activePlayer === 1,
          turnsLeft: Math.floor(movesLeft / 2.0),
        }}
        player2State={{
          player: 2,
          isActive: activePlayer === 2,
          turnsLeft: Math.ceil(movesLeft / 2.0),
        }}
      />
    </StyledFullRoundOverview>
  )
}

FullRoundOverview.defaultProps = {
  roundNumber: 1,
  movesLeft: 42,
  activePlayer: 1,
} as FullRoundOverviewProps

export default FullRoundOverview
