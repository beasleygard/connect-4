function deepClone<T>(value: T): T {
  if (!(value instanceof Object)) {
    return value
  }

  let result: T

  if (Array.isArray(value)) {
    result = [] as T
  } else {
    result = {} as T
  }

  for (const key of Object.keys(value)) {
    const nestedValue = (value as any)[key]
    ;(result as any)[key] = deepClone<typeof nestedValue>(nestedValue)
  }

  return result
}

export default deepClone
