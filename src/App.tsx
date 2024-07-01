import { createMovePlayerCommand } from '@/connect4-domain/commands'
import GameFactory, { Game } from '@/connect4-domain/game'
import GameplayArea, { ActiveGame } from '@/connect4-ui/GameplayArea'
import StartGameButton from '@/connect4-ui/StartGameButton'
import React from 'react'
import './App.css'

const createHandleBoardCellClick =
  (
    game: Game,
    { gameOverview, board: { cells: boardCells } }: ActiveGame,
    setActiveGame: (activeGame: ActiveGame) => void,
  ) =>
  (row: number, column: number) => {
    game.move(
      createMovePlayerCommand({
        player: game.getActivePlayer(),
        targetCell: {
          row: row,
          column: column,
        },
      }),
    )
    setActiveGame({
      gameOverview: {
        roundNumber: gameOverview.roundNumber,
        movesLeft: game.getStatsForPlayer(1).discsLeft + game.getStatsForPlayer(2).discsLeft,
        activePlayer: game.getActivePlayer(),
        gameStatus: game.getGameStatus(),
      },
      board: {
        cells: boardCells.with(
          row,
          boardCells[row].with(column, {
            player: game.getBoard()[row][column].player,
            uuid: boardCells[row][column].uuid,
          }),
        ),
      },
    })
  }

const createHandleNewRound =
  (setGame: (game: Game) => void, setActiveGame: (activeGame: ActiveGame) => void) =>
  (roundNumber: number) => {
    const game = new GameFactory()
    setGame(game)
    setActiveGame({
      gameOverview: {
        roundNumber: roundNumber,
        movesLeft: game.getStatsForPlayer(1).discsLeft + game.getStatsForPlayer(2).discsLeft,
        activePlayer: game.getActivePlayer(),
        gameStatus: game.getGameStatus(),
      },
      board: {
        cells: game.getBoard(),
      },
    })
  }

const App = () => {
  const [game, setGame] = React.useState<Game>()
  const [activeGame, setActiveGame] = React.useState<ActiveGame>()
  const handleNewRound = createHandleNewRound(setGame, setActiveGame)
  return activeGame === undefined || game === undefined ? (
    <StartGameButton onStartGameClick={() => handleNewRound(1)} />
  ) : (
    <GameplayArea
      activeGame={activeGame}
      onBoardCellClick={createHandleBoardCellClick(game, activeGame, setActiveGame)}
      onNewRoundClick={() => handleNewRound(activeGame.gameOverview.roundNumber + 1)}
    />
  )
}

export default App
