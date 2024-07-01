import DualPlayerOverview from '@/connect4-ui/DualPlayerOverview'
import RoundOverview from '@/connect4-ui/RoundOverview'
import { GameStatus } from '@/connect4-ui/create-game-api'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'

export type GameOverviewProps = {
  roundNumber: number
  playerOneMovesLeft: number
  playerTwoMovesLeft: number
  activePlayer: 1 | 2
  gameStatus: GameStatus
  onNewRoundClick?: MouseEventHandler
}

const StyledStatusIndicator = styled.div`
  background-color: #2e3440;
  color: #d8dee9;
  text-align: center;
  font-style: oblique;
  font-size: 20px;
  padding: 15px;
  font-weight: 950;
`

const StyledNewRoundButton = styled.button`
  padding: 20px 15px;
  font-family: monospace;
  font-size: 1.5rem;
  background-color: lightblue;
  color: black;
`

const StyledNewRoundButtonContainer = styled.div`
  width: 300px;
  background-color: #434c5e;
  padding-block: 50px;
`

const StyledFullRoundOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 225px;
  max-width: 300px;
`

function GameOverview({
  activePlayer,
  roundNumber,
  playerOneMovesLeft,
  playerTwoMovesLeft,
  gameStatus = GameStatus.IN_PROGRESS,
  onNewRoundClick,
}: GameOverviewProps) {
  return (
    <StyledFullRoundOverview>
      <RoundOverview roundNumber={roundNumber} />
      {gameStatus === GameStatus.IN_PROGRESS ? (
        <DualPlayerOverview
          player1State={{
            player: 1,
            isActive: activePlayer === 1,
            turnsLeft: playerOneMovesLeft,
          }}
          player2State={{
            player: 2,
            isActive: activePlayer === 2,
            turnsLeft: playerTwoMovesLeft,
          }}
        />
      ) : (
        <StyledNewRoundButtonContainer>
          <StyledNewRoundButton onClick={onNewRoundClick}>Play again?</StyledNewRoundButton>
        </StyledNewRoundButtonContainer>
      )}
      <StyledStatusIndicator>
        {(() => {
          switch (gameStatus) {
            case GameStatus.IN_PROGRESS:
              return 'Game in progress...'
            case GameStatus.PLAYER_ONE_WIN:
              return 'Player 1 wins!'
            case GameStatus.PLAYER_TWO_WIN:
              return 'Player 2 wins!'
            case GameStatus.DRAW:
              return 'Draw!'
          }
        })()}
      </StyledStatusIndicator>
    </StyledFullRoundOverview>
  )
}

GameOverview.defaultProps = {
  roundNumber: 1,
  playerOneMovesLeft: 21,
  playerTwoMovesLeft: 21,
  activePlayer: 1,
} as GameOverviewProps

export default GameOverview
