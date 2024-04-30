import Token, { TokenProps } from '@/connect4-ui/Token'
import styled from 'styled-components'

type OverviewTokenProps = TokenProps & { isActive: boolean }

const OverviewToken = styled(Token)<OverviewTokenProps>`
  filter: ${(props) => (props.isActive ? 'grayscale(0%)' : 'grayscale(90%)')};
`

OverviewToken.defaultProps = {
  size: 50,
  color: 'crimson',
  isActive: true,
} as OverviewTokenProps

export default OverviewToken
