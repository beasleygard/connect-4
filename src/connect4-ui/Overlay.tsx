import React from 'react'
import styled from 'styled-components'

const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;

  margin: 0;
  backdrop-filter: blur(4px) brightness(30%);
  opacity: 1;
  transform: scaleX(1) scaleY(1);
`

const Overlay = ({
  children,
  onClick,
}: {
  children?: Array<React.ReactElement> | React.ReactElement
  onClick: React.MouseEventHandler
}) => {
  return (
    <>
      <StyledOverlay onClick={onClick}></StyledOverlay>
      {children}
    </>
  )
}

export default Overlay
