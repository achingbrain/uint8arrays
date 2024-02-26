/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { alloc } from '#alloc'
import { concat } from '#concat'

describe('Uint8Array concat', () => {
  it('concats two Uint8Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([4, 5, 6, 7])
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b])).to.deep.equal(c)
  })

  it('concats two Uint8Arrays with a length', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([4, 5, 6, 7])
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b], 8)).to.deep.equal(c)
  })

  it('concat returns Uint8Array', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = alloc(10).fill(1)
    const c = concat([a, b])
    const slice = c.slice()

    // node slice is a copy operation, Uint8Array slice is a no-copy operation
    expect(slice.buffer).to.not.equal(c.buffer)
  })
})
