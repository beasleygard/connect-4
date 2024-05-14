import toBeUuid from './to-be-uuid'
import { expect } from 'vitest'
import toBeDeeplyUnequal from '@/connect4-domain/to-be-deeply-unequal'

expect.extend({
  toBeUuid,
  toBeDeeplyUnequal,
})
