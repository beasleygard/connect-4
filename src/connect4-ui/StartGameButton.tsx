import { MouseEventHandler } from 'react'
import styled from 'styled-components'

type GameStartButtonProps = {
  onStartGameClick?: MouseEventHandler
}

const StyledButton = styled.button`
  padding: 20px 15px;
  font-family: monospace;
  font-size: 2rem;
  background-color: lightblue;
  color: black;
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StartGameButton = ({ onStartGameClick = () => undefined }: GameStartButtonProps) => (
  <StyledButton onClick={onStartGameClick}>Start game?</StyledButton>
)

export default StartGameButton
