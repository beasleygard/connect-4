import { GameUuid } from '@/connect4-domain/game'
import { GameApi } from '@/connect4-ui/create-game-api'
import Overlay from '@/connect4-ui/Overlay'
import React from 'react'
import styled from 'styled-components'
import { v1 as randomUuid } from 'uuid'

type LoadGameDialogProps = {
  dialogDismissalHandler: React.MouseEventHandler
  gameApi: GameApi
  updateGameView: () => void
}

const StyledLoadGameDialog = styled.div`
  border: 2px solid black;
  width: 50%;
  height: 60%;
  position: fixed;
  margin: auto;
  inset: 0px;
  background: dimgray;

  @media (max-width: 700px) {
    width: 90%;
  }

  & > h2 {
    font-size: 3rem;
    width: 100%;
    border-bottom: 2px solid black;
    text-align: center;
  }
`

const StyledSavedGameList = styled.div`
  overflow-y: auto;
  background-color: whitesmoke;
  height: 100%;

  > div:nth-of-type(odd) {
    background: lightgray;
  }
`

const StyledSavedGameEntry = styled.div`
  flex-direction: column;
  min-height: 50px;
  height: fit-content;
  width: auto;
  margin: 0;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: black;
    font-size: 2rem;
  }

  > div {
    flex-direction: row;
    gap: 10px;
  }
`

const StyledDismissDialogButton = styled.button`
  border: none;
  width: 3rem;
  height: 3rem;
  padding: 0;
  position: absolute;
  right: 0%;
  top: 0%;
  margin: 0;
  border-radius: 30%;
  background: none;
  :hover {
    border-radius: 30%;
    border-radius: 30%;
    background-color: darkgray;
  }

  & > svg {
    width: 3rem;
    height: 3rem;
  }
`

const StyledSavedGameButton = styled.button`
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  margin: 0px 10px 10px 10px;
  font-size: 1.5rem;
`

const StyledLoadGameButton = styled(StyledSavedGameButton)`
  background-color: teal;
`

const StyledDeleteGameButton = styled(StyledSavedGameButton)`
  background-color: crimson;
`

const LoadGameDialog = ({
  dialogDismissalHandler: dismissDialogButtonHandler,
  gameApi,
  updateGameView,
}: LoadGameDialogProps) => {
  const [savedGameUuids, setSavedGameUuids] = React.useState(gameApi.getSavedGameUuids())
  return (
    <Overlay onClick={dismissDialogButtonHandler}>
      <StyledLoadGameDialog>
        <StyledDismissDialogButton onClick={dismissDialogButtonHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g
              strokeLinecap="round"
              fill="none"
              stroke="#222222"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </g>
          </svg>
        </StyledDismissDialogButton>
        <h2>Saved Games</h2>
        <StyledSavedGameList>
          {savedGameUuids.length === 0 ? (
            <>
              <StyledSavedGameEntry>
                <p>Currently no saved games...</p>
              </StyledSavedGameEntry>
              {[...Array(5).keys()].map(() => (
                <StyledSavedGameEntry key={randomUuid()}></StyledSavedGameEntry>
              ))}
            </>
          ) : (
            savedGameUuids.map((uuid: GameUuid) => (
              <StyledSavedGameEntry key={uuid}>
                <p>
                  uuid: <b>{uuid}</b>
                </p>
                <div>
                  <StyledLoadGameButton
                    onClick={(e) => {
                      gameApi.load(uuid)
                      updateGameView()
                      dismissDialogButtonHandler(e)
                    }}
                  >
                    Load
                  </StyledLoadGameButton>
                  <StyledDeleteGameButton
                    onClick={() => {
                      gameApi.deleteSave(uuid)
                      setSavedGameUuids(gameApi.getSavedGameUuids())
                    }}
                  >
                    Delete
                  </StyledDeleteGameButton>
                </div>
              </StyledSavedGameEntry>
            ))
          )}
        </StyledSavedGameList>
      </StyledLoadGameDialog>
    </Overlay>
  )
}

export default LoadGameDialog
