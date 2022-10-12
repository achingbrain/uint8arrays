/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { alloc, allocUnsafe } from '../src/alloc.js'

describe('Uint8Array alloc', () => {
  it('can alloc memory', () => {
    const size = 10

    expect(alloc(size)).to.have.property('byteLength', size)
  })

  it('can alloc memory', () => {
    const size = 10
    const buf = alloc(size)

    expect(buf.every(value => value === 0)).to.be.true()
  })

  it('can alloc memory unsafely', () => {
    const size = 10

    expect(allocUnsafe(size)).to.have.property('byteLength', size)
  })

  it('alloc returns Uint8Array', () => {
    const a = alloc(10)
    const slice = a.slice()

    // node slice is a copy operation, Uint8Array slice is a no-copy operation
    expect(slice.buffer).to.not.equal(a.buffer)
  })

  it('allocUnsafe returns Uint8Array', () => {
    const a = allocUnsafe(10)
    const slice = a.slice()

    // node slice is a copy operation, Uint8Array slice is a no-copy operation
    expect(slice.buffer).to.not.equal(a.buffer)
  })
})
