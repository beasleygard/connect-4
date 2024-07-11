import Token from '@/connect4-ui/Token'
import styled from 'styled-components'

export type BoardCellProps = {
  player?: 1 | 2
  activePlayer?: 1 | 2
  uuid?: string
  onClick?: Function
  className?: string
  isValidCellForMove?: boolean
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
    ${(props) => {
      if (props.player === undefined) return 'opacity: 0;'
    }}
  }

  &:hover {
    & > div {
      ${(props) => {
        if (props.player === undefined) {
          return props.isValidCellForMove ? 'opacity: 0.5;' : ''
        }
      }};
    }
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

const getTokenColor = (player?: 1 | 2, activePlayer?: 1 | 2) => {
  let effectivePlayerNumber = player
  if (player === undefined) {
    effectivePlayerNumber = activePlayer
  }

  return effectivePlayerNumber === 1 ? 'crimson' : 'gold'
}

const BoardCell = ({
  player,
  activePlayer,
  className,
  onClick,
  isValidCellForMove = false,
}: BoardCellProps) => {
  return (
    <StyledBoardCell
      player={player}
      activePlayer={activePlayer}
      className={className}
      onClick={onClick}
      isValidCellForMove={isValidCellForMove}
    >
      <Token size={50} color={getTokenColor(player, activePlayer)} />
    </StyledBoardCell>
  )
}

export default BoardCell
