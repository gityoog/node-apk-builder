
export function valueToJava(key: string, value: any, level: number = 0): string {
  const result: string[] = []
  if (Array.isArray(value)) {
    const type = value.reduce((t, v) => {
      if (t === 'Object') return t
      const valueType = getValueType(v)
      if (t === '') return valueType
      if (t !== valueType) return 'Object'
    }, '')
    result.push(`public static final ${type}[] ${key} = new ${type}[] {${value.map(v => JSON.stringify(v)).join(',')}};`)
  } else if (typeof value === 'object') {
    result.push(`public static final class ${key} {
${Object.keys(value).map(k => valueToJava(k, value[k], level + 1)).join('\n')}`)
    result.push('}')
  } else {
    const valueType = getValueType(value)
    result.push(`public static final ${valueType} ${key} = ${JSON.stringify(value)};`)
  }
  return result.map(r => ' '.repeat(level * 2) + r).join('\n')
}

const baseType: Record<string, string> = {
  string: 'String',
  number: 'double',
  boolean: 'boolean'
}
function getValueType(value: any) {
  const valueType = typeof value
  if (valueType in baseType) return baseType[valueType]
  return 'Object'
}
