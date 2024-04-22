import styled from 'styled-components'
import { BoardCell, BoardCellProps } from './BoardCell'
import createCells from './create-cells'

export type BoardProps = {
  cells: Array<Array<BoardCellProps>>
}

type GridBoardCellProps = BoardCellProps & {
  row: number
  column: number
}

const StyledBoard = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
`

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
  grid-column-start: ${(props) => props.column};
  grid-row-start: ${(props) => props.row};
`

const Board = (props: BoardProps) => {
  return (
    <StyledBoard>
      {props.cells
        .reverse()
        .flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <GridBoardCell
              className={cell.className}
              player={cell.player}
              uuid={cell.uuid}
              key={cell.uuid}
              column={columnIndex + 1}
              row={rowIndex + 1}
            />
          )),
        )}
    </StyledBoard>
  )
}

Board.defaultProps = { cells: createCells(6, 7) }

export default Board
