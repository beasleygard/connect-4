import styled from 'styled-components'

type MenuButtonProps = {
  text: string
  onClick?: React.MouseEventHandler
}

const StyledMenuButton = styled.button`
  padding: 5px 15px;
  font-size: 1em;
  font-weight: 700;
  font-style: italic;
  border-radius: 18px;
  border: 3px solid transparent;
  background-color: #4c566a;
  color: #ffffffde;
  cursor: pointer;
  transition: border-color 0.25s;
  box-sizing: border-box;
  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline: none;
  }
  &:hover {
    border-color: #646cff;
  }
`

function MenuButton({ text, onClick }: MenuButtonProps) {
  return <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>
}
export type { MenuButtonProps }

export default MenuButton
