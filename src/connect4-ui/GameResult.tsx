import { GameStatus } from '@/connect4-ui/create-game-api'
import Token from '@/connect4-ui/Token'
import styled from 'styled-components'

type GameResultProps = {
  result: GameStatus
}

const StyledGameResult = styled.div`
  width: 300px;
  background-color: #434c5e;
  padding-block: 50px;
  display: flex;
  justify-content: center;
  position: absolute;

  & > p {
    font-size: 55px;
    position: fixed;
    margin-top: 25px;
    margin-left: 110px;
    top: 0;
    left: 0;
    transform: rotate(-25deg);
  }
`

const GameResult = ({ result }: GameResultProps) => {
  let pane
  switch (result) {
    case GameStatus.PLAYER_ONE_WIN:
      pane = (
        <>
          <Token size={80} color="crimson" />
          <p>👑</p>
        </>
      )
      break
    default:
      pane = <p>SOmething went wrong</p>
  }

  return <StyledGameResult>{pane}</StyledGameResult>
}

export default GameResult
