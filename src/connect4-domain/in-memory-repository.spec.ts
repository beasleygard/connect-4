import InMemoryRepository from '@/connect4-domain/in-memory-repository'
import { describe, expect, it } from 'vitest'

describe('in-memory-repository', () => {
  describe('given defaults', () => {
    it('creates an in-memory repository', () => {
      const repository = new InMemoryRepository()
      expect(repository).toBeInstanceOf(InMemoryRepository)
    })
  })
})
