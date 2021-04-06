/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const fromString = require('../from-string')

describe('Uint8Array fromString', () => {
  it('creates a Uint8Array from a string', () => {
    const str = 'hello world'
    const arr = new TextEncoder().encode(str)

    expect(fromString(str)).to.deep.equal(arr)
  })

  it('creates a Uint8Array from a base16 string', () => {
    const str = '00010203aabbcc'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(fromString(str, 'base16')).to.deep.equal(arr)
  })

  it('creates a Uint8Array from a base64 string', () => {
    const str = 'AAECA6q7zA'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(fromString(str, 'base64')).to.deep.equal(arr)
  })

  it('creates a Uint8Array from an ascii string', () => {
    const str = [
      String.fromCharCode(0),
      String.fromCharCode(1),
      String.fromCharCode(2),
      String.fromCharCode(3),
      String.fromCharCode(4)
    ].join('')
    const arr = Uint8Array.from([0, 1, 2, 3, 4])

    expect(fromString(str, 'ascii')).to.deep.equal(arr)
  })

  it('throws when an unknown base is passed', () => {
    const str = 'hello world'

    // @ts-expect-error 'derp' is not a valid encoding
    expect(() => fromString(str, 'derp')).to.throw(/Unsupported encoding/)
  })
})
