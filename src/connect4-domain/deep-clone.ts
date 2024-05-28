function deepClone<T>(value: T, visited: WeakMap<any, any> = new WeakMap<any, any>()): T {
  if (!(value instanceof Object) || typeof value === 'function') {
    return value
  }
  if (visited.has(value)) {
    return visited.get(value)
  }

  let result: T

  if (Array.isArray(value)) {
    result = [] as T
  } else {
    result = {} as T
  }

  visited.set(value, result)

  for (const key of Object.keys(value)) {
    const nestedValue = (value as any)[key]
    const clonedValue = deepClone<typeof nestedValue>(nestedValue, visited)
    ;(result as any)[key] = clonedValue
  }

  return result
}

export default deepClone
