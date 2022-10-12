/* eslint-disable no-console */

/*
$ node benchmarks/to-string.js
$ npx playwright-test benchmarks/to-string.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { fromString } from '../dist/src/from-string.js'
import { concat } from '../dist/src/concat.js'
import { allocUnsafe } from '../dist/src/alloc.js'

const string = 'Hello world, this is a Uint8Array created from a string'
const DATA1 = fromString(string)
const DATA2 = fromString(string)

function checkConcat (arr) {
  if (arr.byteLength !== (DATA1.byteLength + DATA2.byteLength)) {
    return false
  }

  for (let i = 0; i < arr.byteLength; i++) {
    let offset = i
    let bytes = DATA1

    if (offset > bytes.byteLength) {
      offset -= bytes.byteLength
      bytes = DATA2
    }

    if (arr[i] !== bytes[offset]) {
      return false
    }
  }

  return true
}

const suite = new Benchmark.Suite()

suite
  .add('Uint8Arrays.concat', () => {
    const res = concat([DATA1, DATA2])

    if (checkConcat(res)) {
      throw new Error('Concat failed')
    }
  })
  .add('Uint8Arrays.concat with length', () => {
    const res = concat([DATA1, DATA2], DATA1.byteLength + DATA2.byteLength)

    if (checkConcat(res)) {
      throw new Error('Concat failed')
    }
  })
  .add('Uint8Array.set', () => {
    const res = new Uint8Array(DATA1.byteLength + DATA2.byteLength)
    res.set(DATA1, 0)
    res.set(DATA2, DATA1.byteLength)

    if (checkConcat(res)) {
      throw new Error('Concat failed')
    }
  })
  .add('allocUnsafe.set', () => {
    const res = allocUnsafe(DATA1.byteLength + DATA2.byteLength)
    res.set(DATA1, 0)
    res.set(DATA2, DATA1.byteLength)

    if (checkConcat(res)) {
      throw new Error('Concat failed')
    }
  })

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
