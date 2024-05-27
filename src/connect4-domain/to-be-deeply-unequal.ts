import { MatcherResult } from '@/vitest'

function getCannotFindSharedReference(obj1: any, obj2: any): boolean {
  const firstIsObject = obj1 instanceof Object
  const secondIsObject = obj2 instanceof Object
  if (!(firstIsObject && secondIsObject)) {
    return true
  }
  if (obj1 === obj2) {
    return false
  }

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  for (const key of keys) {
    if (!getCannotFindSharedReference(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

function toBeDeeplyUnequal(
  this: { isNot: boolean } | void,
  received: object,
  expected: object,
): MatcherResult {
  const isNot = this?.isNot ?? false
  let objsAreDeeplyUnequal = getCannotFindSharedReference(received, expected)
  return {
    pass: objsAreDeeplyUnequal,
    message: () => `Objects are deeply ${isNot ? 'un' : ''}equal`,
  }
}

export default toBeDeeplyUnequal
