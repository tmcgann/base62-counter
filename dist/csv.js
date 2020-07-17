'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));

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

const errorCallback = error => {
  if (error) {
    console.error(error);
  }
};

function createCSVForMaxBase62Value(
  filename,
  endValue,
  startValue = '0',
  zeroPadLength = 0,
) {
  const writeStream = fs.createWriteStream(filename);
  writeStream.write(`Code\n`, errorCallback);

  let value = startValue;
  while (value !== endValue) {
    value = incrementAlphanumeric(value, zeroPadLength);
    writeStream.write(`${value}\n`, errorCallback);
  }
}

function createCSVForMaxBase10Value(
  filename,
  endValue,
  startValue = '0',
  zeroPadLength = 0,
) {
  const writeStream = fs.createWriteStream(filename);
  writeStream.write(`Code\n`, errorCallback);

  let value = startValue;
  let counter = 0;
  while (counter < endValue) {
    value = incrementAlphanumeric(value);
    writeStream.write(`${value}\n`, errorCallback);
    counter++;
  }
}

exports.createCSVForMaxBase10Value = createCSVForMaxBase10Value;
exports.createCSVForMaxBase62Value = createCSVForMaxBase62Value;
