function deepClone<T>(value: T, visited: WeakMap<any, any> = new WeakMap<any, any>()): T {
  if (!(value instanceof Object) || typeof value === 'function') {
    return value
  } else if (visited.has(value)) {
    return visited.get(value)
  }

  const result: T = Array.isArray(value) ? ([] as T) : ({} as T)

  visited.set(value, result)

  for (const key of Object.keys(value)) {
    const nestedValue = (value as any)[key]
    const clonedValue = deepClone<typeof nestedValue>(nestedValue, visited)
    ;(result as any)[key] = clonedValue
  }

  for (const symbol of Object.getOwnPropertySymbols(value)) {
    const nestedValue = (value as any)[symbol]
    const clonedValue = deepClone<typeof nestedValue>(nestedValue, visited)
    ;(result as any)[symbol] = clonedValue
  }

  return result
}

export default deepClone
