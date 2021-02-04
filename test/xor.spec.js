/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const xor = require('../xor')

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
