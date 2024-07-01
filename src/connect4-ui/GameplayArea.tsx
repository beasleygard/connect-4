import Board, { ClickHandler } from '@/connect4-ui/Board'
import GameOverview from '@/connect4-ui/GameOverview'
import { BoardCell, GameApi } from '@/connect4-ui/create-game-api'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'

export type GameplayAreaProps = {
  roundNumber: number
  gameApi: GameApi
  board: Array<Array<BoardCell>>
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

function GameplayArea({
  roundNumber,
  onNewRoundClick,
  onBoardCellClick,
  gameApi,
  board,
}: GameplayAreaProps) {
  return (
    <StyledGameplayArea>
      <GameOverview
        roundNumber={roundNumber}
        activePlayer={gameApi.getActivePlayer()}
        gameStatus={gameApi.getGameStatus()}
        onNewRoundClick={onNewRoundClick}
        playerOneMovesLeft={gameApi.getPlayerRemainingDisks(1)}
        playerTwoMovesLeft={gameApi.getPlayerRemainingDisks(2)}
      />
      <Board cells={board} onClick={onBoardCellClick} gameApi={gameApi} />
    </StyledGameplayArea>
  )
}

export default GameplayArea
