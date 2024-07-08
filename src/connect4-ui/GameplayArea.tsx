import Board, { ClickHandler } from '@/connect4-ui/Board'
import GameOverview from '@/connect4-ui/GameOverview'
import GameplayAreaMenu from '@/connect4-ui/GameplayAreaMenu'
import LoadGameDialog from '@/connect4-ui/LoadGameDialog'
import { BoardCell, GameApi } from '@/connect4-ui/create-game-api'
import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

export type GameplayAreaProps = {
  roundNumber: number
  gameApi: GameApi
  board: Array<Array<BoardCell>>
  onBoardCellClick?: ClickHandler
  onNewRoundClick?: MouseEventHandler
  updateGameView: () => void
}

const StyledGameplayArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  gap: 1rem;
  flex-wrap: wrap;
  min-width: 200px;
  margin-top: 2rem;
`

function GameplayArea({
  roundNumber,
  onNewRoundClick,
  onBoardCellClick,
  gameApi,
  board,
  updateGameView,
}: GameplayAreaProps) {
  const [displayDialogue, setDisplayDialogue] = React.useState(false)
  return (
    <>
      <GameplayAreaMenu>
        <button onClick={gameApi.save}>Save Game</button>
        <button onClick={() => setDisplayDialogue(true)}>Load Game</button>
        <button onClick={onNewRoundClick}>New Game</button>
      </GameplayAreaMenu>
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
      {displayDialogue ? (
        <LoadGameDialog
          dialogDismissalHandler={() => setDisplayDialogue(false)}
          gameApi={gameApi}
          updateGameView={updateGameView}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default GameplayArea
