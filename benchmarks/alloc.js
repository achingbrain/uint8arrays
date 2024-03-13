/* eslint-disable no-console */

/*
$ node benchmarks/alloc.js
$ npx playwright-test benchmarks/alloc.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { alloc, allocUnsafe } from '#alloc'

const LENGTH = 1024

function checkAlloc (arr) {
  return arr.byteLength !== LENGTH
}

const suite = new Benchmark.Suite()

suite
  .add('Uint8Arrays.alloc', () => {
    const res = alloc(LENGTH)

    if (checkAlloc(res)) {
      throw new Error('Alloc failed')
    }
  })
  .add('Uint8Arrays.allocUnsafe', () => {
    const res = allocUnsafe(LENGTH)

    if (checkAlloc(res)) {
      throw new Error('Alloc failed')
    }
  })
  .add('new Uint8Array', () => {
    const res = new Uint8Array(LENGTH)

    if (checkAlloc(res)) {
      throw new Error('Alloc failed')
    }
  })

if (globalThis.Buffer != null) {
  suite.add('Buffer.alloc', function () {
    const res = globalThis.Buffer.alloc(LENGTH)

    if (checkAlloc(res)) {
      throw new Error('Alloc failed')
    }
  })
  suite.add('Buffer.allocUnsafe', function () {
    const res = globalThis.Buffer.allocUnsafe(LENGTH)

    if (checkAlloc(res)) {
      throw new Error('Alloc failed')
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
