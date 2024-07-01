import Board, { BoardProps, ClickHandler } from '@/connect4-ui/Board'
import GameOverview, { GameOverviewProps } from '@/connect4-ui/GameOverview'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'

export type ActiveGame = {
  gameOverview: GameOverviewProps
  board: BoardProps
}

export type GameplayAreaProps = {
  activeGame: ActiveGame
  onBoardCellClick?: ClickHandler
  onNewRoundClick?: MouseEventHandler
}

const StyledGameplayArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  row-gap: 20px;
  flex-wrap: wrap;
  min-width: 200px;
`

function GameplayArea({ activeGame, onBoardCellClick, onNewRoundClick }: GameplayAreaProps) {
  return (
    <StyledGameplayArea>
      <GameOverview {...activeGame.gameOverview} onNewRoundClick={onNewRoundClick} />
      <Board {...activeGame.board} onClick={onBoardCellClick} />
    </StyledGameplayArea>
  )
}

export default GameplayArea
