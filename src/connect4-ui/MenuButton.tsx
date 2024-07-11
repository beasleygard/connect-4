import styled from 'styled-components'

type MenuButtonProps = {
  text: string
  onClick?: React.MouseEventHandler
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const StyledMenuButton = styled.button`
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
  font-weight: 800;
  font-style: italic;
  border-radius: 2rem;
  border: 3px solid transparent;
  background-color: #4c566a;
  color: #ffffffde;
  cursor: pointer;
  transition: border-color 0.25s;
  box-sizing: border-box;
  &:focus:enabled {
    outline: 4px auto -webkit-focus-ring-color;
    outline: none;
  }
  &:hover:enabled {
    border-color: #646cff;
  }
  &:disabled {
    filter: brightness(40%);
    cursor: inherit;
    border: none;
  }
`

function MenuButton({ text, ...styledMenuButtonProps }: MenuButtonProps) {
  return <StyledMenuButton {...styledMenuButtonProps}>{text}</StyledMenuButton>
}
export type { MenuButtonProps }

export default MenuButton
