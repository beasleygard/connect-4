import styled from 'styled-components'

type TokenProps = {
  $size: number
  $color?: string
  className?: string
}

const StyledToken = styled.div<TokenProps>`
  box-sizing: border-box;
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
  background-color: ${(props) => props.$color};
  border-radius: 50%;
  min-height: ${(props) => props.$size}px;
  min-width: ${(props) => props.$size}px;
`

const OuterToken = styled(StyledToken)`
  display: flex;
  position: relative;
  background-color: ${(props) => props.$color};
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    box-sizing: border-box;
    border-radius: 50%;
    height: 90%;
    width: 90%;
    border-style: dashed;
    border-width: ${(props) => props.$size * 0.06}px;
    border-color: rgba(0, 0, 0, 0.12);
  }
`

const InnerToken = styled(StyledToken)`
  position: absolute;
  box-sizing: border-box;
  height: 75%;
  width: 75%;
  min-height: 75%;
  min-width: 75%;
  background-color: rgba(0, 0, 0, 0.1);
  border-width: ${(props) => props.$size * 0.04}px;
  border-style: inset;
  border-color: rgba(0, 0, 0, 0.1);
`

function Token(props: TokenProps) {
  return (
    <>
      {props.$color === undefined ? (
        <StyledToken $size={props.$size} $color={'white'} />
      ) : (
        <OuterToken {...props}>
          <InnerToken {...props} />
        </OuterToken>
      )}
    </>
  )
}

Token.defaultProps = {
  size: 200,
  color: undefined,
}

export default Token
