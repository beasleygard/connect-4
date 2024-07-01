import Token from '@/connect4-ui/Token'
import styled from 'styled-components'

export type BoardCellProps = {
  player?: 1 | 2
  uuid?: string
  onClick?: Function
  className?: string
}

const StyledBoardCell = styled.div<BoardCellProps>`
  position: relative;
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;

  & > div {
    position: absolute;
  }

  &:after {
    content: '';
    min-width: inherit;
    width: inherit;
    min-height: inherit;
    height: inherit;
    background: blue;
    border-color: blue;
    border-style: solid;
    mask:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="XMaxYMax meet"><circle cx="50%" cy="50%" r="40%" fill="black"/></svg>')
        0/100% 100%,
      linear-gradient(#fff, #fff);
    mask-composite: exclude;
    box-sizing: border-box;
  }
`

const BoardCell = ({ player, uuid, className, onClick }: BoardCellProps) => {
  return (
    <StyledBoardCell className={className} onClick={onClick} uuid={uuid}>
      <Token
        size={50}
        color={player === undefined ? undefined : player === 1 ? 'crimson' : 'gold'}
      />
    </StyledBoardCell>
  )
}

export default BoardCell
