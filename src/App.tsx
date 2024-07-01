import GameFactory, { Game } from '@/connect4-domain/game'
import GameplayArea, { ActiveGame } from '@/connect4-ui/GameplayArea'
import StartGameButton from '@/connect4-ui/StartGameButton'
import { GameApi } from '@/connect4-ui/create-game-api'
import React from 'react'
import './App.css'

const createHandleBoardCellClick =
  (game: Game, gameApi: GameApi, roundNumber: number) => (row: number, column: number) => {
    const activePlayer = gameApi.getActivePlayer()
    gameApi.getBoard()[row][column].handlePlayerMove(activePlayer)
    setActiveGame({
      gameOverview: {
        roundNumber: gameOverview.roundNumber,
        movesLeft: game.getStatsForPlayer(1).discsLeft + game.getStatsForPlayer(2).discsLeft,
        activePlayer: game.getActivePlayer(),
        gameStatus: game.getGameStatus(),
      },
      board: { cells: gameApi.getBoard() },
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
  const [roundNumber, setRoundNumber] = React.useState<number>(0)
  const handleNewRound = createHandleNewRound(setGame, setActiveGame)
  return roundNumber === 0 ? (
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
