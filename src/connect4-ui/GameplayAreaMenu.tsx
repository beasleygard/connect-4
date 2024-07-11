import MenuButton from '@/connect4-ui/MenuButton'
import styled from 'styled-components'

const StyledGameplayAreaMenu = styled.menu`
  width: 100vw;
  background-color: #2e3440;
  min-height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-style: italic;
  font-weight: 800;

  & > h1 {
    color: #d8dee9;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
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
