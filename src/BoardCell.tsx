import styled from 'styled-components'

type TokenProps = {
  $player?: 1 | 2
}

export type BoardCellProps = {
  player?: 1 | 2
  uuid: string
}

const StyledBoardCell = styled.div`
  display: flex;
  position: relative;
  width: 60px;
  height: 60px;
  background: blue;
`

const StyledPlayerToken = styled.div<TokenProps>`
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.$player) {
      case 1:
        return 'crimson'
      case 2:
        return 'gold'
      default:
        return 'white'
    }
  }};
`

const BoardCell = ({ player }: BoardCellProps) => {
  return (
    <StyledBoardCell>
      <StyledPlayerToken $player={player} />
    </StyledBoardCell>
  )
}

export { BoardCell, StyledPlayerToken }
