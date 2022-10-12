/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { compare } from '../src/compare.js'

describe('Uint8Array compare', () => {
  it('is stable', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(compare)).to.deep.equal([
      a,
      b
    ])
    expect([b, a].sort(compare)).to.deep.equal([
      b,
      a
    ])
  })

  it('compares two Uint8Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 4])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(compare)).to.deep.equal([
      b,
      a
    ])
    expect([b, a].sort(compare)).to.deep.equal([
      b,
      a
    ])
  })

  it('compares two Uint8Arrays with different lengths', () => {
    const a = Uint8Array.from([0, 1, 2, 3, 4])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(compare)).to.deep.equal([
      b,
      a
    ])
    expect([b, a].sort(compare)).to.deep.equal([
      b,
      a
    ])
  })
})
