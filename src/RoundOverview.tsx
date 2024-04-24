import styled from 'styled-components'

export type RoundOverviewProps = {
  roundNumber: number
}

const StyledRoundOverview = styled.div`
  background-color: #2e3440;
  color: #d8dee9;
  text-align: center;
  font-style: oblique;
  font-size: 30px;
  padding: 15px;
  border-radius: 100px 100px 0px 0px;
  font-weight: 950;
`

function RoundOverview({ roundNumber }: RoundOverviewProps) {
  return <StyledRoundOverview>{`Round ${roundNumber}`}</StyledRoundOverview>
}

RoundOverview.defaultProps = {
  roundNumber: 1,
} as RoundOverviewProps

export default RoundOverview
