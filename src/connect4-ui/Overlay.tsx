import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  margin: 0;
  transform: scaleX(1) scaleY(1);
  animation: 0.2s ease-out 1 graduallyBlurAndDarken;
  backdrop-filter: blur(4px) brightness(30%);
  opacity: 1;

  @keyframes graduallyBlurAndDarken {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Overlay = ({
  children,
  onClick,
}: {
  children?: Array<React.ReactElement> | React.ReactElement
  onClick: React.MouseEventHandler
}) => {
  return ReactDOM.createPortal(
    <>
      <StyledOverlay onClick={onClick}></StyledOverlay>
      {children}
    </>,
    document.body,
  )
}

export default Overlay
