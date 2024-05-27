import { describe, expect, it } from 'vitest'

describe('toBeDeeplyUnequal', () => {
  const emptyArray1: any[] = []
  const emptyArray2: any[] = []
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
  it('should pass when one object has an additional key at a shallow level', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2, c: 3 }
    expect(obj1).toBeDeeplyUnequal(obj2)
  })
  it('should fail when one object has an additional key and shares a reference to a value', () => {
    const innerArray = emptyArray1
    const obj1 = { a: 1, b: innerArray }
    const obj2 = { a: 1, b: innerArray }
    expect(obj1).not.toBeDeeplyUnequal(obj2)
  })
  it('should pass given an array and an object', () => {
    const arr = emptyArray1
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
    const arr1 = emptyArray1
    const arr2 = arr1
    expect(arr1).not.toBeDeeplyUnequal(arr2)
  })
  it('should pass given two arrays that are different', () => {
    const arr1 = emptyArray1
    const arr2 = emptyArray2
    expect(arr1).toBeDeeplyUnequal(arr2)
  })
  it('should pass given two arrays that are unequal at a shallow level', () => {
    const arr1 = [1, 2]
    const arr2 = [1, 3]
    expect(arr1).toBeDeeplyUnequal(arr2)
  })
  it('should fail given two arrays that are equal at a shallow level', () => {
    const innerArray = emptyArray1
    const arr1 = [innerArray]
    const arr2 = [innerArray]
    expect(arr1).not.toBeDeeplyUnequal(arr2)
  })
  it('should pass when the first array has an extra value and they are deeply unequal', () => {
    const first = [1, 2, 3]
    const second = [1, 2]
    expect(first).toBeDeeplyUnequal(second)
  })
  it('should pass when the second array has an extra value and they are deeply unequal', () => {
    const first = [1, 2, 3]
    const second = [1, 2]
    expect(first).toBeDeeplyUnequal(second)
  })
})
