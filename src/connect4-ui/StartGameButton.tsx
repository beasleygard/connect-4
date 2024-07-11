import { MouseEventHandler } from 'react'
import styled from 'styled-components'

type GameStartButtonProps = {
  onStartGameClick?: MouseEventHandler
}

const StyledButton = styled.button`
  padding: 20px 15px;
  font-size: 4rem;
  min-width: fit-content;
  background-color: #eceff4;
  border-radius: 4rem;
  font-weight: 700;
  font-style: italic;
  color: black;
  position: fixed;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: border-color 0.25s;
  box-sizing: border-box;
  border: 1rem solid transparent;
  white-space: nowrap;
  &:focus:enabled {
    outline: 4px auto -webkit-focus-ring-color;
    outline: none;
  }
  &:hover:enabled {
    border-color: #808386;
  }

  @media (max-width: 500px) {
    min-width: 80%;
    width: 80%;
    font-size: 10svw;
  }
`

const StartGameButton = ({ onStartGameClick = () => undefined }: GameStartButtonProps) => (
  <StyledButton onClick={onStartGameClick}>Start game?</StyledButton>
)

export default StartGameButton
