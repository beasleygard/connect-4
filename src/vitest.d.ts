export type MatcherResult = {
  pass: boolean
  message: () => string
  actual?: unknown
  expected?: unknown
}
