import RoundOverview from '@/connect4-ui/RoundOverview'
import DualPlayerOverview from '@/connect4-ui/DualPlayerOverview'
import styled from 'styled-components'

export type GameOverviewProps = {
  roundNumber: number
  movesLeft: number
  activePlayer: 1 | 2
}

const StyledFullRoundOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 225px;
  max-width: 300px;
`

function GameOverview({ activePlayer, roundNumber, movesLeft }: GameOverviewProps) {
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

GameOverview.defaultProps = {
  roundNumber: 1,
  movesLeft: 42,
  activePlayer: 1,
} as GameOverviewProps

export default GameOverview
