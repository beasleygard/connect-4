import { describe, expect, it } from 'vitest'

describe('toBeDeeplyUnequal', () => {
  it('should fail when given objects are the same object', () => {
    const obj1 = {}
    const obj2 = obj1
    expect(obj1).not.toBeDeeplyUnequal(obj2)
  })
  it('should pass when given objects are different objects', () => {
    const obj1 = {}
    const obj2 = {}
    expect(obj1).toBeDeeplyUnequal(obj2)
  })
  it('should pass given an array and an object', () => {
    const arr = []
    const obj = {}
    expect(arr).toBeDeeplyUnequal(obj)
  })
  it('should pass given null and an object', () => {
    const obj = {}
    expect(null).toBeDeeplyUnequal(obj)
  })
  it('should pass given undefined and an object', () => {
    const obj = {}
    expect(undefined).toBeDeeplyUnequal(obj)
  })
  it('should fail given arrays that are the same', () => {
    const arr1 = []
    const arr2 = arr1
    expect(arr1).not.toBeDeeplyUnequal(arr2)
  })
  it('should pass given two arrays that are different', () => {
    const arr1 = []
    const arr2 = []
    expect(arr1).toBeDeeplyUnequal(arr2)
  })
  it('should pass given two arrays that are unequal at a shallow level', () => {
    const arr1 = [1]
    const arr2 = [2]
    expect(arr1).toBeDeeplyUnequal(arr2)
  })
})
