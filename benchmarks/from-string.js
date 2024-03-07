/* eslint-disable no-console */

/*
$ node benchmarks/from-string.js
$ npx playwright-test benchmarks/from-string.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { fromString } from '#from-string'

const string = 'Hello world, this is a Uint8Array created from a string'
const DATA = fromString(string)

function checkBuffer (arr) {
  for (let i = 0; i < arr.byteLength; i++) {
    if (arr[i] !== DATA[i]) {
      return false
    }
  }

  return true
}

const suite = new Benchmark.Suite()

suite
  .add('Uint8Arrays.fromString', () => {
    const res = fromString(string)

    if (!checkBuffer(res)) {
      throw new Error('String decoding failed')
    }
  })
  .add('TextEncoder', () => {
    const res = new TextEncoder().encode(string)

    if (!checkBuffer(res)) {
      throw new Error('String decoding failed')
    }
  })

if (globalThis.Buffer != null) {
  suite.add('Buffer.from', function () {
    const res = globalThis.Buffer.from(string, 'utf-8')

    if (!checkBuffer(res)) {
      throw new Error('String decoding failed')
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
  .on('error', (err) => {
    console.error(err)
  })
  // run async
  .run({ async: true })
