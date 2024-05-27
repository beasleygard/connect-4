import { MatcherResult } from '@/vitest'

function getIsDeeplyUnequal(first: any, second: any): boolean {
  const firstIsObject = first instanceof Object
  const secondIsObject = second instanceof Object
  if (!(firstIsObject && secondIsObject)) {
    return true
  } else if (first === second) {
    return false
  }

  const keys = new Set([...Object.keys(first), ...Object.keys(second)])
  return Array.from(keys).reduce(
    (isDeeplyUnequal, currentKey) =>
      isDeeplyUnequal && getIsDeeplyUnequal(first[currentKey], second[currentKey]),
    true,
  )
}

function toBeDeeplyUnequal(
  this: { isNot: boolean } | void,
  received: object,
  expected: object,
): MatcherResult {
  const { isNot } = this ?? {}
  const objsAreDeeplyUnequal = getIsDeeplyUnequal(received, expected)
  return {
    pass: objsAreDeeplyUnequal,
    message: () => `Objects are ${isNot ? '' : 'not'}deeply unequal`,
  }
}

export default toBeDeeplyUnequal
