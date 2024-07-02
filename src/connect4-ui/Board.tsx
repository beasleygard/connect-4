import BoardCell, { BoardCellProps } from '@/connect4-ui/BoardCell'
import createCells from '@/connect4-ui/create-cells'
import { GameApi } from '@/connect4-ui/create-game-api'
import React from 'react'
import styled from 'styled-components'

export type ClickHandler = (row: number, column: number) => void

export type BoardProps = {
  gameApi: GameApi
  cells: Array<Array<BoardCellProps>>
  onClick?: ClickHandler
}

type GridBoardCellProps = {
  row: number
  column: number
  columnCount: number
  rowCount: number
}

const VIEWPORT_PERCENTAGE = 80
const TOKEN_SCALE_FACTOR = 0.8

const getCellSize = (
  { columnCount, rowCount }: GridBoardCellProps,
  viewportPercentage: number,
  scaleFactor: number = 1,
) => {
  return `calc(${scaleFactor} * ${viewportPercentage}svmin / ${Math.max(columnCount, rowCount)})`
}

const StyledBoardGrid = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
`

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
  grid-column-start: ${(props) => props.column};
  grid-row-start: ${(props) => props.row};

  min-width: 15px;
  min-height: 15px;
  width: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE)};
  max-width: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE)};
  height: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE)};
  max-height: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE)};

  & > div {
    min-width: 15px;
    width: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE, TOKEN_SCALE_FACTOR)};
    max-width: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE, TOKEN_SCALE_FACTOR)};
    min-height: 15px;
    height: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE, TOKEN_SCALE_FACTOR)};
    max-height: ${(props) => getCellSize(props, VIEWPORT_PERCENTAGE, TOKEN_SCALE_FACTOR)};
  }
`

const Board = ({ cells, gameApi, onClick = () => undefined }: BoardProps) => {
  const [columnCount] = React.useState(gameApi.getColumnCount())
  const [rowCount] = React.useState(gameApi.getRowCount())

  return (
    <StyledBoardGrid>
      {cells.flatMap((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <GridBoardCell
            player={cell.player}
            uuid={cell.uuid}
            onClick={() => onClick(rowIndex, columnIndex)}
            key={cell.uuid}
            column={columnIndex + 1}
            row={rowCount - rowIndex + 1}
            columnCount={columnCount}
            rowCount={rowCount}
          />
        )),
      )}
    </StyledBoardGrid>
  )
}

Board.defaultProps = { cells: createCells(6, 7) }

export default Board
