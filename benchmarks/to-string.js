/* eslint-disable no-console */

/*
$ node benchmarks/to-string.js
$ npx playwright-test benchmarks/to-string.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { fromString } from '../dist/src/from-string.js'
import { toString } from '../dist/src/to-string.js'

const string = 'Hello world, this is a Uint8Array created from a string'
const DATA = fromString(string)

// https://github.com/achingbrain/uint8arrays/issues/30#issuecomment-1199120924
function utf8ReadFromCharCode (buffer, start, end) {
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

// https://github.com/achingbrain/uint8arrays/issues/30#issuecomment-1199120924
function utf8ReadConcat (buffer, start, end) {
  if (end - start < 1) {
    return ''
  }

  let str = ''
  for (let i = start; i < end;) {
    const t = buffer[i++]
    if (t <= 0x7F) {
      str += String.fromCharCode(t)
    } else if (t >= 0xC0 && t < 0xE0) {
      str += String.fromCharCode((t & 0x1F) << 6 | buffer[i++] & 0x3F)
    } else if (t >= 0xE0 && t < 0xF0) {
      str += String.fromCharCode((t & 0xF) << 12 | (buffer[i++] & 0x3F) << 6 | buffer[i++] & 0x3F)
    } else if (t >= 0xF0) {
      const t2 = ((t & 7) << 18 | (buffer[i++] & 0x3F) << 12 | (buffer[i++] & 0x3F) << 6 | buffer[i++] & 0x3F) - 0x10000
      str += String.fromCharCode(0xD800 + (t2 >> 10))
      str += String.fromCharCode(0xDC00 + (t2 & 0x3FF))
    }
  }

  return str
}

const suite = new Benchmark.Suite()

suite
  .add('Uint8Arrays.toString', () => {
    const res = toString(DATA)

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })
  .add('TextDecoder', () => {
    const res = new TextDecoder().decode(DATA)

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })
  .add('utf8ReadFromCharCode', () => {
    const res = utf8ReadFromCharCode(DATA, 0, DATA.byteLength)

    if (res !== string) {
      throw new Error('String encoding failed')
    }
  })
  .add('utf8ReadConcat', () => {
    const res = utf8ReadConcat(DATA, 0, DATA.byteLength)

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
