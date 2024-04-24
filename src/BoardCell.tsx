import styled from 'styled-components'
import Token from './Token'

type TokenProps = {
  $player?: 1 | 2
}

export type BoardCellProps = {
  player?: 1 | 2
  uuid: string
  className?: string
}

export const StyledPlayerToken = styled.div<TokenProps>`
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

const StyledBoardCell = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
  width: 60px;
  height: 60px;
  background: blue;
  align-items: center;
  justify-content: center;
  border-color: blue;
  border-style: solid;

  &:after {
    content: '';
    display: absolute;
    z-index: 1;
    width: 45px;
    height: 45px;
    border-width: 5px;
    border-radius: 50%;
    border-style: inset;
    border-color: blue;
  }
  & div {
    position: absolute;
  }
`

const BoardCell = ({ player, className }: BoardCellProps) => {
  return (
    <StyledBoardCell className={className}>
      <Token
        size={50}
        color={player === undefined ? undefined : player === 1 ? 'crimson' : 'gold'}
      />
    </StyledBoardCell>
  )
}

export default BoardCell
