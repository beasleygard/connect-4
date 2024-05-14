import { MatcherResult } from '@/vitest'

function toBeDeeplyUnequal(
  this: { isNot: boolean } | void,
  received: object,
  expected: object,
): MatcherResult {
  const isNot = this?.isNot ?? false
  return {
    pass: received !== expected,
    message: () => `Objects are deeply ${isNot ? 'un' : ''}equal`,
  }
}

export default toBeDeeplyUnequal
