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

  & > p {
    font-size: 55px;
    position: fixed;
  }

  & > .crown {
    transform: rotate(-25deg) translateY(-70%);
  }

  & > div {
    margin: 0px 30px;
  }
`

const GameResult = ({ result }: GameResultProps) => {
  let pane
  switch (result) {
    case GameStatus.PLAYER_ONE_WIN:
      pane = (
        <>
          <Token size={80} color="crimson" />
          <p className="crown">👑</p>
        </>
      )
      break
    case GameStatus.PLAYER_TWO_WIN:
      pane = (
        <>
          <Token size={80} color="gold" />
          <p className="crown">👑</p>
        </>
      )
      break
    case GameStatus.DRAW:
      pane = (
        <>
          <Token size={80} color="crimson" />
          <Token size={80} color="gold" />
          <p>🤝</p>
        </>
      )
      break
    default:
      pane = <></>
  }

  return <StyledGameResult>{pane}</StyledGameResult>
}

export type { GameResultProps }
export default GameResult
