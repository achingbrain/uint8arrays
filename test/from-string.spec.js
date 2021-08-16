/* eslint-env mocha */

import { expect } from 'aegir/utils/chai.js'
import { fromString } from '../src/from-string.js'
import { toString } from '../src/to-string.js'
import bases from '../src/util/bases.js'

/** @type {import('../src/util/bases').SupportedEncodings[]} */
// @ts-ignore Object.keys returns a string[]
const supportedBases = Object.keys(bases)

describe('Uint8Array fromString', () => {
  it('creates a Uint8Array from a string', () => {
    const str = 'hello world'
    const arr = new TextEncoder().encode(str)

    expect(fromString(str)).to.deep.equal(arr)
  })

  supportedBases.forEach(base => {
    it(`creates a Uint8Array from a ${base} string`, () => {
      const arr = Uint8Array.from([0, 1, 2, 3])
      const str = toString(arr, base)

      expect(fromString(str, base)).to.deep.equal(arr)
    })
  })

  it('creates a Uint8Array from a base64 string with non-printable utf8 characters', () => {
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
