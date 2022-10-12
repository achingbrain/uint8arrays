/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { xor } from '../src/xor.js'

describe('Uint8Array xor', () => {
  it('xors 1,0 and 0,1', () => {
    const a = Uint8Array.from([1, 0])
    const b = Uint8Array.from([0, 1])

    expect(xor(a, b)).to.deep.equal(Uint8Array.from([1, 1]))
  })

  it('xors 1,1 and 0,1', () => {
    const a = Uint8Array.from([1, 1])
    const b = Uint8Array.from([0, 1])

    expect(xor(a, b)).to.deep.equal(Uint8Array.from([1, 0]))
  })

  it('xors 1,1 and 1,1', () => {
    const a = Uint8Array.from([1, 1])
    const b = Uint8Array.from([1, 1])

    expect(xor(a, b)).to.deep.equal(Uint8Array.from([0, 0]))
  })

  it('xors returns Uint8Array', () => {
    const a = Uint8Array.from([1, 1])
    const b = Uint8Array.from([1, 1])
    const c = xor(a, b)
    const slice = c.slice()

    // node slice is a copy operation, Uint8Array slice is a no-copy operation
    expect(slice.buffer).to.not.equal(c.buffer)
  })
})
