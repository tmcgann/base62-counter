'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getBaseValue(value, indexOfNextChar) {
  const unchangedSubstring = value.substring(0, value.length - 1);

  if (indexOfNextChar !== 0) {
    return unchangedSubstring
  }

  const substringIncremented =
    unchangedSubstring === '' ? '1' : incrementAlphanumeric(unchangedSubstring);
  return substringIncremented
}

function incrementAlphanumeric(value = '0', zeroPadStart = 0) {
  const valueNormalized = value.toString();

  if (!valueNormalized.length) throw new Error(`Value MUST have a length greater than 1`)
  if (/[^0-9a-zA-Z\n]{1,}/.test(valueNormalized))
    throw new Error(`Value MUST NOT contain non-alphanumeric characters`)

  const lastChar = valueNormalized.charAt(valueNormalized.length - 1);
  const indexOfLastChar = CHARS.indexOf(lastChar);
  const indexOfNextChar = (indexOfLastChar + 1) % CHARS.length;

  const baseValue = getBaseValue(valueNormalized, indexOfNextChar);
  const incrementedValue = CHARS.charAt(indexOfNextChar);
  const newValue = baseValue + incrementedValue;

  return zeroPadStart ? newValue.padStart(zeroPadStart, '0') : newValue
}

exports.getBaseValue = getBaseValue;
exports.incrementAlphanumeric = incrementAlphanumeric;
