import Board, { ClickHandler } from '@/connect4-ui/Board'
import GameOverview from '@/connect4-ui/GameOverview'
import GameplayAreaMenu from '@/connect4-ui/GameplayAreaMenu'
import LoadGameDialog from '@/connect4-ui/LoadGameDialog'
import MenuButton from '@/connect4-ui/MenuButton'
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
        <MenuButton text="Save Game" onClick={gameApi.save} />
        <MenuButton text="Load Game" onClick={() => setDisplayDialogue(true)}></MenuButton>
        <MenuButton text="New Game" onClick={onNewRoundClick}></MenuButton>
      </GameplayAreaMenu>
      <StyledGameplayArea>
        <GameOverview
          roundNumber={roundNumber}
          activePlayer={gameApi.getActivePlayer()}
          gameStatus={gameApi.getGameStatus()}
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
