import { toBase62, getBaseValue, incrementAlphanumeric } from './index'

describe('#getBaseValue', () => {
  test("should return the penultimate character when the index of the last character's next character is not zero", () => {
    const input = 'XY'
    const actual = getBaseValue(input, 62)
    const expected = 'X'
    expect(actual).toBe(expected)
  })

  test("should return the penultimate character incremented by one when the index of the last character's next character is zero and the last character is not the last possible character in the sequence of characters (i.e. 'Z')", () => {
    const input = 'XY'
    const actual = getBaseValue(input, 0)
    const expected = 'Y'
    console.assert(
      actual === expected,
      `Expect ${actual} to be ${expected} when value is ${input} and index of next character is 0`,
    )
    expect(actual).toBe(expected)
  })

  test("should return '1' when the index of the last character's next character is zero and the last character is the last possible character in the sequence of characters (i.e. 'Z')", () => {
    const input = 'Z'
    const actual = getBaseValue(input, 0)
    const expected = '1'
    expect(actual).toBe(expected)
  })
})

describe('#incrementAlphanumeric', () => {
  test('should increment from 0 to 1', () => {
    const input = '0'
    const actual = incrementAlphanumeric(input)
    const expected = '1'
    expect(actual).toBe(expected)
  })

  test('should increment from 9 to a', () => {
    const input = '9'
    const actual = incrementAlphanumeric(input)
    const expected = 'a'
    expect(actual).toBe(expected)
  })

  test('should increment from z to A', () => {
    const input = 'z'
    const actual = incrementAlphanumeric(input)
    const expected = 'A'
    expect(actual).toBe(expected)
  })

  test('should increment from Y to Z', () => {
    const input = 'Y'
    const actual = incrementAlphanumeric(input)
    const expected = 'Z'
    expect(actual).toBe(expected)
  })

  test('should increment from Z to 10', () => {
    const input = 'Z'
    const actual = incrementAlphanumeric(input)
    const expected = '10'
    expect(actual).toBe(expected)
  })

  test('should increment from 10 to 11', () => {
    const input = '10'
    const actual = incrementAlphanumeric(input)
    const expected = '11'
    expect(actual).toBe(expected)
  })

  test('should increment from YY to YZ', () => {
    const input = 'YY'
    const actual = incrementAlphanumeric(input)
    const expected = 'YZ'
    expect(actual).toBe(expected)
  })

  test('should increment from YZ to Z0', () => {
    const input = 'YZ'
    const actual = incrementAlphanumeric(input)
    const expected = 'Z0'
    expect(actual).toBe(expected)
  })

  test('should increment from ZZ to 100', () => {
    const input = 'ZZ'
    const actual = incrementAlphanumeric(input)
    const expected = '100'
    expect(actual).toBe(expected)
  })

  test('should increment from 0 to 001 when a zero pad length of 3 is specified', () => {
    const input = '0'
    const actual = incrementAlphanumeric(input, 3)
    const expected = '001'
    expect(actual).toBe(expected)
  })

  test('should increment from 000 to 001 when a zero pad length of 3 is specified', () => {
    const input = '000'
    const actual = incrementAlphanumeric(input, 3)
    const expected = '001'
    expect(actual).toBe(expected)
  })
})

describe('#toBase62', () => {
  test("should convert '0' to '0'", () => {
    const actual = toBase62(0)
    expect(actual).toBe('0')
  })

  test("should convert '9' to '9'", () => {
    const actual = toBase62(9)
    expect(actual).toBe('9')
  })

  test("should convert '10' to 'a'", () => {
    const actual = toBase62(10)
    expect(actual).toBe('a')
  })

  test("should convert '35' to 'z'", () => {
    const actual = toBase62(35)
    expect(actual).toBe('z')
  })

  test("should convert '36' to 'A'", () => {
    const actual = toBase62(36)
    expect(actual).toBe('A')
  })

  test("should convert '61' to 'Z'", () => {
    const actual = toBase62(61)
    expect(actual).toBe('Z')
  })

  test("should convert '62' to '10'", () => {
    const actual = toBase62(62)
    expect(actual).toBe('10')
  })

  test('should convert work with numeric strings', () => {
    const actual = toBase62('0')
    expect(actual).toBe('0')
  })
})
