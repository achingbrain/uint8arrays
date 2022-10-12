/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { equals } from '../src/equals.js'

describe('Uint8Array equals', () => {
  it('finds two Uint8Arrays equal', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect(equals(a, b)).to.be.true()
  })

  it('finds two Uint8Arrays not equal', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([0, 1, 2, 4])

    expect(equals(a, b)).to.be.false()
  })

  it('finds two Uint8Arrays with different lengths not equal', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([0, 1, 2, 3, 4])

    expect(equals(a, b)).to.be.false()
  })
})
