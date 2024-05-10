import { expect } from 'aegir/chai'
import { xorCompare } from '../src/xor-compare.js'

describe('xor-compare', () => {
  it('compare', () => {
    expect(xorCompare(Uint8Array.from([0, 0]), Uint8Array.from([0, 1]))).to.equal(-1)
    expect(xorCompare(Uint8Array.from([0, 1]), Uint8Array.from([0, 1]))).to.equal(0)
    expect(xorCompare(Uint8Array.from([1, 1]), Uint8Array.from([0, 1]))).to.equal(1)
  })
})
