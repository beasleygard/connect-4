import { expect } from 'vitest'
import toBeUuid from './to-be-uuid'

expect.extend({
  toBeUuid,
})
