import styled from 'styled-components'
import GameOverview, { GameOverviewProps } from '@/connect4-ui/GameOverview'
import Board, { BoardProps } from '@/connect4-ui/Board'

type ActiveGame = {
  gameOverview: GameOverviewProps
  board: BoardProps
}

export type GameplayAreaProps = {
  activeGame: ActiveGame
}

const StyledGameplayArea = styled.div<ActiveGame>`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  gap: 5px;
  flex-wrap: wrap;
  min-width: 200px;
`

const StyledButton = styled.button`
  padding: 20px 15px;
  font-family: monospace;
  font-size: 2rem;
  background-color: lightblue;
  color: blue;
`

function GameplayArea({ activeGame }: GameplayAreaProps) {
  const { gameOverview, board } = activeGame

  return (
    <StyledGameplayArea {...activeGame}>
      <GameOverview {...gameOverview} />
      <Board {...board} />
    </StyledGameplayArea>
  )
}

export default GameplayArea
