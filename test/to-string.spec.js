'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const toString = require('../to-string')
const { TextEncoder } = require('web-encoding')

describe('Uint8Array toString', () => {
  it('creates a String from a Uint8Array', () => {
    const str = 'hello world'
    const arr = new TextEncoder('utf8').encode(str)

    expect(toString(arr)).to.deep.equal(str)
  })

  it('creates a hex string from a Uint8Array', () => {
    const str = '00010203aabbcc'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(toString(arr, 'base16')).to.deep.equal(str)
  })

  it('creates a base64 string from a Uint8Array', () => {
    const str = 'AAECA6q7zA'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(toString(arr, 'base64')).to.deep.equal(str)
  })

  it('throws when an unknown base is passed', () => {
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(() => toString(arr, 'derp')).to.throw(/Unknown base/)
  })
})
