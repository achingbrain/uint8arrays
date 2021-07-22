/* eslint-env mocha */

// @ts-ignore
import { expect } from 'aegir/utils/chai.js'
import xor from '../src/xor.js'

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
})
