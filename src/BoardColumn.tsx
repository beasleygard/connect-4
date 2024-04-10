import styled from 'styled-components'
import { BoardCell } from '@/BoardCell'

type BoardColumnProps = {
  tokens?: (1 | 2 | undefined)[]
}

const StyledBoardColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardColumn = (props: BoardColumnProps) => {
  return (
    <StyledBoardColumn>
      {[...Array(6).keys()].reverse().map((x) => (
        <BoardCell player={props.tokens?.[x]} key={x} />
      ))}
    </StyledBoardColumn>
  )
}

BoardColumn.defaultProps = {
  tokens: [],
}

export { BoardColumn }
