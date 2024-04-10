import { StyledPlayerToken } from './BoardCell'
import { BoardGrid, BoardData } from '@/BoardGrid'
import { useState } from 'react'
import styled from 'styled-components'
import getEmptyBoard from '@/createEmptyMatrix'
import { isWinningMove, isBoardFull } from './gameLogic'

type MovePromptListProp = {
  player: 1 | 2
  handlePlayerMove: Function
  fullColumns: Array<number>
}

const StyledMovePromptList = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledPlayerTokenPrompt = styled(StyledPlayerToken)`
  position: relative;
  opacity: 70%;
  bottom: 0;
  transition: bottom ease 0.2s;
`

const StyledMovePromptBox = styled.div`
  width: 60px;
  height: 60px;

  &:hover > div {
    opacity: 90%;
    bottom: -50%;
  }
`

const MovePromptList = (props: MovePromptListProp) => {
  return (
    <StyledMovePromptList>
      {[...Array(7).keys()].map((x) =>
        props.fullColumns.indexOf(x) === -1 ? (
          <StyledMovePromptBox onClick={() => props.handlePlayerMove(x)} key={x}>
            <StyledPlayerTokenPrompt $player={props.player} />
          </StyledMovePromptBox>
        ) : (
          <StyledMovePromptBox key={x} />
        ),
      )}
    </StyledMovePromptList>
  )
}

export const PlayingBoard = () => {
  const [boardState, setBoardState] = useState<BoardData>(() => getEmptyBoard(7))
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1)

  const handlePlayerMove = (column: number) => {
    if (boardState[column].length < 6) {
      const newBoardState: BoardData = boardState
      newBoardState[column].push(currentPlayer)
      setBoardState(newBoardState)
      if (isWinningMove(boardState, currentPlayer, column)) {
        alert(`${currentPlayer == 1 ? 'Red' : 'Yellow'} won!!!`)
        setBoardState(getEmptyBoard(7))
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
      }
    } else if (isBoardFull(boardState)) {
      setBoardState(getEmptyBoard(7))
    }
  }

  return (
    <div style={{ width: 420 }}>
      <MovePromptList
        player={currentPlayer}
        handlePlayerMove={handlePlayerMove}
        fullColumns={[...Array(7).keys()].filter((column) => boardState[column].length >= 6)}
      />
      <BoardGrid tokenColumns={boardState} />
    </div>
  )
}
