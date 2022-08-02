/* eslint-disable no-console */

/*
$ node benchmarks/to-string.js
$ npx playwright-test benchmarks/to-string.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { fromString } from '../src/from-string.js'

const string = 'Hello world, this is a Uint8Array created from a string'
const DATA = fromString(string)

// https://github.com/achingbrain/uint8arrays/issues/30#issuecomment-1199120924
function utf8Read (buffer, start, end) {
  const len = end - start
  if (len < 1) { return '' }
  let parts = null
  const chunk = []
  let i = 0 // char offset
  let t // temporary
  while (start < end) {
    t = buffer[start++]
    if (t < 128) { chunk[i++] = t } else if (t > 191 && t < 224) { chunk[i++] = (t & 31) << 6 | buffer[start++] & 63 } else if (t > 239 && t < 365) {
      t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000
      chunk[i++] = 0xD800 + (t >> 10)
      chunk[i++] = 0xDC00 + (t & 1023)
    } else { chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63 }
    if (i > 8191) {
      (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk))
      i = 0
    }
  }
  if (parts) {
    if (i) { parts.push(String.fromCharCode.apply(String, chunk.slice(0, i))) }
    return parts.join('')
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i))
}

const suite = new Benchmark.Suite()

suite
  .add('TextDecoder', () => {
    const res = new TextDecoder().decode(DATA)

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })
  .add('utf8Read', () => {
    const res = utf8Read(DATA, 0, DATA.byteLength)

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })

if (globalThis.Buffer != null) {
  suite.add('Buffer.toString', function () {
    const buf = globalThis.Buffer.from(DATA.buffer, DATA.byteOffset, DATA.byteLength)
    const res = buf.toString('utf8')

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })
}

suite
  // add listeners
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ async: true })
