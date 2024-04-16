import { expect } from 'vitest'
import { MatcherResult } from './vitest'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

function toBeUuid(this: { isNot: boolean } | void, received: string): MatcherResult {
  const isNot = this?.isNot ?? false
  return {
    pass: received.match(UUID_REGEX) !== null,
    message: () => `${received} is ${isNot ? '' : 'not '}a valid v4 UUID.`,
  }
}

expect.extend({
  toBeUuid,
})

export default toBeUuid
