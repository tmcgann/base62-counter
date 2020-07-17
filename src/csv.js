import fs from 'fs'
import { incrementAlphanumeric } from './index'

const errorCallback = error => {
  if (error) {
    console.error(error)
  }
}

export function createCSVForMaxBase62Value(
  filename,
  endValue,
  startValue = '0',
  zeroPadLength = 0,
) {
  const writeStream = fs.createWriteStream(filename)
  writeStream.write(`Code\n`, errorCallback)

  let value = startValue
  while (value !== endValue) {
    value = incrementAlphanumeric(value, zeroPadLength)
    writeStream.write(`${value}\n`, errorCallback)
  }
}

export function createCSVForMaxBase10Value(
  filename,
  endValue,
  startValue = '0',
  zeroPadLength = 0,
) {
  const writeStream = fs.createWriteStream(filename)
  writeStream.write(`Code\n`, errorCallback)

  let value = startValue
  let counter = 0
  while (counter < endValue) {
    value = incrementAlphanumeric(value)
    writeStream.write(`${value}\n`, errorCallback)
    counter++
  }
}
