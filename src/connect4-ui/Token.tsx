import styled from 'styled-components'

export type TokenProps = {
  size: number
  color?: string
  className?: string
}

type StyledTokenProps = {
  $size: number
  $color?: string
  className?: string
}

const StyledToken = styled.div<StyledTokenProps>`
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
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border-radius: 50%;
    height: 90%;
    width: 90%;
    border-style: dashed;
    border-width: ${(props) => props.$size * 0.06}px;
    border-color: rgba(0, 0, 0, 0.2);
  }
`

const InnerToken = styled(StyledToken)`
  box-sizing: border-box;
  height: 70%;
  width: 70%;
  min-height: 70%;
  min-width: 70%;
  background-color: rgba(0, 0, 0, 0.1);
  border-width: ${(props) => props.$size * 0.04}px;
  border-style: inset;
  border-color: rgba(0, 0, 0, 0.1);
`

function Token({ size, color, className }: TokenProps) {
  return (
    <>
      {color === undefined ? (
        <StyledToken $size={size} $color={'rgba(0, 0, 0, 0)'} className={className} />
      ) : (
        <OuterToken $size={size} $color={color} className={className}>
          <InnerToken $size={size} $color={color} className={className} />
        </OuterToken>
      )}
    </>
  )
}

Token.defaultProps = {
  size: 200,
  color: undefined,
} as TokenProps

export default Token
