import MenuButton from '@/connect4-ui/MenuButton'
import styled from 'styled-components'

const StyledGameplayAreaMenu = styled.menu`
  width: 100vw;
  background-color: #d8dee9;
  min-height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  padding: 5px 3px;
  flex-wrap: wrap;
  justify-content: space-between;

  & > h1 {
    color: rgb(26, 29, 36);
    font-weight: 800;
    font-style: italic;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const GameplayAreaMenu = ({
  children,
}: {
  children: Array<React.ReactElement<typeof MenuButton>> | React.ReactElement<typeof MenuButton>
}) => {
  return (
    <StyledGameplayAreaMenu>
      <h1>Connect Four</h1>
      <div>{children}</div>
    </StyledGameplayAreaMenu>
  )
}

export default GameplayAreaMenu
