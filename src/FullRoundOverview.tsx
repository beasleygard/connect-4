import RoundOverview from '@/RoundOverview'
import DualPlayerOverview from './DualPlayerOverview'
import styled from 'styled-components'

const StyledFullRoundOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  min-width: 300px;
  max-width: 350px;
  overflow: visible;
`

function FullRoundOverview() {
  return (
    <StyledFullRoundOverview>
      <RoundOverview />
      <DualPlayerOverview />
    </StyledFullRoundOverview>
  )
}

export default FullRoundOverview
