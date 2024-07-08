import GameFactory, { Game } from '@/connect4-domain/game'
import GameplayArea from '@/connect4-ui/GameplayArea'
import StartGameButton from '@/connect4-ui/StartGameButton'
import createGameApi, { BoardCell, GameApi } from '@/connect4-ui/create-game-api'
import React from 'react'
import './App.css'
import './reset.css'

const createHandleBoardCellClick =
  (gameApi: GameApi, setBoard: (board: Array<Array<BoardCell>>) => void) =>
  (row: number, column: number) => {
    const activePlayer = gameApi.getActivePlayer()
    const moveResult = gameApi.getBoard()[row][column].handlePlayerMove(activePlayer)
    if (moveResult.isSuccess) {
      setBoard(gameApi.getBoard())
    }
  }

const createHandleNewRound =
  (
    setGame: (game: Game) => void,
    setRoundNumber: (roundNumber: number) => void,
    setBoard: (board: Array<Array<BoardCell>>) => void,
    gameApiRef: React.MutableRefObject<GameApi>,
  ) =>
  (roundNumber: number) => {
    const game = new GameFactory()
    setGame(game)
    gameApiRef.current = createGameApi(game)
    setBoard(gameApiRef.current.getBoard())
    setRoundNumber(roundNumber)
  }

const createUpdateGameState =
  (setBoard: (board: Array<Array<BoardCell>>) => void, gameApi: GameApi) => () => {
    setBoard(gameApi.getBoard())
  }

const App = () => {
  const [game, setGame] = React.useState<Game>(new GameFactory())
  const gameApi = React.useRef(createGameApi(game))
  const [board, setBoard] = React.useState<Array<Array<BoardCell>>>(gameApi.current.getBoard)
  const [roundNumber, setRoundNumber] = React.useState<number>(0)
  const handleNewRound = createHandleNewRound(setGame, setRoundNumber, setBoard, gameApi)

  return roundNumber === 0 ? (
    <StartGameButton onStartGameClick={() => handleNewRound(1)} />
  ) : (
    <GameplayArea
      board={board}
      roundNumber={roundNumber}
      gameApi={gameApi.current}
      onBoardCellClick={createHandleBoardCellClick(gameApi.current, setBoard)}
      onNewRoundClick={() => handleNewRound(roundNumber + 1)}
      updateGameView={createUpdateGameState(setBoard, gameApi.current)}
    />
  )
}

export default App
