import { GameUuid } from '@/connect4-domain/game'
import { GameApi } from '@/connect4-ui/create-game-api'
import Overlay from '@/connect4-ui/Overlay'
import React from 'react'
import styled from 'styled-components'

type LoadGameDialogProps = {
  dialogDismissalHandler: React.MouseEventHandler
  gameApi: GameApi
  updateGameView: () => void
}

const StyledLoadGameDialog = styled.div`
  border: 2px solid black;
  width: 25rem;
  height: 20rem;
  position: fixed;
  margin: auto;
  inset: 0px;
  background: dimgray;

  & > h2 {
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
  height: fit-content;
  width: auto;
  margin: 0;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: black;
  }

  > div {
    flex-direction: row;
    gap: 10px;
  }
`

const StyledDismissDialogButton = styled.button`
  border: none;
  width: 24px;
  height: 24px;
  padding: 0;
  position: absolute;
  left: 93%;
  top: 0.5%;
  margin: 0;
  border-radius: 30%;
  background: none;
  :hover {
    border-radius: 30%;
    border-radius: 30%;
    background-color: darkgray;
  }
`

const StyledSavedGameButton = styled.button`
  border-radius: 15px;
  padding: 1px 5px;
  margin: 0px 10px;
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
