const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function getBaseValue(value, indexOfNextChar) {
  const unchangedSubstring = value.substring(0, value.length - 1)

  if (indexOfNextChar !== 0) {
    return unchangedSubstring
  }

  const substringIncremented =
    unchangedSubstring === '' ? '1' : incrementAlphanumeric(unchangedSubstring)
  return substringIncremented
}

export function incrementAlphanumeric(value = '0', zeroPadLength = 0) {
  const valueNormalized = value.toString()

  if (!valueNormalized.length) throw new Error(`Value MUST have a length greater than 1`)
  if (/[^0-9a-zA-Z\n]{1,}/.test(valueNormalized))
    throw new Error(`Value MUST NOT contain non-alphanumeric characters`)

  const lastChar = valueNormalized.charAt(valueNormalized.length - 1)
  const indexOfLastChar = CHARS.indexOf(lastChar)
  const indexOfNextChar = (indexOfLastChar + 1) % CHARS.length

  const baseValue = getBaseValue(valueNormalized, indexOfNextChar)
  const incrementedValue = CHARS.charAt(indexOfNextChar)
  const newValue = baseValue + incrementedValue

  return zeroPadLength ? newValue.padStart(zeroPadLength, '0') : newValue
}

export function toBase10(value) {
  throw new Error('Not implemented')
}

export function toBase62(value) {
  const base = 62
  const remainders = []

  let integer = Number(value)

  if (integer < CHARS.length) {
    return CHARS[integer]
  }

  let fraction = 0
  while (integer > 0) {
    const result = integer / base
    const resultParts = result.toString().split('.')

    integer = Number(resultParts[0])
    fraction = resultParts[1] !== undefined ? Number(`0.${resultParts[1]}`) : 0

    const remainder = fraction * base
    remainders.push(remainder)
  }

  const newValue = remainders
    .reverse()
    .map(remainder => CHARS.charAt(remainder))
    .join('')
  return newValue
}
