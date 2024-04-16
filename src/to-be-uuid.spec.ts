import { describe, it, expect } from 'vitest'
import toBeUuid from './to-be-uuid'

describe('toBeUuid', () => {
  describe('given a valid v4 UUID string', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000'
    it('returns a MatcherResult object with a positive pass value', () => {
      expect(toBeUuid(validUUID)).toEqual({
        pass: true,
        message: expect.any(Function),
      })
    })
    it('returns the message function indicating the UUID is not valid', () => {
      expect(toBeUuid(validUUID).message()).toEqual(`${validUUID} is not a valid v4 UUID.`)
    })
    describe('and we use the negated matcher', () => {
      it('returns the message function indicating the UUID is valid', () => {
        const boundToBeUuid = toBeUuid.bind({ isNot: true })
        expect(boundToBeUuid(validUUID).message()).toEqual(`${validUUID} is a valid v4 UUID.`)
      })
    })
  })
  describe('given an invalid v4 UUID string', () => {
    const invalidUUID = ':)'
    it('returns a MatcherResult object with a negative pass value', () => {
      expect(toBeUuid(invalidUUID)).toEqual({
        pass: false,
        message: expect.any(Function),
      })
    })
    it('returns the message funciton indicating the UUID is not valid', () => {
      expect(toBeUuid(invalidUUID).message()).toEqual(`${invalidUUID} is not a valid v4 UUID.`)
    })
    describe('and we use the negated matcher', () => {
      it('returns the message function indicating the UUID is valid', () => {
        const boundToBeUuid = toBeUuid.bind({ isNot: true })
        expect(boundToBeUuid(invalidUUID).message()).toEqual(`${invalidUUID} is a valid v4 UUID.`)
      })
    })
  })
})
