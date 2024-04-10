import styled from 'styled-components'
import { BoardColumn } from '@/BoardColumn'
import createEmptyMatrix from '@/createEmptyMatrix'

export type BoardData = Array<Array<1 | 2 | undefined>>

type BoardGridProps = {
  tokenColumns: BoardData
}

const StyledBoardGrid = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 30px;
`

const BoardGrid = (props: BoardGridProps) => {
  return (
    <StyledBoardGrid>
      {[...Array(7).keys()].map((x) => (
        <BoardColumn tokens={props.tokenColumns[x]} key={x} />
      ))}
    </StyledBoardGrid>
  )
}

BoardGrid.defaultProps = { tokenColumns: createEmptyMatrix() }

export { BoardGrid }
