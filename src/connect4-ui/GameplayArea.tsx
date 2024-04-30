import styled from 'styled-components'
import createCells from '@/create-cells'
import GameOverview, { GameOverviewProps } from '@/connect4-ui/GameOverview'
import { BoardProps } from '@/connect4-ui/Board'

type ActiveGame = {
  gameOverview: GameOverviewProps
  board: BoardProps
}

export type GameplayAreaProps = {
  activeGame: ActiveGame
}

const StyledGameplayArea = styled.div<ActiveGame>`
  display: flex;
  background-color: aquamarine;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    <>
      {activeGame ? (
        <>
          <GameOverview />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default GameplayArea
