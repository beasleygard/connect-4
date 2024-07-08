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

  & > div {
    overflow-y: auto;
    background-color: whitesmoke;
    height: 100%;

    > div {
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

      > div > button {
        border-radius: 15px;
        padding: 1px 5px;
        margin: 0px 10px;
      }

      > div > button:nth-of-type(1) {
        background-color: teal;
      }

      > div > button:nth-of-type(2) {
        background-color: crimson;
      }
    }

    > div:nth-of-type(odd) {
      background: lightgray;
    }
  }

  & > button {
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
  }

  & > h2 {
    width: 100%;
    border-bottom: 2px solid black;
    text-align: center;
  }
`

const StyledDismissDialogButton = styled.button``

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
        <div>
          {savedGameUuids.length === 0 ? (
            <>
              <div>
                <p>Currently no saved games...</p>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </>
          ) : (
            savedGameUuids.map((uuid: GameUuid) => (
              <div key={uuid}>
                <p>
                  uuid: <b>{uuid}</b>
                </p>
                <div>
                  <button
                    onClick={(e) => {
                      gameApi.load(uuid)
                      updateGameView()
                      dismissDialogButtonHandler(e)
                    }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => {
                      gameApi.deleteSave(uuid)
                      setSavedGameUuids(gameApi.getSavedGameUuids())
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </StyledLoadGameDialog>
    </Overlay>
  )
}

export default LoadGameDialog
